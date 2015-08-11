/**
* React.js component
*/
"use strict";

var FansPanel = React.createClass({
    displayName: "FansPanel",

    getInitialState: function getInitialState() {
        return { fanslist: JSON.parse(localStorage.getItem("godigio.fans")) };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "h4",
                    null,
                    "Fans of ",
                    this.props.name
                )
            ),
            React.createElement(Fanlist, { fans: this.state.fanslist, keyindex: 0 })
        );
    }
});