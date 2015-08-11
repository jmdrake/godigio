/**
* React.js component
*/

"use strict";

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Registerform = React.createClass({
    displayName: "Registerform",

    getInitialState: function getInitialState() {
        var defaultimg = "../images/100x100.jpg";
        return {
            imagesource: defaultimg,
            defaultimg: defaultimg
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var firstname = this.refs.firstname.getDOMNode().value;
        var lastname = this.refs.lastname.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var imgurl = this.refs.profilepic.getDOMNode().src;
        if (imgurl == this.state.defaultimg) {
            fanhub.signup(username, password).then(function (res) {
                return fanhub.login(username.password);
            }).then(function (res) {
                return profiles.put({ "_id": username, "firstname": firstname, "lastname": lastname, "email": email });
            }).then(function (res) {
                window.location.replace("fanhub.html");
            })["catch"](function (err) {
                alert("Unknown error registering");
                console.log(err.name);
            });
        } else {
            fanhub.signup(username, password).then(function (res) {
                return fanhub.login(username, password);
            }).then(function (res) {
                return blobUtil.dataURLToBlob(imgurl);
            }).then(function (blob) {
                return blobUtil.blobToBase64String(blob);
            }).then(function (base64) {
                return profiles.put({ "_id": username,
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "_attachments": {
                        'profilepic': {
                            content_type: imgurl.type,
                            data: base64
                        } } });
            }).then(function (res) {
                window.location.replace("fanhub.html");
            })["catch"](function (err) {
                alert("Unknown error registering");
                console.log(err.name);
            });
        }
    },
    imageSelect: function imageSelect() {
        console.log("Select image to upload");
        this.refs.picFile.getDOMNode().click();
    },
    handleFile: function handleFile(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function (upload) {
            self.setState({
                imagesource: upload.target.result
            });
        };
        reader.readAsDataURL(file);
    },
    login: function login() {
        window.replace("login.html");
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
                    "Register"
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
                    React.createElement("input", { className: "w3-input", ref: "firstname", type: "text", required: true }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "First Name"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "lastname", type: "text", required: true }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "Last Name"
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
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "email", type: "text", required: true }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "Email"
                    )
                ),
                React.createElement("input", { type: "file", ref: "picFile", accept: "image/*", style: { "display": "none" }, onChange: this.handleFile }),
                React.createElement(
                    "a",
                    { href: "#", ref: "imageSelector", onClick: this.imageSelect },
                    "Select Profile Pic"
                ),
                React.createElement(
                    "div",
                    { className: "w3-group", ref: "picdiv" },
                    React.createElement("img", { ref: "profilepic", src: this.state.imagesource, width: "100" })
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    { className: "w3-btn w3-theme", style: { marginRight: "1em" } },
                    " Register "
                ),
                React.createElement(
                    "button",
                    { className: "w3-btn w3-theme" },
                    React.createElement(
                        "a",
                        { style: { color: "white" }, href: "login.html" },
                        "Login"
                    )
                ),
                React.createElement("br", null)
            )
        );
    }
});

React.render(React.createElement(Registerform, null), document.getElementById("registerform"));

React.render(React.createElement(Navbar, { fanbuttonvisibility: "hidden", postbuttonvisibility: "hidden" }), document.getElementById("navbar"));