/**
* React.js component
*/
"use strict";

var FanOfPanel = React.createClass({
    displayName: "FanOfPanel",

    getInitialState: function getInitialState() {
        return { fanoflist: JSON.parse(localStorage.getItem("godigio.fanof")) };
    },
    render: function render() {
        return React.createElement("div", { className: "panel panel-default" }, React.createElement("div", { className: "panel-heading" }, React.createElement("h4", null, "Fans of ", this.props.name)), React.createElement(Fanlist, { fans: this.state.fanoflist, keyindex: 1 }));
    }
});