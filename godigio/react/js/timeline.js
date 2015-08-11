/**
* React.js component
*/
"use strict";

var clouddb = "https://admin:8a7d03517aed@godigio.smileupps.com/";
var messagedb = new PouchDB(clouddb + "posts");

var Comments = React.createClass({
    displayName: "Comments",

    render: function render() {
        var createItem = function createItem(itemText, index) {
            return React.createElement(
                "li",
                { key: index + itemText },
                itemText
            );
        };
        return React.createElement(
            "ul",
            { className: "w3-ul" },
            this.props.comments.map(createItem)
        );
    }
});

var Post = React.createClass({
    displayName: "Post",

    getInitialState: function getInitialState() {
        var comments = this.props.post.comments ? this.props.post.comments : [];
        return {
            comments: comments,
            doc: this.props.post,
            commentcount: comments.length,
            imgdisplay: this.props.post.url == null ? "none" : "block"
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var comment = this.refs.comment.getDOMNode().value;
        if (comment != "") {
            var nextComments = this.state.comments.concat(comment);
            this.state.doc.comments = nextComments;
            this.setState({
                comments: nextComments,
                comment: '',
                commentcount: nextComments.length
            });
            messagedb.put(this.state.doc);
        }
    },
    deletePost: function deletePost(post) {
        messagedb.remove(post)["catch"](function (err) {
            console.log(err.name);
            console.log(JSON.stringify(post));
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "row", id: this.props.post.id, key: this.props.post.id },
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "col-md-2 col-sm-3 text-center" },
                React.createElement(
                    "a",
                    { className: "story-img", href: "#" },
                    React.createElement("img", { src: this.props.post.url, style: { "width": "100px", "height": "100px", "display": this.state.imgdisplay }, className: "img-circle" })
                )
            ),
            React.createElement(
                "div",
                { className: "col-md-10 col-sm-9" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-xs-9" },
                        React.createElement(
                            "p",
                            null,
                            this.props.post.text
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
                                    "2 Days Ago"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    React.createElement("i", { className: "glyphicon glyphicon-comment" }),
                                    " ",
                                    this.state.commentcount,
                                    " Comments"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    React.createElement("i", { className: "glyphicon glyphicon-share" }),
                                    " 34 Shares"
                                )
                            )
                        ),
                        React.createElement(
                            "form",
                            { onSubmit: this.handleSubmit },
                            React.createElement(
                                "div",
                                { className: "input-group" },
                                React.createElement(
                                    "div",
                                    { className: "input-group-btn" },
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-default" },
                                        "Like"
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-default" },
                                        React.createElement("i", { className: "glyphicon glyphicon-share" })
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-default", onClick: this.deletePost.bind(null, this.props.post) },
                                        React.createElement("i", { className: "glyphicon glyphicon-trash" })
                                    )
                                ),
                                React.createElement("input", { type: "text", className: "form-control", placeholder: "Add a comment..", ref: "comment" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "w3-container" },
                            React.createElement(Comments, { comments: this.state.comments })
                        )
                    ),
                    React.createElement("div", { className: "col-xs-3" })
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            ),
            React.createElement(
                "div",
                null,
                " ",
                React.createElement("hr", null)
            )
        );
    }
});

var Timeline = React.createClass({
    displayName: "Timeline",

    render: function render() {
        var postlist = this.props.posts.map(function (post) {
            return React.createElement(Post, { post: post });
        });
        return React.createElement(
            "div",
            { className: "postlist" },
            postlist
        );
    }
});