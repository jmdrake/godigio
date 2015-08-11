/**
* React.js component
*/

var Image = React.createClass({
    getInitialState : function() {
        return {imgsrc : "../images/100x100.jpg", name : ""}
    },
    render : function() {
        var self = this;
        profiledb.get(key).then(function(userdoc){
            set.setState({name : userdoc.firstname + " " + userdoc.lastname})
        });
        getAttachment(profiledb, this.props.key, "profilepic").then(function(attachment){
            if(attachment != null)
                self.setState({imgsrc : attachment});
        });
        return (
            <div className="img col-xs-6 col-md-3">
              <a target="_self" href={this.props.link}>
                <img src={self.state.imgsrc} alt={this.state.name} key={this.props.key} width="110" height="90"/>
              </a>
              <div className="desc">{this.state.name}</div>
            </div>            
        )
    }
})

var Fanlist = React.createClass({    
    render: function() {        
        var fanlist = this.props.fans.map(function(fan){
            return (
                <Image key={fan.id.split("+")[this.props.keyindex]}/>
            )
        });
        return (
            <div className = "fanlist row">
            {fanlist}
            </div>
        )
    }
})


