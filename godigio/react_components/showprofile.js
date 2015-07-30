/**
* React.js component
*/

var ShowProfile = React.createClass({
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-thumbnail">
                    <img src={this.props.profileimg} className="img-responsive"></img>
                </div>
                <div className="panel-body">
                    <p className="lead">{this.props.name}</p>
                    <p>{this.props.fancount} Fans, {this.props.postcount} Posts {this.props.name}</p>
                    <p>
                        <img src="../images/usericon.jpg" width="28px" height="28px"></img>
                    </p>
                </div>
            </div>            
        )
    }
})

