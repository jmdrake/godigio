/**
* React.js component
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Loginform = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        console.log(this.refs.username.getDOMNode().value);
        var username = this.refs.username.getDOMNode().value;        
        var password = this.refs.password.getDOMNode().value;
        console.log("username : " + username + " password : " + password);
        fanhub.login(username, password).then(function(){
            window.location.replace("fanhub.html");
        }).catch(function(err){
            if(err.name=="unauthorized") {
                alert("Wrong username or password")
            } else {
                alert("Unknown error logging in");
                console.log(err.name);
            } 
        })
    },
    register: function() {
        window.location.replace("register.html")
    },
    render: function() {
        return(
            <div className="w3-container w3-half" >
                <form className="w3-container w3-card-4" onSubmit={this.handleSubmit}>
                    <h2 className="w3-text-theme" >Login</h2>
                    <div className="w3-group" >
                        <input className="w3-input" ref="username" type="text"  required/>
                        <label className="w3-label" >Username</label>
                    </div>
                    <div className="w3-group" >
                        <input className="w3-input" ref="password" type="password"  required />
                        <label className="w3-label" >Password</label>
                    </div>
                    <br/>
                    <button className="w3-btn w3-theme" style={{marginRight: "1em"}}> Log in </button>
                    <button className="w3-btn w3-theme" onClick={this.register}> Register </button>
                    <br/>
                </form>
            </div>
        )
    }
})

React.render(
    <Loginform/>,
    document.getElementById("loginform")
)

React.render(
    <Navbar fanbuttonvisibility={"hidden"} postbuttonvisibility={"hidden"}/>,
    document.getElementById("navbar")
)
