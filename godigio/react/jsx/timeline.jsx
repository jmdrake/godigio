/**
* React.js component
*/
var clouddb = "https://admin:8a7d03517aed@godigio.smileupps.com/";
var messagedb = new PouchDB(clouddb + "posts");
var messagecache = new PouchDB("postcache");

var Comments = React.createClass({    
    render: function() {
        var createItem = function(itemText, index) {
            return <li key={index + itemText}>{itemText}</li>;
        };
    return <ul className="w3-ul">{this.props.comments.map(createItem)}</ul>;
    } 
});

var Post = React.createClass({
    getInitialState: function() {
        return {
            imgurl : null,
            imgdisplay : "none"
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var comment = this.refs.comment.getDOMNode().value;        
        var newComments = this.props.post.comments ? this.props.post.comments : [];
        newComments = newComments.concat(comment);        
        this.refs.comment.getDOMNode().value = "";
        self = this;
        messagedb.get(this.props.post["_id"]).then(function(newdoc){
            newdoc.comments = newComments;
            messagedb.put(newdoc);            
        });
    },
    deletePost: function(post){
        messagedb.remove(post).catch(function(err){
            console.log(err.name);
            console.log(JSON.stringify(post));
        });
    },
    render: function(){
        var self = this;
        return (
            <div className="row" id={this.props.post.id} key={this.props.post.id}>
                <br/>
                <div className="col-md-2 col-sm-3 text-center">
                    <a className="story-img" href="#">
                        <img src={this.props.post.url ? this.props.post.url : null} style={{"display" : this.props.post.url ? "block" : "none"}} 
                            className="img-circle"/>
                    </a>
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-xs-9">
                            <p>{this.props.post.text}</p>
                            <ul className="list-inline">
                                <li><a href="#">2 Days Ago</a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-comment" ></i> {this.props.post.comments ? this.props.post.comments.length : 0} Comments</a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-share" ></i> 34 Shares</a></li>
                            </ul>
                                <div className="input-group">
                                    <div className="input-group-btn">
                                        <button className="btn btn-default">Like</button>
                                        <button className="btn btn-default"><i className="glyphicon glyphicon-share"></i></button>
                                        <button className="btn btn-default" onClick={this.deletePost.bind(null, this.props.post)}>
                                            <i className="glyphicon glyphicon-trash"></i>
                                        </button>
                                    </div>
                                    <form onSubmit = {this.handleSubmit}>
                                        <input type="text" className="form-control" placeholder="Add a comment.." ref="comment"/>
                                    </form>
                                </div>                            
                            <div className="w3-container">
                                <Comments comments={this.props.post.comments ? this.props.post.comments : []}/>
                            </div>
                        </div>
                        <div className="col-xs-3"></div>
                    </div>
                    <br/>
                    <br/>
                </div>
                <div>&nbsp;
                    <hr/>
                </div>
            </div>
        )                  
    }
})

var Timeline = React.createClass({
    render: function() {
        var postlist = this.props.posts.map(function(post){
            return (
                <Post post={post.doc}/>
            )
        });
        return (
            <div className = "postlist">
            {postlist}
            </div>
        )
    }
})
