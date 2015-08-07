/**
* React.js component
*/
"use strict";

var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");
var Loginform = React.createClass({
    displayName: "Loginform",

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log(this.refs.username.getDOMNode().value);
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        console.log("username : " + username + " password : " + password);
        fanhub.login(username, password).then(function () {
            window.location.replace("fanhub.html");
        })["catch"](function (err) {
            if (err.name == "unauthorized") {
                alert("Wrong username or password");
            } else {
                alert("Unknown error logging in");
                console.log(err.name);
            }
        });
    },
    register: function register() {
        window.location.replace("register.html");
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "w3-container w3-half" },
            React.createElement(
                "form",
                { className: "w3-container w3-card-4", onSubmit: this.handleSubmit },
                React.createElement(
                    "h2",
                    { className: "w3-text-theme" },
                    "Login"
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "username", type: "text", required: true }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "Username"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "password", type: "password", required: true }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "Password"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { className: "w3-btn w3-theme", style: { marginRight: "1em" } },
                    " Log in "
                ),
                React.createElement(
                    "button",
                    { className: "w3-btn w3-theme", onClick: this.register },
                    " Register "
                ),
                React.createElement("br", null)
            )
        );
    }
});

React.render(React.createElement(Loginform, null), document.getElementById("loginform"));

React.render(React.createElement(Navbar, { fanbuttonvisibility: "hidden", postbuttonvisibility: "hidden" }), document.getElementById("navbar"));