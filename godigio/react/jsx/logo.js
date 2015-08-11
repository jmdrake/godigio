/**
* React.js component
*/
"use strict";

var Logo = React.createClass({
    displayName: "Logo",

    render: function render() {
        return React.createElement("div", { className: "row" }, React.createElement("a", { href: "/godigio/", className: "navbar-brand" }, React.createElement("img", { src: "../images/godigiologo.png", width: "100", height: "30", alt: "" })));
    }
});

React.render(React.createElement(Logo, null), document.getElementById("logo"));