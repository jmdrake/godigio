/**
* React.js component
*/
"use strict";

var messagedb = new PouchDB("messages");

var PostList = React.createClass({
    displayName: "PostList",

    render: function render() {
        var deletePost = function deletePost(post) {
            // e.preventDefault();
            console.log("Deleting --> " + JSON.stringify(post));
            messagedb.remove(post.doc);
        };
        var createPost = function createPost(post, index) {
            return React.createElement(
                "div",
                { className: "row", id: post.id, key: post.id },
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "col-md-2 col-sm-3 text-center" },
                    React.createElement(
                        "a",
                        { className: "story-img", href: "http://testing.theoutershell.com/dashboard.html#" },
                        React.createElement("img", { src: "./fanhub_cameron_files/100", style: { "width": "100px", "height": "100px" }, className: "img-circle" })
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
                                post.doc.text
                            ),
                            React.createElement(
                                "ul",
                                { className: "list-inline" },
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "http://testing.theoutershell.com/dashboard.html#" },
                                        "2 Days Ago"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "http://testing.theoutershell.com/dashboard.html#" },
                                        React.createElement("i", { className: "glyphicon glyphicon-comment" }),
                                        " 4 Comments"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "http://testing.theoutershell.com/dashboard.html#" },
                                        React.createElement("i", { className: "glyphicon glyphicon-share" }),
                                        " 34 Shares"
                                    )
                                )
                            ),
                            React.createElement(
                                "form",
                                { onSubmit: handleSubmit },
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
                                            { className: "btn btn-default", onClick: deletePost.bind(null, post) },
                                            React.createElement("i", { className: "glyphicon glyphicon-trash" })
                                        )
                                    ),
                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "Add a comment..", onChange: onChange, value: this.state.text })
                                )
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
        };
        return React.createElement(
            "div",
            { className: "panel-body" },
            this.props.items.map(createPost)
        );
    }
});

var Timeline = React.createClass({
    displayName: "Timeline",

    getInitialState: function getInitialState() {
        return { items: postlist };
    },
    render: function render() {
        console.log("Rendering timeline");
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "a",
                    { href: "http://testing.theoutershell.com/dashboard.html#", className: "pull-right" },
                    "View all"
                ),
                React.createElement(
                    "h4",
                    null,
                    "Timeline"
                )
            ),
            React.createElement(PostList, { items: this.state.items })
        );
    }
});

var postlist = [];

function showMessages() {
    console.log("Updating messages");
    messagedb.allDocs({ include_docs: true, descending: true }, function (err, doc) {
        postlist = doc.rows;
        document.getElementById("timeline").innerHTML = "";
        React.render(React.createElement(Timeline, null), document.getElementById("timeline"));
    });
}

messagedb.changes({
    since: 'now',
    live: true
}).on('change', showMessages);

showMessages();