/**
* React.js component
*/
"use strict";

var postdb = new PouchDB("https://godigiolive.iriscouch.com/posts");
var fanhub = new PouchDB("https://godigiolive.iriscouch.com/fanhub");

var Postmodal = React.createClass({
    displayName: "Postmodal",

    getInitialState: function getInitialState() {
        return { text: '' };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log("Post Modal trace");
        var data = this.refs.text.getDOMNode().value;
        this.refs.text.getDOMNode().value = "";
        postdb.put({
            "_id": new Date().toISOString(),
            "text": data,
            "user": this.props.user
        });
    },
    updateText: function updateText(e) {
        this.setState({ text: e.target.value });
    },
    postClick: function postClick() {
        var data = this.state.text;
        postdb.put({
            "_id": new Date().toISOString(),
            "text": data,
            "user": this.props.user
        }).then(function (res) {
            console.log(res);
        });
    },
    render: function render() {
        return React.createElement("div", { className: "modal-dialog" }, React.createElement("div", { className: "modal-content" }, React.createElement("div", { className: "modal-header" }, React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true" }, "×"), "Update Status"), React.createElement("div", { className: "modal-body" }, React.createElement("form", { className: "form center-block", onSubmit: this.handleSubmit }, React.createElement("div", { className: "form-group" }, React.createElement("textarea", { className: "form-control input-lg", autofocus: "", placeholder: "Latest update", onChange: this.updateText, value: this.state.text })))), React.createElement("div", { className: "modal-footer" }, React.createElement("div", null, React.createElement("button", { className: "btn btn-primary btn-sm", "data-dismiss": "modal", "aria-hidden": "true", onClick: this.postClick }, "Post"), React.createElement("ul", { className: "pull-left list-inline" }, React.createElement("li", null, React.createElement("a", { href: "" }, React.createElement("i", { className: "glyphicon glyphicon-upload" }))), React.createElement("li", null, React.createElement("a", { href: "" }, React.createElement("i", { className: "glyphicon glyphicon-camera" }))), React.createElement("li", null, React.createElement("a", { href: "" }, React.createElement("i", { className: "glyphicon glyphicon-map-marker" }))))))));
    }
});