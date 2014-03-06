$(document).ready(function() {

  var reset = function(){
    $(".clicked").click(function() {
      console.log("reset");
      $(".clicked").css({'transform': 'scale(1)'}).animate({ "left": "50%", "top": "45px"}, 300).removeClass("clicked");
      $(".result").html("").fadeOut();
      $(".network").html("").animate({"top":"100em"});
      $("#name").val("");
      $(".search").fadeIn(900);
    });
  };

  var network = function(){
    $(".network").animate({ "top": "60em"}, 1800).append(
      "<img src=\"pinterest.png\"><img src=\"youtube.png\"><img src=\"facebook.png\"><img src=\"twitter.png\">" 
    );
  };

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

        $(".logo").css({'transform': 'scale(0.5)'}).animate({ "left": "150px", "top": "-45px"}, 300).addClass("clicked");

        $(".result").fadeIn(1000).animate({ "top": "18em"}, 1800).append(
          "<div class=\"fullname\"> <span>1</span>" + github.responseJSON.name + "</div><div class=\"info\"><div class=\"profile-pic\"><div class=\"pic-out\"><div class=\"pic-border\"><img src=\"http://2.gravatar.com/avatar/" + github.responseJSON.gravatar + "\"></div></div></div><div class=\"bio\"><h1>" + github.responseJSON.name + "</h1><h2>Junior Interface Developer</h2><h2>Toronto, ON</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div></div></div><div class=\"chart\"><h1> GitHub Found. Top Languages Are: </h1><canvas id=\"gh-chart\" width=\"300\" height=\"300\"></canvas><div class=\"legend\"><p class=\"one\"> 1. " + github.responseJSON.usage.languages[0].language + "</p><p class=\"two\"> 2.  " + github.responseJSON.usage.languages[1].language + "</p><p class=\"three\"> 3.  " + github.responseJSON.usage.languages[2].language + "</p><p class=\"four\"> 4.  " + github.responseJSON.usage.languages[3].language + "</p></div></div>" 
        );

        var ctx = document.getElementById("gh-chart").getContext("2d");
        var data = [
                {
                  value: github.responseJSON.usage.languages[0].count,
                  color:"#F7464A"
                },
                {
                  value : github.responseJSON.usage.languages[1].count,
                  color : "#E2EAE9"
                },
                {
                  value : github.responseJSON.usage.languages[2].count,
                  color : "#D4CCC5"
                },
                {
                  value : github.responseJSON.usage.languages[3].count,
                  color : "#949FB1"
                }
              ];

        new Chart(ctx).Doughnut(data, {segmentShowStroke : false});

        network();

        reset();
    })
      .fail(function(){
        console.log("AJAX fail");
    });
  });
});

