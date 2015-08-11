/**
* React.js component
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Postmodal = React.createClass({
    getInitialState: function() {
        return {text: ''};
    },
    handleSubmit: function(e){
        e.preventDefault();
        console.log("Post Modal trace");
        var data = this.refs.text.getDOMNode().value;
        this.refs.text.getDOMNode().value = "";
        postdb.put({
            "_id" : new Date().toISOString(),
            "text" : data,
            "user" : this.props.user
        })
    },
    updateText: function(e){
        this.setState({text : e.target.value})
    },
    postClick : function(){
        var data = this.state.text;
        postdb.put({
            "_id" : new Date().toISOString(),
            "text" : data,
            "user" : this.props.user
        }).then(function(res){console.log(res)});
    },
    render: function() {
        return(
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        Update Status
                    </div>
                    <div className="modal-body">
                        <form className="form center-block" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <textarea className="form-control input-lg" autofocus="" placeholder="Latest update" onChange={this.updateText} value={this.state.text}>
                                </textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div>
                            <button className="btn btn-primary btn-sm" data-dismiss="modal" aria-hidden="true" onClick={this.postClick}>Post</button>
                            <ul className="pull-left list-inline"><li><a href=""><i className="glyphicon glyphicon-upload"></i></a></li><li><a href=""><i className="glyphicon glyphicon-camera"></i></a></li><li><a href=""><i className="glyphicon glyphicon-map-marker"></i></a></li></ul>
                        </div>	
                    </div>
                </div>
            </div>
        )
    }
})


