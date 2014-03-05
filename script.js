$(document).ready(function() {

  $(".search-btn").click(function() {
    event.preventDefault();

    var candiate = $("#name").val();

    var link = "http://osrc.dfm.io/" + candiate + ".json";

    var github = $.ajax({
      type: "GET",
      dataType: 'jsonp',
      url: link,
      cache: false
    })
      .done(function() {
        console.log("success");
        
        $(".search").fadeOut(300);

        $(".logo").css({'transform': 'scale(0.5)'}).animate({ "left": "150px", "top": "-45px"}, 300);

        $(".result").fadeIn(1000).animate({ "top": "18em"}, 1800).append(
          "<div class=\"fullname\"> <span>1</span>" + github.responseJSON.name + "</div><div class=\"bio\"><h1>" + github.responseJSON.name + "</h1><h2>Junior Interface Developer</h2><h2>Toronto, ON</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div><div class=\"profile-pic\"><div class=\"pic-out\"><div class=\"pic-border\"><img src=\"http://2.gravatar.com/avatar/" + github.responseJSON.gravatar + "\"></div></div></div></div>" 
        );
    })
      .fail(function(){
        alert("fail");
    });
  });

});