"use strict"

let noteArray = []; // skapar en array
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); //datum under 10 skrivs ut lite fult men ok
let userList = ["Ziggi", "Dan", "Ludvig", "Sandra"];
let currentUser = ""; // needs user name from a login-input field. add document.getElement....

// ALLA VARIABLER ***************************************************************************************************************

// KONSTANTER
const body = document.querySelector("body");
const container = document.getElementById("container"); // sparar container i en variabel
const modalBg = document.createElement("div"); // modalens transperenta bakgrund
modalBg.setAttribute("id", "modalBgBox");
modalBg.style.display = "none";
const innerModal = document.createElement("div");// inre divbox i modalen
innerModal.setAttribute("id", "popUp");

// KNAPPAR FÖR DE OLIKA ANTECKNINGSTYPERNA
let newEmptyListButton = document.createElement("button"); //button is created to initialize new list
newEmptyListButton.setAttribute("id", "newEmptyListButton");
newEmptyListButton.setAttribute("class", "pageButtons");
newEmptyListButton.textContent = "New empty list";

let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.setAttribute("class", "pageButtons");
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let textTemplateButton = document.createElement("button");
textTemplateButton.setAttribute("id", "textTemplateButton"); // ger det nya button-elementet id
textTemplateButton.setAttribute("class", "pageButtons");
textTemplateButton.textContent = "New note with text Template"; // sätter knappens text

//FÄLT TILL USER LOGIN
let labelUser = document.createElement("label");
labelUser.setAttribute("for", "inputUser");
labelUser.textContent = "USER NAME";

let userInput = document.createElement("input");
userInput.setAttribute("id", "userInput");
userInput.setAttribute("type", "text");
userInput.required = true;

//LOGIN-BUTTON
let loginButton = document.createElement("button");
loginButton.setAttribute("id", "loginButton");
loginButton.textContent = "Login";

// SAVE BUTTONS
const newTextNoteButton = document.createElement("button");
newTextNoteButton.setAttribute("id", "textNoteButton");
newTextNoteButton.style.display = "none";
newTextNoteButton.textContent = "Save";

const newTemplateNoteButton = document.createElement("button");
newTemplateNoteButton.setAttribute("id", "templateNoteButton");
newTemplateNoteButton.style.display = "none";
newTemplateNoteButton.textContent = "Save";

const saveListNoteButton = document.createElement("button");
saveListNoteButton.setAttribute("id", "listNoteButton");
saveListNoteButton.style.display = "none";
saveListNoteButton.textContent = "Save";

// SPARA REDIGERAD ANTECKNING 
const saveEditedTextButton = document.createElement("button");
saveEditedTextButton.setAttribute("id", "saveEditedTextButton");
saveEditedTextButton.style.display = "none";
saveEditedTextButton.textContent = "Save";

const saveEditedTemplateButton = document.createElement("button");
saveEditedTemplateButton.setAttribute("id", "saveEditedTemplateButton");
saveEditedTemplateButton.style.display = "none";
saveEditedTemplateButton.textContent = "Save";

const saveEditedListButton = document.createElement("button");
saveEditedListButton.setAttribute("id", "saveEditedListButton");
saveEditedListButton.style.display = "none";
saveEditedListButton.textContent = "Save";

//CLEAR-BUTTON
let resetNoteButton = document.createElement("button");
resetNoteButton.setAttribute("id", "clearList");
resetNoteButton.setAttribute("class", "modalButtons");
resetNoteButton.style.display = "none";
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
userTitle.style.display = "none";

let labelListItem = document.createElement("label");
labelListItem.setAttribute("for", "inputListBox");
labelListItem.textContent = "TO-DO ";

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");
inputItemBox.setAttribute("type", "text");
inputItemBox.attributes.required = true; //!oklart om denna gör något!//

let listNote = document.createElement("ul"); //unordered list
listNote.setAttribute("class", "myList"); //om id, numereriskt som ökar för varje lista?

let inputTitle = document.createElement("h4"); //skapar en titel som user valt
inputTitle.setAttribute("class", "userTitle");
inputTitle.setAttribute("id", "myTitle");
inputTitle.style.display = "none";

//TEXT AREA TILL TEXT O TEMPLATE
let newTextArea = document.createElement("textarea");
newTextArea.style.display = "none";

//SPARADE NOTES 
const savedNotesHeader = document.createElement("h2");
savedNotesHeader.textContent = "Saved notes";

const savedNotesDiv = document.createElement("div");

/*savedNotesDiv.style.display = "none";*/
savedNotesDiv.setAttribute("id", "myNotes");

let noSavedNotesMessage = document.createElement("p");
noSavedNotesMessage.textContent = "When you save a note it will show up here!";
savedNotesDiv.appendChild(noSavedNotesMessage);

let pArray = [];
let savedNotes = [];
let counter = 0;

let listItem;

let x; // borde byta namn, används i OpenSavedNote, och vidare i spara redigareade notes

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

function validateUser (){
    let userInput = document.getElementById("userInput").value;

    for (let i = 0; i < userList.length; i++){
        if (userInput === userList[i]){
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

    if (newTextArea.classList.contains("template")) {
        userTitle.textContent = randomTextTemplate();
    }
    clearTitle(userTitle);
    newTextArea.value = "";
}

/**
 * Öppnar modal, visar knappar, sätter pekaren rätt
 */
function initModalAndHideObjects() {
    showObject(modalBg);
    showObject(innerModal); ;
    showObject(resetNoteButton);
    inputTitleBox.focus();
    hideObject(saveListNoteButton);
    hideObject(newTemplateNoteButton);
    hideObject(newTextNoteButton);
    hideObject(inputTitleBox);
    hideObject(labelTitle);
    hideObject(inputItemBox);
    hideObject(listNote);
    hideObject(labelListItem);
}

/**
 * Tar bort default-meddelandet och skapar nytt p-element om det är en ny note
 * 
 */

function showSavedNoteTitles(e) {
    if (JSON.parse(localStorage.getItem("Notes")) != null) {
        hideObject(noSavedNotesMessage);
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
    updateSavedNotes();
    initModalAndHideObjects();

    x = noteArray[e.target.id]; // här sparar vi objektet som vi klickat på 

    if (x.type === "list") {
        userTitle.textContent = x.title;

        for (let i = 0; i < x.content.length; i++) {
            listItem = document.createElement("li");
            listItem.textContent = x.content[i];
            listNote.appendChild(listItem);
        }

        hideObject(newTextArea);
        showObject(labelTitle);
        showObject(inputTitleBox);
        showObject(labelListItem)
        showObject(inputItemBox);
        showObject(listNote);
        showObject(saveEditedListButton);
    }
    else if (x.type === "template"){

        userTitle.textContent = x.title;
        showObject(newTextArea);
        newTextArea.value = x.content;
        showObject(saveEditedTemplateButton);

    }
    else {
        showObject(labelTitle);
        showObject(inputTitleBox);
        userTitle.textContent = x.title;
        showObject(newTextArea);
        newTextArea.value = x.content;
        showObject(saveEditedTextButton);
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
            newTextArea.focus();
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

// KNAPPARNA FÖR OLIKA ANTECKNINGAR *** !! Should be removed when we use login
/*container.appendChild(newEmptyListButton);
container.appendChild(emptyNoteButton);
container.appendChild(textTemplateButton);*/

// SPARADE NOTES
/*container.appendChild(savedNotesHeader);
container.appendChild(savedNotesDiv);*/
savedNotesDiv.appendChild(savedNotesHeader);
body.appendChild(savedNotesDiv);
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

innerModal.appendChild(newTextArea);


// KNAPPAR FÖR SPARA OCH RESET
innerModal.appendChild(newTextNoteButton);
innerModal.appendChild(newTemplateNoteButton);
innerModal.appendChild(saveListNoteButton);
innerModal.appendChild(resetNoteButton);
innerModal.appendChild(saveEditedTextButton);
innerModal.appendChild(saveEditedTemplateButton);
innerModal.appendChild(saveEditedListButton);


// ALLA EVENT LISTENERS ***********************************************************************************

//function to add title chosen by user. Triggered when enter is released.
inputTitleBox.addEventListener("keyup", (e) => { addTitleToNote(e) });

//Event for user to add list items//
inputItemBox.addEventListener("keyup", (e) => { addListItemToList(e)});

newTextNoteButton.addEventListener("click", (e) => {
    newTextNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

newTemplateNoteButton.addEventListener("click", (e) => {
    newTemplateNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

saveListNoteButton.addEventListener("click", (e) => {
    newListNote();
    saveToStorage();
    showSavedNoteTitles(e);
})

saveEditedTextButton.addEventListener("click", () => { 
    x.addContent();
    //x.content = document.querySelector(".text").value;  <<< verkar sparas i x, men inte i noteArray eller localStorage? 
    console.log(x);
    saveToStorage();
})

saveEditedTemplateButton.addEventListener("click", () => { 
    x.addContent();
    //x.content = document.querySelector(".template").value; <<<<< Detta gör att det typ sparas, men inte riktigt?
    console.log(x);
    saveToStorage();


})

saveEditedListButton.addEventListener("click", () => {
   x.addContent();
    /* let arrayOfListItems = listNote.childNodes; <<<<< Detta gör att det typ sparas, men inte riktigt?
    for (let i = 0; i < arrayOfListItems.length; i++) {
        x.content.push(arrayOfListItems[i].textContent);
    } */
    console.log(x);
    saveToStorage();
})


emptyNoteButton.addEventListener("click", () => {    
    newTextArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    
    newTextArea.setAttribute("class", "text");
    initModalAndHideObjects();
    showObject(newTextArea);
    showObject(newTextNoteButton);
    showObject(inputTitleBox);
    showObject(labelTitle);
});

textTemplateButton.addEventListener("click", () => {    
    newTextArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    
    newTextArea.setAttribute("class", "template");
    userTitle.textContent = randomTextTemplate();
    
    initModalAndHideObjects();
    showObject(newTextArea);
    showObject(newTemplateNoteButton);
    showObject(userTitle);
});

newEmptyListButton.addEventListener("click", () => {
    initModalAndHideObjects();
    hideObject(newTextArea);
    showObject(saveListNoteButton);
    showObject(labelTitle);
    showObject(inputTitleBox);
    showObject(labelListItem);
    showObject(inputItemBox);
    showObject(listNote);
});

modalBg.addEventListener("click", closeModal);

resetNoteButton.addEventListener("click", resetNote);

loginButton.addEventListener("click", () =>{  
    let value = validateUser();
    if(value){
        container.appendChild(newEmptyListButton);
        container.appendChild(emptyNoteButton);
        container.appendChild(textTemplateButton);
        
        //***To be un-commented later****
        hideObject(labelUser);
        hideObject(userInput);
        hideObject(loginButton);

        //also show saved notes here and filter notes per user
    }
    else{
        alert("Something went wrong please try again");
        clearField(userInput);
        userInput.focus();
    } 
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