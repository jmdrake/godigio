/**
* React.js component
*/
var postdb = new PouchDB("https://godigiolive.iriscouch.com/posts");
var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");

var Postform = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var data = this.refs.text.getDOMNode().value;
        this.refs.text.getDOMNode().value = "";
        postdb.put({
            "_id" : new Date().toISOString(),
            "text" : data,
            "user" : this.props.user
        })
    },
    render: function() {
        return(
            <div className="well"> 
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <h4>What's New</h4>
                    <div className="form-group" style={{padding:"14px"}}>
                        <textarea className="form-control" placeholder="Update your status" ref="text">                        
                        </textarea>
                    </div>
                    <button className="btn btn-primary pull-right">Post</button>
                    <ul className="list-inline">
                        <li>
                            <a href="">
                                <i className="glyphicon glyphicon-upload"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="glyphicon glyphicon-camera"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="glyphicon glyphicon-map-marker"></i>
                            </a>
                        </li>
                    </ul>
                </form>
            </div>        
        )
    }
})




