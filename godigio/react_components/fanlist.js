/**
* React.js component
*/

var Fanlist = React.createClass({    
    render: function() {
        console.log("Fubar");
        var fanlist = this.props.fans.map(function(fan){
            console.log("Trace 2");
            console.log(fan);
            return (
                <Imageframe src={fan.imgsrc} desc={fan.firstname + " " + fan.lastname} link={"./fanhub.html?user=" + fan.userid}/>
            )
        });
        return (
            <div className = "fanlist row">
            {fanlist}
            </div>
        )
    }
})


