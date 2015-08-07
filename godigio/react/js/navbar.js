/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-20
* Time: 10:30 AM
* To change this template use Tools | Templates.
*/
"use strict";

var Navbar = React.createClass({
    displayName: "Navbar",

    getInitialState: function getInitialState() {
        return { btnlabel: this.props.btnlabel };
    },
    logOut: function logOut() {
        fanhub.logout().then(function (res) {
            window.location.replace("login.html");
        });
    },
    toggleFan: function toggleFan() {
        if (this.state.btnlabel == "fan") {
            fanhub.put({ "_id": this.props.fantoken });
            this.setState({ btnlabel: "unfan" });
        } else {
            var self = this;
            fanhub.get(this.props.fantoken).then(function (doc) {
                fanhub.remove(doc);
                self.setState({ btnlabel: "fan" });
            });
        }
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "navbar navbar-inverse navbar-static-top" },
            React.createElement(
                "div",
                { className: "navbar-header" },
                React.createElement(
                    "button",
                    { className: "navbar-toggle btn", type: "button", "data-toggle": "collapse", "data-target": ".navbar-collapse" },
                    React.createElement(
                        "span",
                        { className: "sr-only" },
                        "Toggle"
                    ),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" })
                )
            ),
            React.createElement(
                "nav",
                { className: "collapse navbar-collapse", role: "navigation" },
                React.createElement(
                    "form",
                    { className: "navbar-form navbar-left" },
                    React.createElement(
                        "div",
                        { className: "input-group input-group-sm", style: { maxWidth: "320px" } },
                        React.createElement("input", { type: "text", className: "form-control", placeholder: "Search", name: "srch-term", id: "srch-term" }),
                        React.createElement(
                            "div",
                            { className: "input-group-btn" },
                            React.createElement(
                                "button",
                                { className: "btn btn-default", type: "submit" },
                                React.createElement("i", { className: "glyphicon glyphicon-search" })
                            )
                        )
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "nav navbar-nav" },
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "fanhub.html" },
                            React.createElement("span", { className: "glyphicon glyphicon-home" }),
                            " Home"
                        )
                    ),
                    React.createElement(
                        "li",
                        { style: { visibility: this.props.postbuttonvisibility } },
                        React.createElement(
                            "a",
                            { href: "#postModal", role: "button", "data-toggle": "modal" },
                            React.createElement("span", { className: "glyphicon glyphicon-plus" }),
                            " Post"
                        )
                    ),
                    React.createElement(
                        "li",
                        { style: { visibility: this.props.fanbuttonvisibility } },
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement(
                                "span",
                                { className: "badge", onClick: this.toggleFan },
                                this.state.btnlabel
                            )
                        )
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "nav navbar-nav navbar-right" },
                    React.createElement(
                        "li",
                        { className: "dropdown" },
                        React.createElement(
                            "a",
                            { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown" },
                            React.createElement("i", { className: "glyphicon glyphicon-user" })
                        ),
                        React.createElement(
                            "ul",
                            { className: "dropdown-menu" },
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "editprofile.html" },
                                    "Edit Profile"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this.logOut },
                                    "Logout"
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});