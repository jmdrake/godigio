/**
* React.js component
*/

var Fanlist = React.createClass({    
    render: function() {        
        var fanlist = this.props.fans.map(function(fan){
            return (
                <Imageframe src={fan.imgsrc} desc={fan.firstname + " " + fan.lastname} key={fan.userid} link={"./fanhub.html?user=" + fan.userid}/>
            )
        });
        return (
            <div className = "fanlist row">
            {fanlist}
            </div>
        )
    }
})


