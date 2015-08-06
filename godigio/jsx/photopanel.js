/**
* React.js component
*/
"use strict";

var PhotoPanel = React.createClass({
    displayName: "PhotoPanel",

    render: function render() {
        property = this.props.property;
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
                    "John Doe's Photos"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { title: "Image 1", href: "http://testing.theoutershell.com/dashboard.html#" },
                            React.createElement("img", { className: "thumbnail img-responsive", src: "./fanhub_cameron_files/650x450" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { title: "Image 2", href: "http://testing.theoutershell.com/dashboard.html#" },
                            React.createElement("img", { className: "thumbnail img-responsive", src: "./fanhub_cameron_files/2255EE" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { title: "Image 3", href: "http://testing.theoutershell.com/dashboard.html#" },
                            React.createElement("img", { className: "thumbnail img-responsive", src: "./fanhub_cameron_files/FFF" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-lg-3 col-sm-4 col-xs-6" },
                        React.createElement(
                            "a",
                            { title: "Image 4", href: "http://testing.theoutershell.com/dashboard.html#" },
                            React.createElement("img", { className: "thumbnail img-responsive", src: "./fanhub_cameron_files/992233" })
                        )
                    )
                )
            )
        );
    }
});

React.render(React.createElement(PhotoPanel, null), document.getElementById("photopanel"));
