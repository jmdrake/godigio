/**
* React.js component
*/
var clouddb = "https://godigiolive.iriscouch.com/";
var messagedb = new PouchDB(clouddb + "posts");

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
        var comments = this.props.post.comments ? this.props.post.comments : [];              
        return {
            comments: comments, 
            doc : this.props.post,
            commentcount : comments.length,
            imgdisplay : this.props.post.url == null ? "none" : "block"
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var comment = this.refs.comment.getDOMNode().value;
        if(comment != "") {
            var nextComments = this.state.comments.concat(comment);       
            this.state.doc.comments = nextComments;
            this.setState({
                comments: nextComments, 
                comment: '', 
                commentcount : nextComments.length
            });
            messagedb.put(this.state.doc);            
        }
    },
    deletePost: function(post){
        messagedb.remove(post).catch(function(err){
            console.log(err.name);
            console.log(JSON.stringify(post));
        });
    },
    render: function(){
            return (
            <div className="row" id={this.props.post.id} key={this.props.post.id}>
                <br/>
                <div className="col-md-2 col-sm-3 text-center">
                    <a className="story-img" href="#">
                        <img src={this.props.post.url} style={{ "width": "100px", "height": "100px", "display" : this.state.imgdisplay}} className="img-circle" />
                    </a>
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-xs-9">
                            <p>{this.props.post.text}</p>
                            <ul className="list-inline">
                                <li><a href="#">2 Days Ago</a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-comment" ></i> {this.state.commentcount} Comments</a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-share" ></i> 34 Shares</a></li>
                            </ul>
                            <form onSubmit = {this.handleSubmit}>
                                <div className="input-group">
                                    <div className="input-group-btn">
                                        <button className="btn btn-default">Like</button>
                                        <button className="btn btn-default"><i className="glyphicon glyphicon-share"></i></button>
                                        <button className="btn btn-default" onClick={this.deletePost.bind(null, this.props.post)}>
                                            <i className="glyphicon glyphicon-trash"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Add a comment.." ref="comment"/>
                                </div>
                            </form>
                            <div className="w3-container">
                                <Comments comments={this.state.comments}/>
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
                <Post post={post}/>
            )
        });
        return (
            <div className = "postlist">
            {postlist}
            </div>
        )
    }
})
