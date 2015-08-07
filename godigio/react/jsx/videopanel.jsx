/**
* React.js component
*/

var ImageFrame = React.createClass({
   render: function(){
       return(
           <img src={this.props.source} style={{display:this.props.display, width : "100%", height : "80%"}}/>
       )
   } 
});

var VideoFrame = React.createClass({
   render: function(){
       return(
           <video src={this.props.source} controls style={{display:this.props.display, width : "100%", height : "80%"}}/>
       )
   } 
});

var VideoPanel = React.createClass({
    setDisplay: function(displayid){
        var displayarray = this.state.displaystate;
        for(var i = 0; i < 4; i++) {
            displayarray[i] = "none";
        };
        displayarray[displayid] = "block";
        this.setState({displaystate:displayarray})
    },
    getInitialState: function() {
        return {
            videodisplay: "block", 
            imagedisplay: "none", 
            videosource:"../images/Big_Buck_Bunny.mp4",
            imagesource:"../images/Sakura_Tree_large.jpg",
            displaystate:["block", "none", "none"]
        };
    },
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><a href="#" className="pull-right">View all</a><h4>John Doe's Photos and Videos</h4></div>
                <div className="panel-body">
                    <div id="picturevideoframe" className="row" style={{height:"300px"}}>
                        <ImageFrame source="../images/Sakura_Tree_large.jpg" display={this.state.displaystate[1]}/>
                        <ImageFrame source="../images/Tulip_large.jpg" display={this.state.displaystate[2]}/>
                        <ImageFrame source="../images/Swan_large.jpg" display={this.state.displaystate[3]}/>            
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 col-xs-6">
                            <a href="#">
                                <img onClick={this.setDisplay.bind(null, 0)} className="thumbnail img-responsive" src="../images/Sakura_Tree_small.jpg"></img>
                            </a>
                        </div>
                        <div className="col-lg-3 col-sm-4 col-xs-6">
                            <a href="#">
                                <img onClick={this.setDisplay.bind(null, 1)} className="thumbnail img-responsive" src="../images/Tulip_small.jpg"></img>
                            </a>
                        </div>
                        <div className="col-lg-3 col-sm-4 col-xs-6">
                            <a href="#">
                                <img onClick={this.setDisplay.bind(null, 2)} className="thumbnail img-responsive" src="../images/Swan_small.jpg"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>        
        )
    }
})

React.render(
    <VideoPanel/>,
    document.getElementById("videopanel")
)
