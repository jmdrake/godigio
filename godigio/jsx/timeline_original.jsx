/**
* React.js component
*/
var messagedb = new PouchDB("messages");

var PostList = React.createClass({
    render: function() {
        var deletePost = function(post){
            // e.preventDefault();
            console.log("Deleting --> " + JSON.stringify(post))
            messagedb.remove(post.doc);
        };
        var createPost = function(post, index) {
            return (
            <div className="row" id={post.id} key={post.id}>
                <br/>
                <div className="col-md-2 col-sm-3 text-center">
                    <a className="story-img" href="http://testing.theoutershell.com/dashboard.html#"><img src="./fanhub_cameron_files/100" style={{ "width": "100px", "height": "100px"}} className="img-circle" /></a>
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-xs-9">
                            <p>{post.doc.text}</p>
                            <ul className="list-inline">
                                <li><a href="http://testing.theoutershell.com/dashboard.html#">2 Days Ago</a></li>
                                <li><a href="http://testing.theoutershell.com/dashboard.html#"><i className="glyphicon glyphicon-comment" ></i> 4 Comments</a></li>
                                <li><a href="http://testing.theoutershell.com/dashboard.html#"><i className="glyphicon glyphicon-share" ></i> 34 Shares</a></li>
                            </ul>
                            <form onSubmit = {handleSubmit}>
                                <div className="input-group">
                                    <div className="input-group-btn">
                                        <button className="btn btn-default">Like</button>
                                        <button className="btn btn-default"><i className="glyphicon glyphicon-share"></i></button>
                                        <button className="btn btn-default" onClick={deletePost.bind(null, post)}>
                                            <i className="glyphicon glyphicon-trash"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Add a comment.." onChange={onChange} value={this.state.text}/>
                                </div>
                            </form>
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
    };
    return (
        <div className="panel-body">
            {this.props.items.map(createPost)}
        </div>
        );
    }
});

var Timeline = React.createClass({
    getInitialState: function() {        
        return {items: postlist};
    },
    render: function() {
        console.log("Rendering timeline");
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><a href="http://testing.theoutershell.com/dashboard.html#" className="pull-right">View all</a>
                    <h4>Timeline</h4>
                </div>
                <PostList items={this.state.items}/>
            </div>
            
        )
    }
})

var postlist = [];

function showMessages(){
    console.log("Updating messages");
    messagedb.allDocs({include_docs: true, descending: true}, function(err, doc) {
        postlist = doc.rows;
        document.getElementById("timeline").innerHTML = "";
        React.render(
            <Timeline/>,
            document.getElementById("timeline")
        )    
    });    
}

messagedb.changes({
  since: 'now',
  live: true
}).on('change', showMessages);

showMessages();