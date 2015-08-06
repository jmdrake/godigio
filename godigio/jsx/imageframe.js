/**
* React.js component
*/
"use strict";

var Imageframe = React.createClass({
    displayName: "Imageframe",

    render: function render() {
        return React.createElement(
            "div",
            { className: "img col-xs-6 col-md-3" },
            React.createElement(
                "a",
                { target: "_self", href: this.props.link },
                React.createElement("img", { src: this.props.src, alt: this.props.desc, width: "110", height: "90" })
            ),
            React.createElement(
                "div",
                { className: "desc" },
                this.props.desc
            )
        );
    }
});
