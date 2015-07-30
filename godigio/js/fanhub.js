$(document).ready(function(){/* off-canvas sidebar toggle */

$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});
});

/* copy loaded thumbnails into carousel */
$('.row .thumbnail').on('load', function() {
  
}).each(function(i) {
  if(this.complete) {
  	var item = $('<div class="item"></div>');
    var itemDiv = $(this).parents('div');
    var title = $(this).parent('a').attr("title");
    
    item.attr("title",title);
  	$(itemDiv.html()).appendTo(item);
  	item.appendTo('.carousel-inner'); 
    if (i==0){ // set first item active
     item.addClass('active');
    }
  }
});

/* activate the carousel */
$('#modalCarousel').carousel({interval:false});

/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {
  $('.modal-title').html($(this).find('.active').attr("title"));
});

/* when clicking a thumbnail */
$('.row .thumbnail').click(function(){
    var idx = $(this).parents('div').index();
  	var id = parseInt(idx);
  	$('#myModal').modal('show'); // show the modal
    $('#modalCarousel').carousel(id); // slide carousel to selected
  	
});

function deletepost(e, id){
    e.parent().parent().parent().parent().parent().parent().parent().hide('slow');
    ajax('/godigio_redesign/fanhub/del_post/' + id, [], ':eval');
}

transforms = {
    post : [
      {"tag":"div","class":"col-md-10 col-sm-9","children":[
          {"tag":"div","class":"row","children":[
              {"tag":"div","class":"col-xs-9","children":[
                  {"tag":"p","html":"${text}"},
                  {"tag":"ul","class":"list-inline","children":[
                      {"tag":"li","children":[
                          {"tag":"a","href":"#","html":"2 Days Ago"}
                        ]},
                      {"tag":"li","children":[
                          {"tag":"a","href":"#","children":[
                              {"tag":"i","class":"glyphicon glyphicon-comment","html":""}
                            ]}
                        ]},
                      {"tag":"li","children":[
                          {"tag":"a","href":"#","children":[
                              {"tag":"i","class":"glyphicon glyphicon-share","html":""}
                            ]}
                        ]}
                    ]},
                  [
                    {"tag":"button","class":"btn btn-default","html":"Like"},
                    {"tag":"button","class":"btn btn-default","children":[
                        {"tag":"i","class":"glyphicon glyphicon-share","html":""}
                      ]},
                    {"tag":"input","type":"text","class":"form-control","placeholder":"Add a comment..","html":""}
                  ]
                ]},
              {"tag":"div","class":"col-xs-3","html":""}
            ]},
          {"tag":"br","html":""},
          {"tag":"br","html":""}
        ]},
      {"tag":"hr","html":""}
    ]
};
