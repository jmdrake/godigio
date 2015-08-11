/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-22
* Time: 10:48 PM
* To change this template use Tools | Templates.
*/

"use strict";

var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");
var profiles = new PouchDB("https://godigiolive.iriscouch.com/profiles");
var posts = new PouchDB("https://godigiolive.iriscouch.com/posts");

var ddoc_fanhub = {
    "_id": '_design/my_index',
    "views": {
        "fans": {
            "map": "function (doc) { emit(doc._id.split(" + ")[0]) }"
        },
        "fansof": {
            "map": "function (doc) { emit(doc._id.split(" + ")[1]) }"
        },
        "fanscount": {
            "map": "function (doc) { emit(doc._id.split(" + ")[0]) }", "reduce": '_count'
        },
        "fansofcount": {
            "map": "function (doc) { emit(doc._id.split(" + ")[1]) }", "reduce": '_count'
        }
    }
};

fanhub.get("_design/my_index")["catch"](function (err) {
    if (err.status == 404) {
        fanhub.put(ddoc_fanhub);
    }
});

var defaultimg = "../images/profile-icon.png";
function getProfileInfo(user) {
    var def = $.Deferred();
    profiles.get(user).then(function (doc) {
        if (!(doc["_attachments"] && doc["_attachments"]["profilepic"])) {
            def.resolve({ imgsrc: defaultimg, firstname: doc.firstname, lastname: doc.lastname, userid: doc["_id"] });
        } else {
            profiles.getAttachment(user, "profilepic").then(function (result) {
                def.resolve({ imgsrc: blobUtil.createObjectURL(result), firstname: doc.firstname, lastname: doc.lastname, userid: doc["_id"] });
            });
        }
    });
    return def;
}

function getAttachment(db, key, attachment) {
    var def = $.Deferred();
    db.get(key).then(function (doc) {
        if (!(doc["_attachments"] && doc["_attachments"][attachment])) {
            def.resolve(null);
        } else {
            db.getAttachment(key, attachment).then(function (result) {
                def.resolve(blobUtil.createObjectURL(result));
            });
        }
    });
    return def;
}

function getUserInformation() {
    var def = $.Deferred();
    var user = {};
    user.userpage = null;
    fanhub.getSession().then(function (res) {
        user.currentuser = res.userCtx.name;
        user.userpage = window.location.search.split("=")[1];

        if (user.userpage == null) user.userpage = user.currentuser;

        getProfileInfo(user.userpage).then(function (res) {
            user.firstname = res.firstname;
            user.lastname = res.lastname;
            user.profilepic = res.imgsrc;
            def.resolve(user);
        });
    })["catch"](function (err) {
        def.reject(err);
    });
    return def;
}

function getAttachments(db, records, attachname) {
    var def = $.Deferred();
    var newlist = [];
    records.forEach(function (record) {
        getAttachment(db, record.doc["_id"], attachname).then(function (attachment) {
            var newdoc = record.doc;
            newdoc["url"] = attachment;
            newlist[newlist.length] = newdoc;
            if (newlist.length >= records.length) def.resolve(newlist);
        });
    });
    return def;
}

var fanofdiv = document.getElementById("fanoflist");
var fandiv = document.getElementById("fanslist");

var userinfo = null;
function renderApplication() {
    getUserInformation().then(function (user) {
        var homepage = user.userpage == user["currentuser"] || user.userpage == null;
        var loggedin = user["currentuser"] != null;
        var fanbutton = homepage | !loggedin ? "hidden" : "visible";
        var postbutton = !loggedin ? "hidden" : "visible";
        user.fantoken = user.currentuser + "+" + user.userpage;
        var name = user.firstname + " " + user.lastname;

        userinfo = user;
        // Render Navbar
        fanhub.get(user.fantoken).then(function (doc) {
            React.render(React.createElement(Navbar, { fanbuttonvisibility: fanbutton, postbuttonvisibility: postbutton, btnlabel: "unfan", fantoken: user.fantoken }), document.getElementById("navbar"));
        })["catch"](function (err) {
            if (err.name == "not_found") {
                React.render(React.createElement(Navbar, { fanbuttonvisibility: fanbutton, postbuttonvisibility: postbutton, btnlabel: "fan", fantoken: user.fantoken }), document.getElementById("navbar"));
            } else {
                console.log(err.name);
            }
        });

        // Render Profile, Timeline and Fans panel
        posts.query("my_index/by_user", { key: user.userpage, include_docs: true, descending: true }).then(function (res) {
            getAttachments(posts, res.rows, "image").then(function (docs) {
                React.render(React.createElement(Timeline, { posts: docs }), document.getElementById("postlist"));
            });
            return res.rows;
        }).then(function (postlist) {
            fanhub.query("my_index/fans", { key: user.userpage, include_docs: true }).then(function (fanquery) {
                React.render(React.createElement(ShowProfile, { postcount: postlist.length, fancount: fanquery.rows.length, profileimg: user.profilepic, name: name }), document.getElementById("showprofile"));
                React.render(React.createElement("h4", null, "Fans Of ", name), document.getElementById("fansheader"));
                mapProfileInfo(fanquery.rows, function (key) {
                    return key.split("+")[0];
                }).then(function (fans) {
                    React.render(React.createElement(Fanlist, { fans: fans }), fandiv);
                });
            })["catch"](function (err) {
                console.log(err);
            });
        });

        fanhub.query("my_index/fansof", { key: user.userpage, include_docs: true }).then(function (fanofquery) {
            React.render(React.createElement("h4", null, name, " is a Fan Of "), document.getElementById("fanofheader"));

            mapProfileInfo(fanofquery.rows, function (key) {
                return key.split("+")[1];
            }).then(function (fans) {
                React.render(React.createElement(Fanlist, { fans: fans }), fanofdiv);
            });
        });

        // Render post form if this is user's homepage
        if (homepage) React.render(React.createElement(Postform, { user: user.currentuser }), document.getElementById("postform"));

        // Render post modal form if user is logged in
        if (loggedin) {
            React.render(React.createElement(Postmodal, { user: user.currentuser }), document.getElementById("postModal"));
        }
    });
}

var postdiv = document.getElementById("postlist");
function updatePosts() {
    posts.query("my_index/by_user", { key: userinfo.userpage, include_docs: true, descending: true }).then(function (res) {
        getAttachments(posts, res.rows, "image").then(function (docs) {
            postdiv.innerHTML = "";
            React.render(React.createElement(Timeline, { posts: docs }), postdiv);
        });
        return res.rows;
    }).then(function (postlist) {
        fanhub.query("my_index/fanscount", { key: userinfo.fantoken }).then(function (fancount) {
            fancount = fancount.rows.length > 0 ? fancount.rows[0] : 0;
            React.render(React.createElement(ShowProfile, { postcount: postlist.length, fancount: fancount, profileimg: userinfo.profilepic }), document.getElementById("showprofile"));
        });
    });
}

function mapProfileInfo(records, keyfunction) {
    var def = $.Deferred();
    var newlist = [];
    var recordid = null;
    records.forEach(function (record) {
        recordid = keyfunction(record.id);
        getProfileInfo(recordid).then(function (newdoc) {
            newlist[newlist.length] = newdoc;
            if (newlist.length >= records.length) def.resolve(newlist);
        });
    });
    return def;
}

function updateFans() {
    fanhub.query("my_index/fansof", { key: userinfo.userpage, include_docs: true }).then(function (fanofquery) {
        mapProfileInfo(fanofquery.rows, function (key) {
            return key.split("+")[1];
        }).then(function (fans) {
            React.render(React.createElement(Fanlist, { fans: fans }), fanofdiv);
        });
    });

    fanhub.query("my_index/fans", { key: userinfo.userpage, include_docs: true }).then(function (fanquery) {
        mapProfileInfo(fanquery.rows, function (key) {
            return key.split("+")[0];
        }).then(function (fans) {
            React.render(React.createElement(Fanlist, { fans: fans }), fandiv);
        });
    });
}

fanhub.changes({
    since: 'now',
    live: true
}).on('change', updateFans);

posts.changes({
    since: 'now',
    live: true
}).on('change', updatePosts);

renderApplication();