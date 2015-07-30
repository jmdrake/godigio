/**
* Created with godigiolive.
* User: jmdrake
* Date: 2015-07-16
* Time: 11:29 AM
* To change this template use Tools | Templates.
*/
var clouddb = "https://visionpartners.cloudant.com/";
var artistdb = new PouchDB(clouddb + "godigioartists");
var artistList = document.getElementById("sampleartists");


function showArtists() {
    artistList.innerHTML = "";
    artistdb.allDocs({include_docs: true, attachements: true, descending: true}, function(err, doc) {
        doc.rows.forEach(function(row){            
            artistdb.getAttachment(row.id, row.doc.coverart).then(function(blob){
                var div = document.createElement("div");
                div.className = "col-xs-6 col-md-3";
                
                var a = document.createElement("a");
                a.className = "thumbnail nailthumb-container square-thumb";
                
                var img = document.createElement("img");
                img.src = blobUtil.createObjectURL(blob);
                img.style.position = "relative"; 
                img.style.width = "212.44019138756px"; 
                img.style.height = "148px"; 
                img.style.top = "0px"; 
                img.style.left = "-42.7200956937799px";
                img.className = "nailthumb-image";
                
                var h5 = document.createElement("h5");
                h5.innerHTML = row.doc.name;
                
                a.appendChild(img);
                div.appendChild(a);
                div.appendChild(h5);
                artistList.appendChild(div);
            })
        })
    });        
}

var Image = React.createClass({
    render: function() {
        imgsrc = this.props.imgsrc;
        imgname = this.props.imgname;
        return(
            <div class="col-xs-6 col-md-3">
                <a href="" className="thumbnail nailthumb-container square-thumb">
                    <img src={imgsrc} style="position: relative; width: 212.44019138756px; height: 148px; top: 0px; left: -42.7200956937799px;" class="nailthumb-image">
                    </img>                                                                        
                </a>
                <h5>{imgname}</h5>
            </div>
        )
    }
})

var Gallery = React.createClass({
  render: function() {
    var images = this.props.data.map(function (imagedata) {
      // console.log(imagedata.doc.coverart);
      // console.log(JSON.stringify(imagedata.doc._attachments[imagedata.doc.coverart]));
      artistdb.getAttachment(imagedata.id, imagedata.doc.coverart).then(function(blob){
          src = blobUtil.createObjectURL(blob);
          console.log(src);
          React.render
        });                                                                        
      });      
    return (        
        <div className="row">
            {images}
        </div>
    )
  }
});

showArtists();

