/**
* React.js component
*/
"use strict";

var FanOfPanel = React.createClass({
    displayName: "FanOfPanel",

    createImage: function createImage(fantoken, index) {
        var userid = fantoken.id.split("+")[1];
        getUserInformation(userid).then(function (user) {
            React.createElement(Imagefarm, { src: user.profilepic, desc: user.name });
        });
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
                    this.props.name,
                    " Is A Fan Of"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                this.props.userlist.map(this.createImage)
            )
        );
    }
});
