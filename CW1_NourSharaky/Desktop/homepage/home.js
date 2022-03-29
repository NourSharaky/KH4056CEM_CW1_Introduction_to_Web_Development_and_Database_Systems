
//______________________________________________________________________________
// Section 0 - Navigation bar

// to get nav bar div
let mainNav = document.getElementById("js-menu");
// to get the drop down menu icon
let navBarToggle = document.getElementById("js-navbar-toggle");

// show and hide nav bar when clicking the drop down menu icon
navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

//______________________________________________________________________________

// Section 4 - Reviews

let slideIndex = 0;

showSlides();

function showSlides() {

  let i;
  // to gets reviews
  let slides = document.getElementsByClassName("mySlides");
  // to get tabs dots
  let dots = document.getElementsByClassName("dot");

  // loop over review windows and display them in order
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // interplate the slide index
  slideIndex++;
  // to stay within range (length of reviews)
  if (slideIndex > slides.length) {slideIndex = 1};

  // loop over dots and give them styling accoring to order
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" action", "");
  }

  slides[slideIndex-1].style.display = "block";
  // remove class name from the dot after switching to next review
  dots[slideIndex-1].className += " action";

  // Change image every 3 seconds
  setTimeout(showSlides, 3000);
}
