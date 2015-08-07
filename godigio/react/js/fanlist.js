/**
* React.js component
*/

"use strict";

var Fanlist = React.createClass({
    displayName: "Fanlist",

    render: function render() {
        var fanlist = this.props.fans.map(function (fan) {
            return React.createElement(Imageframe, { src: fan.imgsrc, desc: fan.firstname + " " + fan.lastname, key: fan.userid, link: "./fanhub.html?user=" + fan.userid });
        });
        return React.createElement(
            "div",
            { className: "fanlist row" },
            fanlist
        );
    }
});