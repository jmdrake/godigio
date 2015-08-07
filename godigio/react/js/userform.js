/**
* React.js component
*/
"use strict";

var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");
var profiles = new PouchDB("https://godigiolive.iriscouch.com/profiles");

var Userform = React.createClass({
    displayName: "Userform",

    getInitialState: function getInitialState() {
        defaultimg = this.props.profileimg;
        return {
            imagesource: defaultimg,
            defaultimg: defaultimg,
            firstname: this.props.doc.firstname,
            lastname: this.props.doc.lastname,
            email: this.props.doc.email
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var username = this.props.doc["_id"];
        var firstname = this.state.firstname;
        var lastname = this.refs.lastname.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var imgurl = this.refs.profilepic.getDOMNode().src;
        var defaultimg = this.state.defaultimg;
        profiles.get(username).then(function (doc) {
            doc.firstname = firstname;doc.lastname = lastname;doc.email = email;
            var rev = doc["_rev"];
            return profiles.put(doc);
        }).then(function (res) {
            if (imgurl != defaultimg) {
                console.log("Trace 1");
                blobUtil.dataURLToBlob(imgurl).then(function (blob) {
                    profiles.putAttachment(username, "profilepic", res.rev, blob, "images/png");
                });
            }
        }).then(function (res) {
            window.location.replace("fanhub.html");
        })["catch"](function (err) {
            alert("Unknown error updating profile");
            console.log(err.name);
        });
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
    fnameChange: function fnameChange(event) {
        this.setState({ firstname: event.target.value });
    },
    lnameChange: function lnameChange(event) {
        this.setState({ lastname: event.target.value });
    },
    emailChange: function emailChange(event) {
        this.setState({ email: event.target.value });
    },
    render: function render() {
        property = this.props.property;
        return React.createElement(
            "div",
            { className: "w3-container w3-half" },
            React.createElement(
                "form",
                { className: "w3-container w3-card-4", onSubmit: this.handleSubmit },
                React.createElement(
                    "h2",
                    { className: "w3-text-theme" },
                    "Edit Profile"
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "firstname", type: "text", required: true, value: this.state.firstname, onChange: this.fnameChange }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "First Name"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "lastname", type: "text", required: true, value: this.state.lastname, onChange: this.lnameChange }),
                    React.createElement(
                        "label",
                        { className: "w3-label" },
                        "Last Name"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w3-group" },
                    React.createElement("input", { className: "w3-input", ref: "email", type: "text", required: true, value: this.state.email, onChange: this.emailChange }),
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
                React.createElement(
                    "button",
                    { className: "w3-btn w3-theme" },
                    " Update "
                ),
                React.createElement("br", null)
            )
        );
    }
});

fanhub.getSession().then(function (res) {
    if (res.userCtx.name == null) {
        window.location.replace("/fanhub/login.html");
    } else {
        return profiles.get(res.userCtx.name);
    }
}).then(function (doc) {
    if (doc["_attachments"] && doc["_attachments"]["profilepic"]) {
        profiles.getAttachment(doc["_id"], "profilepic").then(function (blob) {
            var imgsrc = blobUtil.createObjectURL(blob);
            React.render(React.createElement(Userform, { doc: doc, profileimg: imgsrc }), document.getElementById("userform"));
        });
    } else {
        React.render(React.createElement(Userform, { doc: doc, profileimg: "../images/profile-icon.png" }), document.getElementById("userform"));
    }
});