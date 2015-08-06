/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-20
* Time: 10:30 AM
* To change this template use Tools | Templates.
*/
var Navbar = React.createClass({
    getInitialState: function() {
        return {btnlabel : this.props.btnlabel}
    },
    logOut: function() {
        fanhub.logout().then(function(res){
            window.location.replace("login.html")
        })    
    },
    toggleFan : function() {
        if(this.state.btnlabel=="fan"){
            fanhub.put({"_id" : this.props.fantoken});
            this.setState({btnlabel : "unfan"});
        } else {
            self = this;
            fanhub.get(this.props.fantoken).then(function(doc){
                fanhub.remove(doc);
                self.setState({btnlabel : "fan"})
            })
        }
    },
    render: function() {
        imgsrc = this.props.imgsrc;
        imgname = this.props.imgname;
        return(
            <div className="navbar navbar-inverse navbar-static-top">
                <div className="navbar-header">
                    <button className="navbar-toggle btn" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <nav className="collapse navbar-collapse" role="navigation">
                    <form className="navbar-form navbar-left">
                        <div className="input-group input-group-sm" style={{maxWidth :"320px"}}>
                            <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"></input>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="fanhub.html"><i className="glyphicon glyphicon-home"></i> Home</a>
                        </li>i
                        <li style={{visibility:this.props.postbuttonvisibility}}>
                            <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Post</a>
                        </li>
                        <li style={{visibility:this.props.fanbuttonvisibility}}>
                            <a href="#"><span className="badge" onClick={this.toggleFan}>{this.state.btnlabel}</span></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
                            <ul className="dropdown-menu">
                                <li><a href="editprofile.html">Edit Profile</a></li>
                                <li><a href="#" onClick={this.logOut}>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>                                    
            </div>
        
        )
    }
})


