/**
* React.js component
*/
var PhotoPanel = React.createClass({
    render: function() {
        property = this.props.property;
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><a href="http://testing.theoutershell.com/dashboard.html#" className="pull-right">View all</a><h4>John Doe's Photos</h4></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 col-xs-6"><a title="Image 1" href="http://testing.theoutershell.com/dashboard.html#"><img className="thumbnail img-responsive" src="./fanhub_cameron_files/650x450"></img></a></div>
                        <div className="col-lg-3 col-sm-4 col-xs-6"><a title="Image 2" href="http://testing.theoutershell.com/dashboard.html#"><img className="thumbnail img-responsive" src="./fanhub_cameron_files/2255EE"></img></a></div>
                        <div className="col-lg-3 col-sm-4 col-xs-6"><a title="Image 3" href="http://testing.theoutershell.com/dashboard.html#"><img className="thumbnail img-responsive" src="./fanhub_cameron_files/FFF"></img></a></div>
                        <div className="col-lg-3 col-sm-4 col-xs-6"><a title="Image 4" href="http://testing.theoutershell.com/dashboard.html#"><img className="thumbnail img-responsive" src="./fanhub_cameron_files/992233"></img></a></div>
                    </div>
                </div>
            </div>
        )
    }
})

React.render(
    <PhotoPanel/>,
    document.getElementById("photopanel")
)