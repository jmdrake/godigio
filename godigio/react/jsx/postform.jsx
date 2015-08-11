/**
* React.js component
*/

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Postform = React.createClass({
    getInitialState: function(){
        return {displayimage : "none"}  
    },
    handleSubmit: function(e){
        e.preventDefault();
        var data = this.refs.text.getDOMNode().value;
        var self = this;        
        console.log("Post trace 1");
        if(this.state.displayimage=="none"){
            console.log("Post trace 2");
            posts.put({
                "_id" : new Date().toISOString(),
                "text" : data,
                "user" : self.props.user
            }).then(function(res){
                self.refs.text.getDOMNode().value = "";
            })
        } else {
            blobUtil.dataURLToBlob(self.state.imagesource).then(function(blob){
                console.log("Post trace 3.1");
                return blobUtil.blobToBase64String(blob)
            }).then(function(base64){         
                console.log("Post trace 3.2");
                return posts.put({
                    "_id" : new Date().toISOString(),
                    "text" : data,
                    "user" : self.props.user,
                    "_attachments" : {
                        'image': {
                            content_type: self.state.imagesource.type,
                            data : base64
                            }
                    }
                })                    
            }).then(function(res){
                console.log("Post trace 3.3");
                self.refs.text.getDOMNode().value = "";
                self.setState({displayimage : "none", imagesource: null})
            });
        }
    },
    imageSelect : function(){        
        this.refs.picFile.getDOMNode().click();
    },
    handleFile: function(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function(upload) {
            self.setState({
                imagesource: upload.target.result,
                displayimage : "block"
            });
        }
        reader.readAsDataURL(file);
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
                    <input type="file" ref="picFile" accept="image/*" style={{"display":"none"}} onChange={this.handleFile}/>
                    <div ref="imageupload">
                        <img src={this.state.imagesource} style={{"display" : this.state.displayimage}} width="100px" height="100px"/>
                    </div>
                    <button className="btn btn-primary pull-right">Post</button>
                    <ul className="list-inline">
                        <li>
                            <a href="#">
                                <i className="glyphicon glyphicon-upload"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={this.imageSelect}>
                                <i className="glyphicon glyphicon-camera"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="glyphicon glyphicon-map-marker"></i>
                            </a>
                        </li>
                    </ul>
                </form>
            </div>        
        )
    }
})




