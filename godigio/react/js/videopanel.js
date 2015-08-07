/**
* React.js component
*/

"use strict";

var ImageFrame = React.createClass({
    displayName: "ImageFrame",

    render: function render() {
        return React.createElement("img", { src: this.props.source, style: { display: this.props.display, width: "100%", height: "80%" } });
    }
});

var VideoFrame = React.createClass({
    displayName: "VideoFrame",

    render: function render() {
        return React.createElement("video", { src: this.props.source, controls: true, style: { display: this.props.display, width: "100%", height: "80%" } });
    }
});

var VideoPanel = React.createClass({
    displayName: "VideoPanel",

    setDisplay: function setDisplay(displayid) {
        var displayarray = this.state.displaystate;
        for (var i = 0; i < 4; i++) {
            displayarray[i] = "none";
        };
        displayarray[displayid] = "block";
        this.setState({ displaystate: displayarray });
    },
    getInitialState: function getInitialState() {
        return {
            videodisplay: "block",
            imagedisplay: "none",
            videosource: "../images/Big_Buck_Bunny.mp4",
            imagesource: "../images/Sakura_Tree_large.jpg",
            displaystate: ["block", "none", "none"]
        };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "a",
                    { href: "#", className: "pull-right" },
                    "View all"
                ),
                React.createElement(
                    "h4",
                    null,
                    "John Doe's Photos and Videos"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "div",
                    { id: "picturevideoframe", className: "row", style: { height: "300px" } },
                    React.createElement(ImageFrame, { source: "../images/Sakura_Tree_large.jpg", display: this.state.displaystate[1] }),
                    React.createElement(ImageFrame, { source: "../images/Tulip_large.jpg", display: this.state.displaystate[2] }),
                    React.createElement(ImageFrame, { source: "../images/Swan_large.jpg", display: this.state.displaystate[3] })
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement("img", { onClick: this.setDisplay.bind(null, 0), className: "thumbnail img-responsive", src: "../images/Sakura_Tree_small.jpg" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement("img", { onClick: this.setDisplay.bind(null, 1), className: "thumbnail img-responsive", src: "../images/Tulip_small.jpg" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement("img", { onClick: this.setDisplay.bind(null, 2), className: "thumbnail img-responsive", src: "../images/Swan_small.jpg" })
                        )
                    )
                )
            )
        );
    }
});

React.render(React.createElement(VideoPanel, null), document.getElementById("videopanel"));