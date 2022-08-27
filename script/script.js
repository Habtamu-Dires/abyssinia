
//scroll animation
$(document).ready(function() {
    new WOW().init();
  });


//carousel Animation
(function($) {
    //Function to animate slider captions
    function doAnimations(elems) {
      //Cache the animationend event in a variable
      let animEndEv = "webkitAnimationEnd animationend";
      elems.each(function() {
        let $this = $(this),
          $animationType = $this.data("animation");
        $this.addClass($animationType).one(animEndEv, function() {
            console.log("end here ...........")
          $this.removeClass($animationType);
        });
      });
    }
    //Variables on page load
    let $myCarousel = $('#mycarousel'),
      $firstAnimatingElems = $myCarousel
        .find(".carousel-item:first")
        .find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel();
    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);
    //Other slides to be animated on carousel slide event
    $myCarousel.on("slide.bs.carousel", function(e) {
      let $animatingElems = $(e.relatedTarget).find(
        "[data-animation ^= 'animated']"
      );
      doAnimations($animatingElems);
    });
  })(jQuery);


  //multi-step form code
  