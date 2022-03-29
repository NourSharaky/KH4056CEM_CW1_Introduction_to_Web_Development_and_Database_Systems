// _____________________________________________________________________________
// Section 1 - Assigning Variables

// to get the dropDownIcon element used for the responsive drop down menu
var dropDownIcon = document.getElementsByClassName('dropDownIcon')[0];


// to get the add new note button
var addbtn = document.getElementById("addbtn");
// to get the check icon used to save the new note's content
var checkIcon = document.getElementById("check-icon");
// to get the x icon used to exit the new note window
var xIcon = document.getElementById("x-icon");


// to be used in the color() function
var i = 0;

// _____________________________________________________________________________
// Section 2 - Event Listeners to call functions when an event happens

// when the user clicks on the dropDownIcon, the Toggle() function gets called
dropDownIcon.addEventListener('click',function () {
  Toggle()
});

// when the user clicks on the add new note button, the typeNoteWindow() function gets called
addbtn.addEventListener("click", function(){
  typeNoteWindow();
});

// when the user clicks on the x icon in the new note window, the typeNoteWindow() function gets called
xIcon.addEventListener("click", function(){
  typeNoteWindow();
});

// when the user clicks on the check icon in the new note window, the createNote() function gets called
checkIcon.addEventListener("click", function(){
  typeNoteWindow();
  createNote();
});
// _____________________________________________________________________________
// Section 3 - Functions

// Responive Navigation Bar
function Toggle(){
  // to get navigation list items by their class name
  var lists = document.getElementsByClassName("get-li");

  // check if the list items are hidden
  if (lists[0].classList.contains("displayNone")) {
    // loop over list items
    for (i = 0; i < lists.length ; i++){
      // to display list items by replacing their classes
      lists[i].classList.replace("displayNone", "displayBlock")};
    }
  // check if the list items are visible
  else if (lists[0].classList.contains("displayBlock")) {
    // loop over list items and check their class names
    for (i = 0; i < lists.length ; i++){
      // to not display list items by replacing their classes
      lists[i].classList.replace("displayBlock", "displayNone") };
    };
};

// _____________________________________________________________________________

// Displays and hides the New Note Window
function typeNoteWindow(){
  // to get the New Note Window div
  var newNoteWindow = document.getElementsByClassName('newNoteWindow')[0];

  // checks if the New Note Window is hidden and then displays it
  if (newNoteWindow.style.display == "none") newNoteWindow.style.display = "block";
  // checks if the New Note Window is displayed and then hides it
  else newNoteWindow.style.display = "none";
};

// Creates new notes
function createNote(){
  // to get the Added Notes div in which new notes are stored
  var notesContainer = document.getElementsByClassName('addedNotes')[0];
  // to get the text content that was written in the New Note Window
  var noteText = document.getElementById("note-text").value;


  // creates a div that stores sticky note content
  var note = document.createElement("div");
  note.className = "note";
  // calling some formatting functions
  note.style.margin = margin();
  note.style.transform = rotate();
  note.style.background = color();


  // creates a sub div of the note div that stores each sticky text note content
  var text = document.createElement("div");
  text.className = "text";
  text.innerHTML = noteText;


  // appending text into note div
  note.appendChild(text);
  // inserting each note div before the end of the notesContainer (.addedNotes) div
  notesContainer.insertAdjacentElement("beforeend",note);


  // when the user hovers over the note, it scales up
  note.addEventListener("mouseenter", function(){
    note.style.transform = "scale(1.1)";
  });
  // when the user's mouse exits the note, it scales back down and randomly rotates it
  note.addEventListener("mouseleave", function(){
    note.style.transform = "scale(1.0)" + rotate();
  });
  note.addEventListener("dblclick", function(){
    note.remove();
  });


  // empties the New Note Window's content after every new note addition
  document.getElementById("note-text").value = "";

};

// _____________________________________________________________________________

// the formatting functions
// returns a random margin value for the notes
function margin(){
  var randomMargin = ["-5px","5px","-10px","10px","15px","-15px"];
  return randomMargin[Math.floor(Math.random()*randomMargin.length)];
};
// returns a random angle rotation value for the notes
function rotate(){
  var randomRotate = ["rotate(3deg)","rotate(-3deg)","rotate(5deg)","rotate(-5deg)","rotate(1deg)","rotate(-1deg)",];
  return randomRotate[Math.floor(Math.random()*randomRotate.length)];
};
// returns a random color for the notes
function color(){

  var randomColor = ["#FFADAD","#FFD6A5","#FDFFB6","#CAFFBF","#9BF6FF","#A0C4FF","#BDB2FF","#FFC6FF","#fff","#9ADCFF","#FFF89A","#FFB2A6","#FF8AAE","#fff"];
  if (i> randomColor.length -1){
    i = 0;
  };
  return randomColor[i++];
};
