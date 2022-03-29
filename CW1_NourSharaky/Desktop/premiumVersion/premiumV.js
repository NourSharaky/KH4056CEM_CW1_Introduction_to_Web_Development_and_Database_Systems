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

// variables to be used in the drag and drop functions
var isDragging = null;
var items = [];

// variables to be used in the To Do List function
// to get the add new to do list item button
let addToDo = document.querySelector('.addToDoBtn')
let toDos = []


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

// when the user clicks on the check icon in the new note window, 4 functions get called
checkIcon.addEventListener("click", function(){
  typeNoteWindow();
  createNote();
  dragging();
  rightClickMenu();
});

addToDo.addEventListener('click', function () {
  ToDoList();
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
// Text editing bar functions

function bold(){
  document.execCommand("bold", false, null);
};
function italic(){
  document.execCommand("italic", false, null);
};
function underline(){
  document.execCommand("underline", false, null);
};
function strikeThrough(){
  document.execCommand("strikeThrough", false, null);
};
function uList(){
  document.execCommand("insertUnorderedList", false, null);
};
function oList(){
  document.execCommand("insertOrderedList", false, null);
};
function indent(){
  document.execCommand("indent", false, null);
};
function justify(){
  document.execCommand("justifyCenter", false, null);
};
function justifyLeft(){
  document.execCommand("justifyLeft", false, null);
};
function justifyRight(){
  document.execCommand("justifyRight", false, null);
};
function copy(){
  document.execCommand("copy", false, null);
};
function cut(){
  document.execCommand("cut", false, null);
};
function paste(){
  document.execCommand("paste", false, null);
};
function undo(){
  document.execCommand("undo", false, null);
};
function redo(){
  document.execCommand("redo", false, null);
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


  // creates a div that stores each sticky note and makes the whole sticky note draggable
  var noteBox =  document.createElement("div");
  noteBox.className = "box";
  noteBox.setAttribute("draggable","true");


  // creates a div that stores sticky note content
  var note = document.createElement("div");
  note.className = "note";
  // calling some formatting functions
  note.style.margin = margin();
  note.style.transform = rotate();
  note.style.background = color();


  // creates a sub div of the note div to store the drag icon
  var drag = document.createElement("i");
  drag.className ="fa-solid fa-grip-lines";
  drag.setAttribute("id","drag-icon")


  // creates a sub div of the note div that stores each sticky text note content
  var text = document.createElement("div");
  text.className = "text";
  text.innerHTML = noteText;
  // text.setAttribute("contenteditable","true");


  // appending each child div to its parent div
  noteBox.appendChild(note);
  note.appendChild(drag);
  note.appendChild(text);
  // inserting each noteBox div before the end of the notesContainer (.addedNotes) div
  notesContainer.insertAdjacentElement("beforeend",noteBox);


  // when the user hovers over the note, it scales up
  note.addEventListener("mouseenter", function(){
    note.style.transform = "scale(1.1)";
  });
  // when the user's mouse exits the note, it scales back down and randomly rotates it
  note.addEventListener("mouseleave", function(){
    note.style.transform = "scale(1.0)" + rotate();
  });
  // note.addEventListener("dblclick", function(){
  //   note.remove();
  // });


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

// _____________________________________________________________________________

// right click menu to allow users to edit and delete sticky notes
function rightClickMenu(){
  // to get the right click menu div
  const menu = document.getElementById('menu');
  // to set the area in which this function works (each note)
  const scopes = document.querySelectorAll(".note");


  // loops over each note
  scopes.forEach((scope) => {
    // when the user right clicks in the note, this function works
    scope.addEventListener("contextmenu", (event) =>{
      event.preventDefault();

      // checks the mouse's current position where the user right clicked
      const { clientX: mouseX, clientY: mouseY } = event;

      // positions the menu at the bottom right of the mouse's position
      menu.style.top = `${mouseY}px`;
      menu.style.left = `${mouseX}px`;

      // makes the menu visible
      menu.classList.add("visible");


      // right click menu items functionality
      // stores the mouse's current position to find the element that the mouse is currently over
      var x = event.clientX, y = event.clientY;
      elementMouseIsOver = document.elementFromPoint(x, y);
      // console.log(elementMouseIsOver)


      // gets the edit list item
      var edit = document.getElementById('edit');
      // when the user clicks on edit, it allows the user to edit text on the selected note
      edit.addEventListener('click', function(){
        // checks if the note already contains text and allows user to edit it
        if (elementMouseIsOver.className == "text"){
          elementMouseIsOver.setAttribute("contenteditable","true");
          menu.classList.remove("visible");
        }
        // checks if the note was initially blank and allows user to add text and edit it
        else if (elementMouseIsOver.childNodes[0].className != "text"){
          elementMouseIsOver.insertAdjacentHTML("beforeend", '<div class="text" contenteditable="true"></div>');
          menu.classList.remove("visible");
        }
      });


      // gets the delete list item
      var rmv = document.getElementById('dlt');
      // when the user clicks on delete, it deletes the selected note
      rmv.addEventListener("click", function() {
        elementMouseIsOver.parentElement.remove();
        menu.classList.remove("visible");
      });

    });

    // when the user clicks anywhere on the page, the right click menu gets hidden
    document.addEventListener("click", (e) => {
      if (e.target.offsetParent != menu){
        menu.classList.remove("visible");
        };
      });

    });
};

// _____________________________________________________________________________
// Drag and Drop

function dragging(){
  // to get all noteBox divs
  items = document.querySelectorAll('.addedNotes .box');
  // loops over each noteBox and calls a drag and drop function according to event
  items.forEach(function(item){
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
};

function handleDragStart(e){
  isDragging = this;
  // on drag start, the innerHTML of the noteBox div is stored
  e.dataTransfer.setData('text/html', this.innerHTML);
};

function handleDragOver(e){
  // cancels the event if it is cancelable,the default action that belongs to the event will not occur
  if (e.preventDefault) e.preventDefault();
};

function handleDragEnter(e){
  // adds a class to the note underneath the dragging note to give it a border
  this.childNodes[0].classList.add('over');
};

function handleDragLeave(e){
  // removes the added class once the dragged item exits the note
  this.childNodes[0].classList.remove('over');
};

function handleDrop(e){
  // checks if note is dragged above itself
  if (isDragging != this){
    // switches the innerHTML of the notes that will be switched
    isDragging.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  };
};

function handleDragEnd(e){
  // checks that the "over" class was removed
  items.forEach(function(item) {
    item.childNodes[0].classList.remove('over');
  });

  //
  notes = document.querySelectorAll('.note');
  notes.forEach((note) => {
    // scales the dragged notes up and down on hovering
    note.addEventListener("mouseenter", function(){
      note.style.transform = "scale(1.1)";
    });
    note.addEventListener("mouseleave", function(){
      note.style.transform = "scale(1.0)" + rotate();
    });
    // note.addEventListener("dblclick", function(){
    //   note.remove();
    // });
  });
  rightClickMenu();
};

// _____________________________________________________________________________

function ToDoList(){
  // to get the text input that user adds to list
  let toDoInput = document.querySelector(".ToDoInput");
  // to get div where tasks are stored
  let tasksDiv = document.querySelector('.tasksDiv');

  // checks if user didn't enter any text
  if(toDoInput.value != ''){
    // stores new task to toDos list
    toDos.push(toDoInput.value);

    // creates a div to store new task content
    let newTodoList = document.createElement('div');
    newTodoList.className = 'item';

    // loops over toDos list
    for(let i = 0; i<toDos.length; i++){
      // appends note text to newTodoList div
      newTodoList.innerHTML = toDoInput.value;
      tasksDiv.appendChild(newTodoList);
    };

    // to create a delete icon for each task
    if(toDos.length > 0){
      // gets all task items
      let item = document.querySelectorAll('.item');

      // loops over task items
      for (let j = 0; j<item.length; j++){
        // creates a delete icon div inside each task
        let deleteTask = document.createElement('div');
        deleteTask.className = 'delete';
        deleteTask.innerHTML = "X";
        item[j].appendChild(deleteTask);

        // when the user clicks the X icon, the task is removed
        deleteTask.addEventListener('click', ()=> {
          tasksDiv.removeChild(item[j]);
        });
      };
    };
    // empties the new task input content after every new task addition
    toDoInput.value = '';
  }
}
