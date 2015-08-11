/**
* React.js component
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Userform = React.createClass({
    getInitialState: function() {
        defaultimg = this.props.profileimg;
        return {
            imagesource: defaultimg,
            defaultimg : defaultimg,
            firstname : this.props.doc.firstname,
            lastname : this.props.doc.lastname,
            email : this.props.doc.email
        };
    },    
    handleSubmit: function(e){
        e.preventDefault();
        var username = this.props.doc["_id"];        
        var firstname = this.state.firstname;
        var lastname = this.refs.lastname.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var imgurl = this.refs.profilepic.getDOMNode().src;
        var defaultimg = this.state.defaultimg;
        profiles.get(username).then(function(doc){
            doc.firstname = firstname; doc.lastname = lastname; doc.email = email;
            var rev=doc["_rev"];
            return profiles.put(doc)
        }).then(function(res){            
            if(imgurl != defaultimg) {                
                blobUtil.dataob(imgurl).then(function(blob){
                    profiles.putAttachment(username, "profilepic", res.rev, blob, "images/png");
                })
            }            
        }).then(function(res){
            window.location.replace("fanhub.html");            
        }).catch(function(err){
            alert("Unknown error updating profile");
            console.log(err.name);
        })                    
    },
    imageSelect : function(){
        console.log("Select image to upload");
        this.refs.picFile.getDOMNode().click();
    },
    handleFile: function(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function(upload) {
            self.setState({
                imagesource: upload.target.result,
            });
        }
        reader.readAsDataURL(file);
    },
    fnameChange : function(event){
        this.setState({firstname : event.target.value})
    },
    lnameChange : function(event){
        this.setState({lastname : event.target.value})
    },
    emailChange : function(event){
        this.setState({email : event.target.value})
    },
    render: function() {
        property = this.props.property;
        return(
            <div className="w3-container w3-half" >
                <form className="w3-container w3-card-4" onSubmit={this.handleSubmit}>
                    <h2 className="w3-text-theme" >Edit Profile</h2>
                    <div className="w3-group" >
                        <input className="w3-input" ref="firstname" type="text" required value={this.state.firstname} onChange={this.fnameChange}/>
                        <label className="w3-label" >First Name</label>
                    </div>
                    <div className="w3-group" >
                        <input className="w3-input" ref="lastname" type="text" required value={this.state.lastname} onChange={this.lnameChange}/>
                        <label className="w3-label" >Last Name</label>
                    </div>            
                    <div className="w3-group" >
                        <input className="w3-input" ref="email" type="text" required value={this.state.email} onChange={this.emailChange}/>
                        <label className="w3-label" >Email</label>
                    </div>
                    <input type="file" ref="picFile" accept="image/*" style={{"display":"none"}} onChange={this.handleFile}/>
                    <a href="#" ref="imageSelector" onClick={this.imageSelect}>Select Profile Pic</a> 
                    <div className="w3-group" ref="picdiv">
                        <img ref="profilepic" src={this.state.imagesource} width="100"></img>
                    </div>            
                    <br/>
                    <button className="w3-btn w3-theme" > Update </button>
                    <br/>
                </form>
            </div>
        )
    }
})

fanhub.getSession().then(function(res){
    if(res.userCtx.name==null) {
        window.location.replace("/fanhub/login.html")
    } else {
        return profiles.get(res.userCtx.name)
    }
}).then(function(doc){
        if(doc["_attachments"] && doc["_attachments"]["profilepic"]) {
        profiles.getAttachment(doc["_id"], "profilepic").then(function(blob){
            var imgsrc = blobUtil.createObjectURL(blob);
            React.render(
                <Userform doc={doc} profileimg={imgsrc}/>,
                document.getElementById("userform")
            )                    
        })
    } else {
        React.render(
            <Userform doc={doc} profileimg={"../images/profile-icon.png"}/>,
            document.getElementById("userform")
        )            
    }
})


