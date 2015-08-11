/**
* React.js component
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Registerform = React.createClass({
    getInitialState: function() {
        var defaultimg = "../images/100x100.jpg";
        return {
            imagesource: defaultimg,
            defaultimg : defaultimg
        };
    },    
    handleSubmit: function(e){
        e.preventDefault();        
        var username = this.refs.username.getDOMNode().value;        
        var password = this.refs.password.getDOMNode().value;
        var firstname = this.refs.firstname.getDOMNode().value;
        var lastname = this.refs.lastname.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var imgurl = this.refs.profilepic.getDOMNode().src;
        if(imgurl == this.state.defaultimg) {
            fanhub.signup(username, password).then(function(res){
                return fanhub.login(username.password)
            }).then(function(res){
                return profiles.put({"_id" : username, "firstname" : firstname, "lastname" : lastname, "email" : email})
            }).then(function(res){
                window.location.replace("fanhub.html");        
            }).catch(function(err){
                alert("Unknown error registering");
                console.log(err.name);
            })            
        } else {
            fanhub.signup(username, password).then(function(res){            
                return fanhub.login(username, password)           
            }).then(function(res){
                return blobUtil.dataURLToBlob(imgurl)
            }).then(function(blob){
                return blobUtil.blobToBase64String(blob);
            }).then(function(base64){                
                return profiles.put({"_id" : username, 
                                     "firstname" : firstname, 
                                     "lastname" : lastname, 
                                     "email" : email,
                                     "_attachments" : {
                                         'profilepic': {
                                             content_type: imgurl.type,
                                             data : base64
                                         }}})
            }).then(function(res){
                window.location.replace("fanhub.html");        
            }).catch(function(err){
                alert("Unknown error registering");
                console.log(err.name);
            })                        
        }        
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
    login: function(){
        window.replace("login.html");
    },
    render: function() {
        return(
            <div className="w3-container w3-half" >
                <form className="w3-container w3-card-4" onSubmit={this.handleSubmit}>
                    <h2 className="w3-text-theme" >Register</h2>
                    <div className="w3-group" >
                        <input className="w3-input" ref="username" type="text"  required/>
                        <label className="w3-label" >Username</label>
                    </div>
                    <div className="w3-group" >
                        <input className="w3-input" ref="firstname" type="text"  required/>
                        <label className="w3-label" >First Name</label>
                    </div>
                    <div className="w3-group" >
                        <input className="w3-input" ref="lastname" type="text"  required/>
                        <label className="w3-label" >Last Name</label>
                    </div>            
                    <div className="w3-group" >
                        <input className="w3-input" ref="password" type="password"  required />
                        <label className="w3-label" >Password</label>
                    </div>
                    <div className="w3-group" >
                        <input className="w3-input" ref="email" type="text"  required />
                        <label className="w3-label" >Email</label>
                    </div>
                    <input type="file" ref="picFile" accept="image/*" style={{"display":"none"}} onChange={this.handleFile}/>
                    <a href="#" ref="imageSelector" onClick={this.imageSelect}>Select Profile Pic</a> 
                    <div className="w3-group" ref="picdiv">
                        <img ref="profilepic" src={this.state.imagesource} width="100"></img>
                    </div>            
                    <br/>
                    <br/>
                    <button className="w3-btn w3-theme" style={{marginRight: "1em"}}> Register </button>
                    <button className="w3-btn w3-theme"><a style={{color: "white"}} href="login.html">Login</a></button>
                    <br/>
                </form>
            </div>
        )
    }
})

React.render(
    <Registerform/>,
    document.getElementById("registerform")
)

React.render(
    <Navbar fanbuttonvisibility={"hidden"} postbuttonvisibility={"hidden"}/>,
    document.getElementById("navbar")
)