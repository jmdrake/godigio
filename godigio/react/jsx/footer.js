/**
* React.js component
*/
"use strict";

var Footer = React.createClass({
    displayName: "Footer",

    render: function render() {
        return React.createElement("div", null, React.createElement("div", { className: "col-md-4" }, React.createElement("h4", null, React.createElement("a", { href: "#" }, "About Godigio"))), React.createElement("div", { className: "col-md-4" }, React.createElement("h4", null, React.createElement("a", { href: "#" }, "Services"))), React.createElement("div", { className: "col-md-4" }, React.createElement("h4", null, React.createElement("a", { href: "/godigio/store" }, "Store"))));
    }
});

React.render(React.createElement(Footer, null), document.getElementById("footer"));