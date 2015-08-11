/**
* React.js component
*/
var FanOfPanel = React.createClass({
    getInitialState : function (){
        return {fanoflist : JSON.parse(localStorage.getItem("godigio.fanof"))}
    },
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>Fans of {this.props.name}</h4>
                </div>
                <Fanlist fans={this.state.fanoflist} keyindex={1}/>
            </div>
        )
    }
})
