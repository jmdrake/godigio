/**
* React.js component
*/
var FansPanel = React.createClass({
    getInitialState : function (){
        return {fanslist : JSON.parse(localStorage.getItem("godigio.fans"))}
    },
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>Fans of {this.props.name}</h4>
                </div>
                <Fanlist fans={this.state.fanslist} keyindex={0}/>
            </div>
        )
    }
})
