/**
* React.js component
*/

"use strict";

var Image = React.createClass({
    displayName: "Image",

    getInitialState: function getInitialState() {
        return { imgsrc: "../images/100x100.jpg", name: "" };
    },
    render: function render() {
        var self = this;
        profiledb.get(key).then(function (userdoc) {
            set.setState({ name: userdoc.firstname + " " + userdoc.lastname });
        });
        getAttachment(profiledb, this.props.key, "profilepic").then(function (attachment) {
            if (attachment != null) self.setState({ imgsrc: attachment });
        });
        return React.createElement(
            "div",
            { className: "img col-xs-6 col-md-3" },
            React.createElement(
                "a",
                { target: "_self", href: this.props.link },
                React.createElement("img", { src: self.state.imgsrc, alt: this.state.name, key: this.props.key, width: "110", height: "90" })
            ),
            React.createElement(
                "div",
                { className: "desc" },
                this.state.name
            )
        );
    }
});

var Fanlist = React.createClass({
    displayName: "Fanlist",

    render: function render() {
        var fanlist = this.props.fans.map(function (fan) {
            return React.createElement(Image, { key: fan.id.split("+")[this.props.keyindex] });
        });
        return React.createElement(
            "div",
            { className: "fanlist row" },
            fanlist
        );
    }
});