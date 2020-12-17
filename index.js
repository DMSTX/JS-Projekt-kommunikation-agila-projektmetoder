"use strict"

let noteArray = []; // skapar en array
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " | " + ('0'+today.getHours()).substr(-2) + ":" + ('0' + today.getMinutes()).slice(-2);
('0' + today.getMinutes()).slice(-2);
let userList = ["Ziggi", "Dan", "Ludvig", "Sandra"];
let currentUser = ""; // needs user name from a login-input field. add document.getElement....

// ALLA VARIABLER ***************************************************************************************************************
function init() {
    console.log("init körs");
// KONSTANTER
const body = document.querySelector("body");
const container = document.getElementById("container"); // sparar container i en variabel
const modalBg = document.createElement("div"); // modalens transperenta bakgrund
modalBg.setAttribute("id", "modalBgBox");
modalBg.style.display = "none";
const innerModal = document.createElement("div");// inre divbox i modalen
innerModal.setAttribute("id", "popUp");

// ÖPPNA NY ANTECKNING-BUTTONS
let openNewListNoteBtn = document.createElement("button"); //button is created to initialize new list
openNewListNoteBtn.setAttribute("id", "newEmptyListButton");
openNewListNoteBtn.setAttribute("class", "pageButtons");
openNewListNoteBtn.textContent = "New empty list";

let openNewTextNoteBtn = document.createElement("button"); // skapar ett nytt button-element
openNewTextNoteBtn.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
openNewTextNoteBtn.setAttribute("class", "pageButtons");
openNewTextNoteBtn.textContent = "New empty note"; // sätter knappens text till New empty note

let openNewTemplateNoteBtn = document.createElement("button");
openNewTemplateNoteBtn.setAttribute("id", "textTemplateButton"); // ger det nya button-elementet id
openNewTemplateNoteBtn.setAttribute("class", "pageButtons");
openNewTemplateNoteBtn.textContent = "New note with text Template"; // sätter knappens text

//LOGIN-BUTTON
let loginButton = document.createElement("button");
loginButton.setAttribute("id", "loginButton");
loginButton.setAttribute("class", "pageButtons");
loginButton.textContent = "Login";

//FÄLT TILL USER LOGIN
let labelUser = document.createElement("label");
labelUser.setAttribute("for", "inputUser");
labelUser.textContent = "";

let userInput = document.createElement("input");
userInput.setAttribute("id", "userInput");
userInput.setAttribute("type", "text");
userInput.setAttribute("placeholder", "Input username");
userInput.required = true;

// SKAPA NOTE-OBJEKT OCH SPARA DET-BUTTONS
const saveNewTextNoteBtn = document.createElement("button");
saveNewTextNoteBtn.setAttribute("id", "textNoteButton");
saveNewTextNoteBtn.setAttribute("class", "modalButtons");
saveNewTextNoteBtn.style.display = "none"; // NONE
saveNewTextNoteBtn.textContent = "Save";

const saveNewTemplateNoteBtn = document.createElement("button");
saveNewTemplateNoteBtn.setAttribute("id", "templateNoteButton");
saveNewTemplateNoteBtn.setAttribute("class", "modalButtons");
saveNewTemplateNoteBtn.style.display = "none"; // NONE
saveNewTemplateNoteBtn.textContent = "Save";

const saveNewListNoteBtn = document.createElement("button");
saveNewListNoteBtn.setAttribute("id", "listNoteButton");
saveNewListNoteBtn.setAttribute("class", "modalButtons");
saveNewListNoteBtn.style.display = "none"; // NONE
saveNewListNoteBtn.textContent = "Save";

// SPARA REDIGERAD ANTECKNING-BUTTONS
const saveEditedTextBtn = document.createElement("button");
saveEditedTextBtn.setAttribute("id", "saveEditedTextButton");
saveEditedTextBtn.setAttribute("class", "modalButtons");
saveEditedTextBtn.style.display = "none"; // NONE
saveEditedTextBtn.textContent = "Save";

const saveEditedTemplateBtn = document.createElement("button");
saveEditedTemplateBtn.setAttribute("id", "saveEditedTemplateButton");
saveEditedTemplateBtn.setAttribute("class", "modalButtons");
saveEditedTemplateBtn.style.display = "none"; // NONE
saveEditedTemplateBtn.textContent = "Save";

const saveEditedListBtn = document.createElement("button");
saveEditedListBtn.setAttribute("id", "saveEditedListButton");
saveEditedListBtn.setAttribute("class", "modalButtons");
saveEditedListBtn.style.display = "none"; // NONE
saveEditedListBtn.textContent = "Save";

//CLEAR-BUTTON
let resetNoteButton = document.createElement("button");
resetNoteButton.setAttribute("id", "clearList");
resetNoteButton.setAttribute("class", "modalButtons");
resetNoteButton.style.display = "none"; // NONE
resetNoteButton.textContent = "Start Over";

// FÄLT TILL ANTECKNINGAR
let labelTitle = document.createElement("label");
labelTitle.setAttribute("for", "inputTitleBox");
labelTitle.textContent = "TITLE ";

let inputTitleBox = document.createElement("input"); //input field for user title//
inputTitleBox.setAttribute("id", "inputTitleBox");
inputTitleBox.setAttribute("type", "text");

let userTitle = document.createElement("h4");
userTitle.setAttribute("class", "userTitle");
userTitle.style.display = "none"; // NONE

let labelListItem = document.createElement("label");
labelListItem.setAttribute("for", "inputListBox");
labelListItem.textContent = "TO-DO ";

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");
inputItemBox.setAttribute("type", "text");
inputItemBox.attributes.required = true;

let listNote = document.createElement("ul"); //unordered list
listNote.setAttribute("class", "myList");

let inputTitle = document.createElement("h4");
inputTitle.setAttribute("class", "userTitle");
inputTitle.setAttribute("id", "myTitle");
inputTitle.style.display = "none";  // NONE

//TEXT AREA TILL TEXT O TEMPLATE
let textArea = document.createElement("textarea");
textArea.style.display = "none"; // NONE

//SPARADE NOTES 
const savedNotesDiv = document.createElement("div");
savedNotesDiv.setAttribute("id", "myNotes");

let savedNotesMessage = document.createElement("h3");
savedNotesMessage.textContent = "When you save a note it will show up here!";

// VARIABLER FÖR ATT REDIGERA NOTES
let pArray = [];
let savedNotes = [];
let counter = 0;
let noteObject; // borde byta namn, används i OpenSavedNote, och vidare i spara redigareade notes

let listItem;

// ALLA FUNKTIONER ************************************************************************************************************

/**
 * Konstruktor för Note-objekt
 * @param {string med list, text eller template} type 
 */
function Note(type, title, user) { // skicka in content, user, title som parametrar!
    this.date = date;
    this.type = type;
    this.user = user;
    this.title = title;
    this.content = undefined;

    this.addContent = function () {
        if (this.type === "list") {
            let arrayOfListItems = listNote.childNodes;
            this.content = [];

            for (let i = 0; i < arrayOfListItems.length; i++) {
                this.content.push(arrayOfListItems[i].textContent);
            }
        }
        else if (this.type === "text") {
            this.content = document.querySelector(".text").value;
        }
        else {
            this.content = document.querySelector(".template").value;
        }
    };
}


function newTextNote() {
    noteArray.push(new Note("text", userTitle.textContent, currentUser));

    let newNote = noteArray.pop();
    newNote.addContent();
    noteArray.push(newNote);
}

function newTemplateNote() {
    noteArray.push(new Note("template", userTitle.textContent, currentUser));

    let newNote = noteArray.pop();
    newNote.addContent();
    noteArray.push(newNote);
}

function newListNote() {
    noteArray.push(new Note("list", userTitle.textContent, currentUser));

    let newNote = noteArray.pop();
    newNote.addContent();
    noteArray.push(newNote);
}

/**
* Tar bort innehållet i ett fält 
*/
function clearField(field) {
    field.value = "";
}

function clearTitle(element) {
    element.textContent = "";
}

/**
 * Döljer ett objekt genom att sätta display till none
 * @param {valfritt objekt} object 
 */
function hideObject(object) {
    object.style.display = "none";
}

/**
 * Visar ett objekt genom att sätta display till block
 * @param {valfritt objekt} object 
 */
function showObject(object) {
    object.style.display = "block";
}

/**
 * Stänger modal och rensar fälten
 * @param {eventet} e 
 */
function closeModal(e) {
    if (e.target == modalBg) { //om target inte är modal, stäng modal (DAN) 
        hideObject(modalBg);
        resetNote()
    }
}

function validateUser() {
    let userInput = document.getElementById("userInput").value;

    for (let i = 0; i < userList.length; i++) {
        if (userInput === userList[i]) {
            return true;
        }
    };
    return false;
}

/**
 * Slumpar fram ett av 10 textförslag
 * Returnerar en string med ett textförslag
 */
function randomTextTemplate() {
    let number = Math.round((Math.random() * 10) + 1);
    let text;
    switch (number) {
        case 1:
            text = "What did you hate most about 2020?";
            break;
        case 2:
            text = "Where do you want to travel when Corona restrictions end?";
            break;
        case 3:
            text = "What people have you missed during this year, and how do you plan to connect more with them in the future?";
            break;
        case 4:
            text = "What have you learned about yourself during 2020?";
            break;
        case 5:
            text = "Shows, music, artists you have discovered during 2020?";
            break;
        case 6:
            text = "How has your life changed during 2020?";
            break;
        case 7:
            text = "How have you taken care of yourself and others this year?";
            break;
        case 8:
            text = "What has made you angry during 2020?";
            break;
        case 9:
            text = "What do you dream about for 2021?";
            break;
        case 10:
            text = "Who have you turned to this year? Why?";
            break;
        default:
            text = "default";
    }

    return text;
}

/**
 * Sparar noteArray till localStorage
 */
function saveToStorage() {
    let noteBook = JSON.stringify(noteArray);
    localStorage.setItem("Notes", noteBook);
}

/**
 * Nollställer fälten i modalen
 */
function resetNote() {
    while (listNote.firstChild) {
        listNote.removeChild(listNote.firstChild);
    }

    if (textArea.classList.contains("template")) {
        userTitle.textContent = randomTextTemplate();
    }
    clearTitle(userTitle);
    textArea.value = "";
}

/**
 * Öppnar modal och sätter pekaren i titelfältet
 */
function initModal() {
    showObject(modalBg);
    showObject(innerModal);;
    showObject(resetNoteButton);
    inputTitleBox.focus();
}

/**
 * Döljer knappar och fält
 */
function hideModalObjects() {
    //Spara ny-knapparna
    hideObject(saveNewListNoteBtn);
    hideObject(saveNewTemplateNoteBtn);
    hideObject(saveNewTextNoteBtn);

    //Spara edited-knapparna
    hideObject(saveEditedListBtn);
    hideObject(saveEditedTemplateBtn);
    hideObject(saveEditedTextBtn);

    //Titel-input och label
    hideObject(inputTitleBox);
    hideObject(labelTitle);

    //List-item input och innehåll
    hideObject(inputItemBox);
    hideObject(listNote);
    hideObject(labelListItem);

    //Textarea
    hideObject(textArea);
}

function showListObjects() {
    showObject(labelTitle);
    showObject(inputTitleBox);
    showObject(labelListItem)
    showObject(inputItemBox);
    showObject(listNote);
}

function showTemplateObjects() {
    showObject(textArea);
    showObject(userTitle);
    textArea.focus();
}

function showTextObjects() {
    showObject(inputTitleBox);
    showObject(labelTitle);
    showObject(textArea);
    showObject(userTitle);
    inputTitleBox.focus();
}

/**
 * Visar sparade notes
 * 
 */
function showSavedNoteTitles(e) {
    if (JSON.parse(localStorage.getItem("Notes")) != null) {
        savedNotesMessage.textContent = "Saved notes";
    }
    createPForSavedNote();
}

/**
 * Skapar ett p-element med titel och datum från senast skapade Note
 */
function createPForSavedNote() {
    updateSavedNotes();
    let lastNote = savedNotes.pop();

    pArray.push(document.createElement("p"));

    let newP = pArray.pop();
    newP.textContent = lastNote.title + " " + lastNote.date;
    newP.setAttribute("id", counter);
    newP.addEventListener("click", (e) => { openSavedNote(e) });


    savedNotesDiv.appendChild(newP);
    pArray.push(newP);

    savedNotes.push(lastNote);
    counter++;
}

function openSavedNote(e) {
    initModal();
    hideModalObjects();

    noteObject = noteArray[e.target.id]; // här sparar vi objektet som vi klickat på 

    if (noteObject.type === "list") {
        userTitle.textContent = noteObject.title;

        for (let i = 0; i < noteObject.content.length; i++) {
            listItem = document.createElement("li");
            listItem.textContent = noteObject.content[i];
            listNote.appendChild(listItem);
        }

        showListObjects()
        showObject(saveEditedListBtn);
    }
    else if (noteObject.type === "template") {
        userTitle.textContent = noteObject.title;
        textArea.value = noteObject.content;
        showTemplateObjects();
        showObject(saveEditedTemplateBtn);
    }
    else {
        userTitle.textContent = noteObject.title;
        textArea.value = noteObject.content;
        showTextObjects();
        showObject(saveEditedTextBtn);
    }
}

function updateSavedNotes() {
    savedNotes = JSON.parse(localStorage.getItem("Notes"));
}

function addTitleToNote(e) {
    if (e.which === 13 || e.key === 13) {  //firefox .which, chrome .key//
        if (inputTitleBox.value.length == 0) {  //checks if input field is empty//
            alert("Wow, so much empty")
        }
        else {
            userTitle.textContent = inputTitleBox.value.toUpperCase();
            showObject(userTitle);
            inputItemBox.focus();
            textArea.focus();
        }
        clearField(inputTitleBox);
    }
}

function addListItemToList(e) {
    if (e.which === 13 || e.key === 13) {   //firefox .which, chrome .key//
        if (inputItemBox.value.length == 0) {  //checks if input is empty
            alert("Wow, so much empty")
        }
        else {
            listItem = document.createElement("li");
            listItem.setAttribute("class", "myListItem");
            listItem.textContent = document.getElementById("inputListBox").value;
            document.getElementsByClassName("myList")[0].appendChild(listItem);

            clearField(inputItemBox);
            showObject(resetNoteButton);
        }
    }
}

// ALLA APPEND CHILD **************************************************************************************

//USER LOGIN
container.appendChild(labelUser);
container.appendChild(userInput);
container.appendChild(loginButton);

// DESSA SKA BORT HÄRIFRÅN NÄR VI ANVÄNDER LOGIN, FÖR DÅ APPENDAS DE I DEN
/* container.appendChild(openNewListNoteBtn);
container.appendChild(openNewTemplateNoteBtn);
container.appendChild(openNewTextNoteBtn);
body.appendChild(savedNotesDiv);
savedNotesDiv.appendChild(savedNotesHeader);
savedNotesDiv.appendChild(noSavedNotesMessage);  */

// MODAL
body.appendChild(modalBg);
modalBg.appendChild(innerModal)

// LISTOR 
innerModal.appendChild(labelTitle);
labelTitle.appendChild(inputTitleBox);
innerModal.appendChild(labelListItem);
labelListItem.appendChild(inputItemBox);
innerModal.appendChild(userTitle);
innerModal.appendChild(listNote);

//TEXT AREA
innerModal.appendChild(textArea);

// KNAPPAR FÖR SPARA OCH RESET
innerModal.appendChild(saveNewTextNoteBtn);
innerModal.appendChild(saveNewTemplateNoteBtn);
innerModal.appendChild(saveNewListNoteBtn);
innerModal.appendChild(resetNoteButton);
innerModal.appendChild(saveEditedTextBtn);
innerModal.appendChild(saveEditedTemplateBtn);
innerModal.appendChild(saveEditedListBtn);


// ALLA EVENT LISTENERS ***********************************************************************************

//function to add title chosen by user. Triggered when enter is released.
inputTitleBox.addEventListener("keyup", (e) => { addTitleToNote(e) });

//Event for user to add list items//
inputItemBox.addEventListener("keyup", (e) => { addListItemToList(e) });

saveNewTextNoteBtn.addEventListener("click", (e) => {
    newTextNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

saveNewTemplateNoteBtn.addEventListener("click", (e) => {
    newTemplateNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

saveNewListNoteBtn.addEventListener("click", (e) => {
    newListNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

saveEditedTextBtn.addEventListener("click", () => {
    noteObject.addContent();
    saveToStorage();
})

saveEditedTemplateBtn.addEventListener("click", () => {
    noteObject.addContent();
    saveToStorage();
})

saveEditedListBtn.addEventListener("click", () => {
    noteObject.addContent();
    saveToStorage();
})


openNewTextNoteBtn.addEventListener("click", () => {
    textArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    textArea.setAttribute("class", "text");
    initModal();
    hideModalObjects();
    showTextObjects();
    showObject(saveNewTextNoteBtn);
});

openNewTemplateNoteBtn.addEventListener("click", () => {
    textArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    textArea.setAttribute("class", "template");
    userTitle.textContent = randomTextTemplate();
    initModal();
    hideModalObjects();
    showTemplateObjects();
    showObject(saveNewTemplateNoteBtn);
});

openNewListNoteBtn.addEventListener("click", () => {
    initModal();
    hideModalObjects();
    showListObjects();
    showObject(saveNewListNoteBtn);
});

modalBg.addEventListener("click", closeModal);

resetNoteButton.addEventListener("click", resetNote);

loginButton.addEventListener("click", () => {
    let value = validateUser();
    if (value) {
        // DESSA SKA KOMMENTERAS BORT IFALL MAN INTE VILL ANVÄNDA LOGIN
        container.appendChild(openNewListNoteBtn);
        container.appendChild(openNewTextNoteBtn);
        container.appendChild(openNewTemplateNoteBtn);
        body.appendChild(savedNotesDiv);
        savedNotesDiv.appendChild(savedNotesMessage);

        //***To be un-commented later****
        hideObject(labelUser);
        hideObject(userInput);
        hideObject(loginButton);

        //function to filter saved notes by user
    }
    else {
        alert("Something went wrong please try again");
        clearField(userInput);
        userInput.focus();
    }
});

}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("dom loaded");
    init();
  });
/* ---JOBBA PÅ DENNA NÄR VI HAR MER KLART
document.addEventListener("DOMContentLoaded", () => {
    createListNote();
    createTextNote();
    createTemplateTextNote();
});
*/

//test to set eventlistener to every X on items. Needs objects for both li and X to work
/*let xList;

function addEventToX (){
    xList = document.querySelectorAll(".removeListItem");

    for(let i = 0; i < xList.length; i++){

        xList[i].addEventListener("click", function(){ //works to add eventlistener on each X
            console.log("I work! But I do nothing...")
    });
  }
}
*/

/* ---IF WE HAVE TIME---
//function to add remove X to every list item//
function addRemoveBtn() {
    let items = document.querySelectorAll(".myListItem");
    let remove = document.createElement("i"); //skapar ett i-element till li(remove)
    remove.setAttribute("class", "removeListItem");
    remove.innerText = " X";

    for (let i = 0; i < items.length; i++) {
        document.getElementsByClassName("myListItem")[i].appendChild(remove);
    }
    //return items;

}
*/