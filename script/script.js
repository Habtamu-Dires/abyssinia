
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
  let currentTab = 0; //current tap set to be the first tab
  showTab(currentTab);

function showTab(n) {
    //this function will display the specified tab of the form ...
    let x = document.getElementsByClassName("multi-form-tab");
    x[n].style.display = "block";
}
//function to mark progress bar 
//add active class to bar element
function setProgressBar(n, status){
   if(status) 
      $("#progressbar li").eq(n).addClass("active");
   else {
      $("#progressbar li").eq(n+1).removeClass("active");
   }
}

function nextPrev(n) {
    //This functin will figure out which tab to display
    let x = document.getElementsByClassName("multi-form-tab");

    //Hide the current tab
    x[currentTab].style.display = "none";
    //Increase or decrease the current tab by 1
    currentTab = currentTab + n;

    //otherwise, display the correct tab
    showTab(currentTab);
    //set progress bar
    if(n===1) 
      setProgressBar(currentTab, true);
    else 
      setProgressBar(currentTab, false);
}