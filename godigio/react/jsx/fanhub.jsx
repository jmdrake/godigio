/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-22
* Time: 10:48 PM
* To change this template use Tools | Templates.
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var ddoc_fanhub = {
    "_id" : '_design/my_index',
    "views" : {
        "fans" : {
            "map" : "function (doc) { emit(doc._id.split("+")[0]) }"
        },
        "fansof" : {
            "map" : "function (doc) { emit(doc._id.split("+")[1]) }"
        },
        "fanscount" : {
            "map" : "function (doc) { emit(doc._id.split("+")[0]) }", "reduce" : '_count'
        },
        "fansofcount" : {
            "map": "function (doc) { emit(doc._id.split("+")[1]) }", "reduce" : '_count'
        },        
    }
};

fanhub.get("_design/my_index").catch(function(err){
    if(err.status==404){
        fanhub.put(ddoc_fanhub)
    }
});

<<<<<<< HEAD
var ddoc_posts = {
    "_id" : "_design/my_index",
    "views" : {
        "by_user" : {
            "map" : "function(doc) {emit(doc.user)}"
        }
   
    }
}

posts.get("_design/my_index").catch(function(err){
    if(err.status==404){
        posts.put(ddoc_posts)
    }
});


=======
>>>>>>> 3fc016841518ebb71adcd5ea51fdcdd0a996f4e2
var defaultimg = "../images/profile-icon.png";
function getProfileInfo(user){
    var def = $.Deferred();
    profiles.get(user).then(function(doc){            
        if(!(doc["_attachments"] && doc["_attachments"]["profilepic"])) {                
            def.resolve({imgsrc : defaultimg, firstname : doc.firstname, lastname : doc.lastname,  userid : doc["_id"]})
        } else {
            profiles.getAttachment(user, "profilepic").then(function(result){
                def.resolve({imgsrc : blobUtil.createObjectURL(result), firstname : doc.firstname, lastname : doc.lastname, userid : doc["_id"]})
            })
        }
    });
    return def;
}

function getAttachment(db, key, attachment){
    var def = $.Deferred();
    db.get(key).then(function(doc){
        if(!(doc["_attachments"] && doc["_attachments"][attachment])) {
            def.resolve(null)
        } else {
            db.getAttachment(key, attachment).then(function(result){
                def.resolve(blobUtil.createObjectURL(result))
            })
        }
    });
    return def;
}

function getUserInformation() {
    var def = $.Deferred();
    var user = {};
    user.userpage = null;
    console.log("Trace 2.0");
    fanhub.getSession().then(function(res){
<<<<<<< HEAD
        console.log("Trace 2.1");
        user.currentuser = res.userCtx.name;
        user.userpage = window.location.search.split("=")[1];        
        console.log("Trace 2.2");
        if(user.userpage==null)
            user.userpage = user.currentuser;
        
        console.log("Trace 2.3");
        
        if(user.userpage == null)
            window.location.replace("login.html");
            
        console.log("Trace 2.4");
        console.log(user.userpage);
        getProfileInfo(user.userpage).then(function(res){
            console.log("Trace 3");
=======
        user.currentuser = res.userCtx.name;
        user.userpage = window.location.search.split("=")[1];        
        
        if(user.userpage==null)
            user.userpage = user.currentuser;
        
        getProfileInfo(user.userpage).then(function(res){
>>>>>>> 3fc016841518ebb71adcd5ea51fdcdd0a996f4e2
            user.firstname = res.firstname;
            user.lastname = res.lastname;
            user.profilepic = res.imgsrc;
            def.resolve(user);
        })
    }).catch(function(err){
        def.reject(err);
    });
    return def;
}

function getAttachments(db, records, attachname){
    var def = $.Deferred();
    var newlist = [];
    records.forEach(function(record){
        getAttachment(db, record.doc["_id"], attachname).then(function(attachment){
            var newdoc = record.doc;
            newdoc["url"] = attachment;
            newlist[newlist.length] = newdoc;
            if(newlist.length >= records.length) 
                def.resolve(newlist)                
        })
    });
    return def;
}

var fanofdiv = document.getElementById("fanoflist");
var fandiv = document.getElementById("fanslist");

var userinfo = null;
function renderApplication(){
<<<<<<< HEAD
    console.log("Trace 1.0");
=======
>>>>>>> 3fc016841518ebb71adcd5ea51fdcdd0a996f4e2
    getUserInformation().then(function(user){                
        var homepage = user.userpage == user["currentuser"] || user.userpage == null;
        var loggedin = user["currentuser"] != null;
        var fanbutton = !homepage && loggedin;
        var postbutton = !loggedin ? "hidden" : "visible";
        user.fantoken = user.currentuser + "+" + user.userpage;
        var name=user.firstname + " " + user.lastname;
        console.log("Trace 4");
        userinfo = user;
        console.log(fanbutton);
        
        // Render Navbar        
        if(fanbutton){
            console.log("Trace 5");
            fanhub.get(user.fantoken).then(function(doc){
                React.render(<Navbar fanbuttonvisibility={"visible"} postbuttonvisibility={postbutton} btnlabel={"unfan"} fantoken={user.fantoken}/>,
                             document.getElementById("navbar"));
            }).catch(function(err){
                if(err.name == "not_found") {
                    React.render(<Navbar fanbuttonvisibility={"visible"} postbuttonvisibility={postbutton} btnlabel={"fan"} fantoken={user.fantoken}/>,
                                 document.getElementById("navbar"));
                } else {
                    console.log(err.name)
                }
            })    
        } else {
            console.log("Trace 6");
            React.render(
                <Navbar fanbuttonvisibility={"hidden"} postbuttonvisibility={postbutton}/>,
                document.getElementById("navbar")
            )       
        }

        // Render Profile, Timeline and Fans panel
        posts.query("my_index/by_user", {key : user.userpage, include_docs : true, descending : true}).then(function(res){
            console.log(res.rows);
            getAttachments(posts, res.rows, "image").then(function(docs){
                console.log(docs);
                console.log(res.rows);
                React.render(
                    <Timeline posts={docs}/>,
                    document.getElementById("postlist")
                );
            });
            return res.rows;
        }).then(function(postlist){
            fanhub.query("my_index/fans", {key : user.userpage, include_docs : true}).then(function(fanquery){
                React.render(
                    <ShowProfile postcount={postlist.length} fancount={fanquery.rows.length} profileimg={user.profilepic} name={name}/>,
                    document.getElementById("showprofile")
                );
                React.render(
                    <h4>Fans Of {name}</h4>,
                    document.getElementById("fansheader")
                );
<<<<<<< HEAD
                React.render(
                    <Fanlist fans={fanquery.rows} keyindex={1}/>,
                    fandiv
                )
=======
                mapProfileInfo(fanquery.rows, function(key){return key.split("+")[0];}).then(function(fans){
                    React.render(
                        <Fanlist fans={fans}/>,
                        fandiv
                    )
                })                
>>>>>>> 3fc016841518ebb71adcd5ea51fdcdd0a996f4e2
            }).catch(function(err){
                console.log(err);
            })
        });
        
        fanhub.query("my_index/fansof", {key : user.userpage, include_docs : true}).then(function(fanofquery){
            React.render(
                <h4>{name} is a Fan Of </h4>,
                document.getElementById("fanofheader")
<<<<<<< HEAD
            );            
            React.render(
                <Fanlist fans={fanofquery.rows}  keyindex={0}/>,
                fandiv
            )
=======
            );
            
            mapProfileInfo(fanofquery.rows, function(key){return key.split("+")[1];}).then(function(fans){
                React.render(
                    <Fanlist fans={fans}/>,
                    fanofdiv
                )
            });                        
>>>>>>> 3fc016841518ebb71adcd5ea51fdcdd0a996f4e2
        });         
        
        // Render post form if this is user's homepage
        if(homepage)
            React.render(
                <Postform user={user.currentuser}/>, 
                document.getElementById("postform")
            );
            
        // Render post modal form if user is logged in
        if(loggedin) {
            React.render(
                <Postmodal user={user.currentuser}/>, 
                document.getElementById("postModal")
            ); 
        }
    })
}


var postdiv = document.getElementById("postlist");
function updatePosts(){
    posts.query("my_index/by_user", {key : userinfo.userpage, include_docs : true, descending : true}).then(function(res){
        getAttachments(posts, res.rows, "image").then(function(docs){
            postdiv.innerHTML = "";
            React.render(
                <Timeline posts={docs}/>,
                postdiv                
            );
        })        
        return res.rows;
    }).then(function(postlist){
        fanhub.query("my_index/fanscount", {key : userinfo.fantoken}).then(function(fancount){
            fancount = fancount.rows.length > 0 ? fancount.rows[0] : 0;
            React.render(
                <ShowProfile postcount={postlist.length} fancount={fancount} profileimg={userinfo.profilepic}/>,
                    document.getElementById("showprofile")
            )
        })
    });
}

function mapProfileInfo(records, keyfunction){
    var def = $.Deferred();
    var newlist = [];
    var recordid = null;
    records.forEach(function(record){
        recordid = keyfunction(record.id);
        getProfileInfo(recordid).then(function(newdoc){
            newlist[newlist.length] = newdoc;
            if(newlist.length >= records.length) 
                def.resolve(newlist)         
        })
    })
    return def;
}

function updateFans(){
    fanhub.query("my_index/fansof", {key : userinfo.userpage, include_docs : true}).then(function(fanofquery){
        mapProfileInfo(fanofquery.rows, function(key){return key.split("+")[1];}).then(function(fans){
            React.render(
                <Fanlist fans={fans}/>,
                fanofdiv
            )
        })
    });

    fanhub.query("my_index/fans", {key : userinfo.userpage, include_docs : true}).then(function(fanquery){
        mapProfileInfo(fanquery.rows, function(key){return key.split("+")[0];}).then(function(fans){
            React.render(
                <Fanlist fans={fans}/>,
                fandiv
            )
        })
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