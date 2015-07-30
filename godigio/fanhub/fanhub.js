/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-22
* Time: 10:48 PM
* To change this template use Tools | Templates.
*/

var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");
var profiles = new PouchDB("https://godigiolive.iriscouch.com/profiles");
var posts = new PouchDB("https://godigiolive.iriscouch.com/posts");


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

function getProfileImage(user){
    return new Promise(function(resolve, reject){
        profiles.get(user).then(function(doc){
            if(!(doc["_attachments"] && doc["_attachments"]["profilepic"])) {
                reject("not_found");
            } else {
                profiles.getAttachment(user, "profilepic").then(function(result){
                    resolve(result)
                })
            }
        })
    })
}

var defaultimg = "../images/profile-icon.png";
function getProfileImagev2(user){
    return new Promise(function(resolve, reject){
        profiles.get(user).then(function(doc){
            if(!(doc["_attachments"] && doc["_attachments"]["profilepic"])) {
                resolve({imgsrc : defaultimg, firstname : doc.firstname, lastname : doc.lastname})
            } else {
                profiles.getAttachment(user, "profilepic").then(function(result){
                    resolve({imgsrc : blobUtil.createObjectURL(result), firstname : doc.firstname, lastname : doc.lastname})
                })
            }
        })
    })
}

var getUserInformation = new Promise(function(resolve, reject) {
    // Setup user record
    var user = {};
    user.userpage = null;
    fanhub.getSession().then(function(res){
        // get username of currently logged in user
        user.currentuser = res.userCtx.name;

        // get username of current page
        user.userpage = window.location.search.split("=")[1];

        // if user not logged in and at Fanhub home page, redirect to login page
        if(user.currentuser ==null && user.userpage==null)
            window.location.replace("login.html");

        // if user loggin in at and at Fanhub home page, treat as if at user's page
        if(user.userpage==null)
            user.userpage = user.currentuser;
            
        // Get user profile information
        profiles.get(user.userpage).then(function(res){
            user.firstname = res.firstname;
            user.lastname = res.lastname;
            
            // Get user profile image if it exists
            getProfileImage(user.userpage).then(function(userimage){
                user.profilepic = blobUtil.createObjectURL(userimage);
                resolve(user);
            }).catch(function(err){
                if(err=="not_found") {
                    user.profilepic = "../images/profile-icon.png";
                    resolve(user);
                } else {
                    reject(err)
                }
            })
        }).catch(function(err){
            reject(err)
        })
    });
});

var userinfo = null;
function renderApplication(){
    getUserInformation.then(function(user){                
        var homepage = user.userpage == user["currentuser"] || user.userpage == null;
        var loggedin = user["currentuser"] != null;
        var fanbutton = homepage | !loggedin ? "hidden" : "visible";
        var postbutton = !loggedin ? "hidden" : "visible";
        user.fantoken = user.currentuser + "+" + user.userpage;
        var name=user.firstname + " " + user.lastname;
        

        userinfo = user;
        // Render Navbar
        fanhub.get(user.fantoken).then(function(doc){
            React.render(<Navbar fanbuttonvisibility={fanbutton} postbuttonvisibility={postbutton} btnlabel={"unfan"} fantoken={user.fantoken}/>,
                         document.getElementById("navbar"));
        }).catch(function(err){
            if(err.name == "not_found") {
                React.render(<Navbar fanbuttonvisibility={fanbutton} postbuttonvisibility={postbutton} btnlabel={"fan"} fantoken={user.fantoken}/>,
                             document.getElementById("navbar"));
            } else {
                console.log(err.name)
            }
        })

        // Render Profile, Timeline and Fans panel
        posts.query("my_index/by_user", 
            {key : user.userpage, include_docs : true, descending : true}).then(function(res){
            React.render(<Timeline postlist={res.rows}/>,
                document.getElementById("timeline"));
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
                fanquery.rows.forEach(function(fan){
                    fanid = fan.id.split("+")[0];
                    getProfileImagev2(fanid).then(function(image){
                        React.render(
                            <Imageframe src={image.imgsrc} desc={image.firstname + " " + image.lastname} link={"?user=" + fanid}/>,
                            document.getElementById("fanslist")
                        )
                    })
                })
            }).catch(function(err){
                console.log(err);
            })
        });
        
        fanhub.query("my_index/fansof", {key : user.userpage, include_docs : true}).then(function(fanofquery){
            React.render(
                <h4>{name} is a Fan Of </h4>,
                document.getElementById("fanofheader")
            );
            fanofquery.rows.forEach(function(fan){
                fanid = fan.id.split("+")[1];
                getProfileImagev2(fanid).then(function(image){
                    React.render(
                        <Imageframe src={image.imgsrc} desc={image.firstname + " " + image.lastname} link={"?user=" + fanid}/>,
                        document.getElementById("fanoflist")
                    )
                })
            })
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

function updatePosts(){
    var timelinediv = document.getElementById("timeline");
    posts.query("my_index/by_user", {key : userinfo.userpage, include_docs : true, descending : true}).
    then(function(res){
        timelinediv.innerHTML = "";
        React.render(
            <Timeline postlist={res.rows}/>,
            timelinediv       
        )
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

function updateFans(){
    var fanofdiv = document.getElementById("fanoflist");
    fanhub.query("my_index/fansof", {key : userinfo.userpage, include_docs : true}).then(function(fanofquery){
        fanofdiv.innerHTML = "";
        fanofquery.rows.forEach(function(fan){
            fanid = fan.id.split("+")[1];
            getProfileImagev2(fanid).then(function(image){
                React.render(
                    <Imageframe src={image.imgsrc} desc={image.firstname + " " + image.lastname} link={"?user=" + fanid}/>,
                    fanofdiv
                )
            })
        })
    });          

    var fandiv = document.getElementById("fanslist");
    fanhub.query("my_index/fans", {key : userinfo.userpage, include_docs : true}).then(function(fanquery){
        fandiv.innerHTML = "";
        fanquery.rows.forEach(function(fan){
            fanid = fan.id.split("+")[0];
            getProfileImagev2(fanid).then(function(image){
                React.render(
                    <Imageframe src={image.imgsrc} desc={image.firstname + " " + image.lastname} link={"?user=" + fanid}/>,
                    fandiv
                )
            })
        })
    });          
}

posts.changes({
    since: 'now',
    live: true
}).on('change', updatePosts);

fanhub.changes({
    since: 'now',
    live: true
}).on('change', updateFans);

renderApplication();

