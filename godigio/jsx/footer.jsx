/**
* React.js component
*/
var Footer = React.createClass({
    render: function() {
        return(
            <div>
                <div className="col-md-4">
                    <h4><a href="#">About Godigio</a></h4>
                </div>
                <div className="col-md-4">
                    <h4><a href="#">Services</a></h4>
                </div>            
                <div className="col-md-4">
                    <h4><a href="/godigio/store">Store</a></h4>
                </div>
            </div>
        )
    }
})

React.render(
    <Footer/>,
    document.getElementById("footer")
)
            