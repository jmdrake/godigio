/**
* React.js component
*/

"use strict";

var ShowProfile = React.createClass({
    displayName: "ShowProfile",

    render: function render() {
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-thumbnail" },
                React.createElement("img", { src: this.props.profileimg, className: "img-responsive" })
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "p",
                    { className: "lead" },
                    this.props.name
                ),
                React.createElement(
                    "p",
                    null,
                    this.props.fancount,
                    " Fans, ",
                    this.props.postcount,
                    " Posts ",
                    this.props.name
                ),
                React.createElement(
                    "p",
                    null,
                    React.createElement("img", { src: "../images/usericon.jpg", width: "28px", height: "28px" })
                )
            )
        );
    }
});
