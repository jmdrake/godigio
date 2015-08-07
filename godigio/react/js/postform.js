/**
* React.js component
*/
"use strict";

var postdb = new PouchDB("https://godigiolive.iriscouch.com/posts");
var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");

var Postform = React.createClass({
    displayName: "Postform",

    getInitialState: function getInitialState() {
        return { displayimage: "none" };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var data = this.refs.text.getDOMNode().value;
        var self = this;
        if (this.state.displayimage == "none") {
            postdb.put({
                "_id": new Date().toISOString(),
                "text": data,
                "user": self.props.user
            }).then(function (res) {
                self.refs.text.getDOMNode().value = "";
            });
        } else {
            blobUtil.imgSrcToBlob(this.state.imagesource).then(function (blob) {
                blobUtil.blobToBase64String(blob).then(function (base64) {
                    postdb.put({
                        "_id": new Date().toISOString(),
                        "text": data,
                        "user": self.props.user,
                        "_attachments": {
                            'image': {
                                content_type: self.state.imagesource.type,
                                data: base64
                            }
                        }
                    }).then(function (res) {
                        self.refs.text.getDOMNode().value = "";
                        self.setState({ displayimage: "none", imagesource: null });
                    });
                });
            });
        }
    },
    imageSelect: function imageSelect() {
        this.refs.picFile.getDOMNode().click();
    },
    handleFile: function handleFile(e) {
        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function (upload) {
            self.setState({
                imagesource: upload.target.result,
                displayimage: "block"
            });
        };
        reader.readAsDataURL(file);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "well" },
            React.createElement(
                "form",
                { className: "form-horizontal", onSubmit: this.handleSubmit },
                React.createElement(
                    "h4",
                    null,
                    "What's New"
                ),
                React.createElement(
                    "div",
                    { className: "form-group", style: { padding: "14px" } },
                    React.createElement("textarea", { className: "form-control", placeholder: "Update your status", ref: "text" })
                ),
                React.createElement("input", { type: "file", ref: "picFile", accept: "image/*", style: { "display": "none" }, onChange: this.handleFile }),
                React.createElement(
                    "div",
                    { ref: "imageupload" },
                    React.createElement("img", { src: this.state.imagesource, style: { "display": this.state.displayimage }, width: "100px", height: "100px" })
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary pull-right" },
                    "Post"
                ),
                React.createElement(
                    "ul",
                    { className: "list-inline" },
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement("i", { className: "glyphicon glyphicon-upload" })
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.imageSelect },
                            React.createElement("i", { className: "glyphicon glyphicon-camera" })
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#" },
                            React.createElement("i", { className: "glyphicon glyphicon-map-marker" })
                        )
                    )
                )
            )
        );
    }
});