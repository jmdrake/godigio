/**
* React.js component
*/
var Imageframe = React.createClass({
    render: function() {
        return(
            <div className="img col-xs-6 col-md-3">
              <a target="_self" href={this.props.link}>
                <img src={this.props.src} alt={this.props.desc} width="110" height="90"/>
              </a>
              <div className="desc">{this.props.desc}</div>
            </div>
        )
    }
})