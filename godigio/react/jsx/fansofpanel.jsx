/**
* React.js component
*/
var FanOfPanel = React.createClass({
    createImage: function(fantoken, index){
        var userid = fantoken.id.split("+")[1];
        getUserInformation(userid).then(function(user){          
            <Imagefarm src={user.profilepic} desc = {user.name}/>
        })
    },
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>{this.props.name} Is A Fan Of</h4></div>
                <div className="panel-body">
                    {this.props.userlist.map(this.createImage)}
                </div>
            </div>
        )
    }
})
