/**
* React.js component
*/
var Logo = React.createClass({
    render: function() {        
        return(
            <div className="row">
                <a href="/godigio/" className="navbar-brand"> 
                    <img src="../images/godigiologo.png" width="100" height="30" alt=""/>
                </a>
            </div>        
        )
    }
})

React.render(
    <Logo/>,
    document.getElementById("logo")
)