"use strict"
//feature_list_note


/* create content for the site using JS*/

	
let newEmptyListButton = document.createElement("button"); //button is created to initialize new list
newEmptyListButton.setAttribute("id", "newEmptyListButton");
newEmptyListButton.textContent = "New empty list";
document.getElementById("container").appendChild(newEmptyListButton);

function showNewList () {						//function displays list
	listTitle.style.display = "block"; 
	listHeading.style.display = "block";
}

function hideNewEmptyListButton () {
	newEmptyListButton.style.display = "none"; //function hides newEmptyListButton
}

newEmptyListButton.addEventListener("click", () => { 
	showNewList();
    hideNewEmptyListButton();
    showSaveButton(saveBtn);
});

/* create content to for the site using JS*/

let listTitle = document.createElement("h3"); //sub-heading//
listTitle.setAttribute("id", "listTitle");
listTitle.innerText = "Add your Title:";
document.getElementById("container").appendChild(listTitle);
listTitle.style.display = "none"; // display = 'block' from eventlistener (DAN)

let inputTitleBox = document.createElement("input"); //input field for user title//
inputTitleBox.setAttribute("id", "inputTitleBox");
inputTitleBox.setAttribute("type", "text");
inputTitleBox.setAttribute("placeholder", "Title");
document.getElementById("listTitle").appendChild(inputTitleBox);

let listHeading = document.createElement("h3"); //subheading//
listHeading.setAttribute("id", "listHeading");
listHeading.innerText = "Add your entry:";
document.getElementById("container").appendChild(listHeading);
listHeading.style.display = "none"; //display = 'block' from eventlistener (DAN)

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");     
inputItemBox.setAttribute("type", "text");
inputItemBox.setAttribute("placeholder", "List Entry");
inputItemBox.attributes.required = "required"; //!oklart om denna gör något!//
document.getElementById("listHeading").appendChild(inputItemBox);

let listNote = document.createElement("ul"); //unordered list
listNote.setAttribute("class", "myList"); //om id, numereriskt som ökar för varje lista?
document.getElementById("secondContainer").appendChild(listNote);

let saveBtn = document.createElement("button");
saveBtn.setAttribute("id", "listSaveBtn");
saveBtn.style.display ="none";
saveBtn.innerText = "Save";
document.getElementById("secondContainer").appendChild(saveBtn);

//function to add title to variable. Triggered when enter is released. 
inputTitleBox.addEventListener("keyup", function (e) {
    let inputTitle = document.getElementById("inputTitleBox").value;
    if(e.which === 13 || e.key === 13){  //firefox .which, chrome .key//
        if(inputTitle.length == 0){
            alert("Wow, so much empty")
        }
        //console.log(inputTitle);//
    }
    return inputTitle;
});

//Event for user to add list items//
inputItemBox.addEventListener("keyup", function(e) { 
    let listItem ="";

    if(e.which === 13 || e.key === 13){   //firefox .which, chrome .key//
        if(inputItemBox.value.length == 0){  //checks if input is empty
            alert("Wow, so much empty")
        }
        else {
            listItem = document.createElement("li"); 
            listItem.setAttribute("class", "myListItem");
            listItem.innerText = document.getElementById("inputListBox").value;
            document.getElementsByClassName("myList")[0].appendChild(listItem);

            clearInput(inputItemBox);    
            showSaveButton(saveBtn); //skicka med vilken button dete gäller till Ziggis function
        }    
    }    
});

//function to clear input field//
function clearInput(input){
    input.value = "";
}


/*
//Add todays date to list note//
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

//constructor for note-object in list form//
function ListNote(inputtitle, inputlistItem, date){
    listTitle = inputtitle;
    listItem = inputlistItem;
    listDate = date;
};*/

//feature_list_saveButton

//Ziggi ************************************************************************//

// när knappen trycks 
// skapas en ny anteckning 
// och det öppnas en textruta 
// att skriva anteckningen i. 


let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
saveButton.textContent = "Save"; // ger den texten Save

const container = document.getElementById("container"); // sparar container i en variabel
container.appendChild(emptyNoteButton); // Lägger till new empty note-knappen i container-div:en
container.appendChild(saveButton); // Lägger till save-knappen i container-div:en

/**
 * Skapar en ny text area och lägger till den i container-div:en
 */
function openTextArea() {
    let newTextArea = document.createElement("textarea");
    container.appendChild(newTextArea);
}

/**
 * Döljer Empty Note-knappen
 */
function hideNewEmptyNoteButton() {
    emptyNoteButton.style.display = "none";
}

/**
 * Visar Save-knappen
 */

function showSaveButton(button) {
    button.style.display = "block";
}

emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    hideNewEmptyNoteButton();  // dessa tre funktioner körs vid klick: dölj new note-knappen, öppna textarea, visa save-knappen
    openTextArea(); 

//feature_list_saveButton
    showSaveButton(saveButton); 
});



