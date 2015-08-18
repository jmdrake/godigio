/**
* React.js component
*/

"use strict";

var fanhub = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/fanhub");
var profiles = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/profiles");
var posts = new PouchDB("https://admin:8a7d03517aed@godigio.smileupps.com/posts");

var Postform = React.createClass({
    displayName: "Postform",

    getInitialState: function getInitialState() {
        return { displayimage: "none" };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var data = this.refs.text.getDOMNode().value;
        var self = this;
        var imagesource;
        var file_data = this.state.file_data;
        var form_data = new FormData();
        var newdoc = { "_id": new Date().toISOString(), "text": data, "user": self.props.user };
        form_data.append('file', file_data);
        form_data.append('name', "images-" + newdoc["_id"]);
        if (this.state.displayimage == "none") {
            console.log("Post trace 2");
            posts.put(newdoc).then(function (res) {
                self.refs.text.getDOMNode().value = "";
            });
        } else {
            $.ajax({
                url: 'upload.php', // point to server-side PHP script
                dataType: 'text', // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function success(php_script_response) {
                    // $("#loading").attr("style", "display:none");
                    if (php_script_response.startsWith("Error")) {
                        console.log(php_script_response);
                    } else {
                        console.log(php_script_response);
                        newdoc["url"] = php_script_response.split("Success:")[1];
                        posts.put(newdoc).then(function (res) {
                            self.refs.text.getDOMNode().value = "";
                            self.setState({ displayimage: "none", imagesource: null });
                        })["catch"](function (err) {
                            console.log("Error adding post : " + err);
                        });
                    }
                }
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
                displayimage: "block",
                file_data: file
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