"use strict"

let noteArray = []; // skapar en array
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); //datum under 10 skrivs ut lite fult men ok

// ALLA VARIABLER ***************************************************************************************************************

// KONSTANTER
const body = document.querySelector("body");
const container = document.getElementById("container"); // sparar container i en variabel
const modalBg = document.createElement("div"); // modalens transperenta bakgrund
modalBg.setAttribute("id", "modalBgBox");
const innerModal = document.createElement("div");// inre divbox i modalen

// Stajling på modaler som kommer flyttas till CSS-dok när vi har det
modalBg.style.backgroundColor = "rgba(0,0,0,0.4)"; /* Black w/ opacity */
modalBg.style.width = "100%";
modalBg.style.height = "100vh";
modalBg.style.position = "absolute";
modalBg.style.top = "0px";
modalBg.style.padding = "100px";
innerModal.style.backgroundColor = "white";
innerModal.style.width = "50%";
innerModal.style.padding = "20px";

// KNAPPAR FÖR DE OLIKA ANTECKNINGSTYPERNA
let newEmptyListButton = document.createElement("button"); //button is created to initialize new list
newEmptyListButton.setAttribute("id", "newEmptyListButton");
newEmptyListButton.textContent = "New empty list";

let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let textTemplateButton = document.createElement("button");
textTemplateButton.setAttribute("id", "textTemplateButton"); // ger det nya button-elementet id
textTemplateButton.textContent = "New note with text Template"; // sätter knappens text

// SAVE-BUTTONS
let saveBtn = document.createElement("button");
saveBtn.setAttribute("id", "listSaveBtn");
saveBtn.style.display = "none";
saveBtn.innerText = "Save";

// SAVE-BUTTON
let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
saveButton.textContent = "Save"; // ger den texten Save

//CLEAR-BUTTON
let resetNoteButton = document.createElement("button"); 
resetNoteButton.setAttribute("id", "clearList"); 
resetNoteButton.style.display = "none"; 
resetNoteButton.textContent = "Start Over";

// FÄLT TILL LISTOR 

let inputTitleBox = document.createElement("input"); //input field for user title//
inputTitleBox.setAttribute("id", "inputTitleBox");
inputTitleBox.setAttribute("type", "text");
inputTitleBox.setAttribute("placeholder", "Add Title and press Enter");

let userTitle = document.createElement("h4");
userTitle.setAttribute("class", "userTitle");
userTitle.style.display = "none";

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");
inputItemBox.setAttribute("type", "text");
inputItemBox.setAttribute("placeholder", "Add to-do and press Enter");
inputItemBox.attributes.required = true; //!oklart om denna gör något!//

let listNote = document.createElement("ul"); //unordered list
listNote.setAttribute("class", "myList"); //om id, numereriskt som ökar för varje lista?

let inputTitle = document.createElement("h4"); //skapar en titel som user valt
inputTitle.setAttribute("class", "userTitle");
inputTitle.setAttribute("id", "myTitle");
inputTitle.style.display = "none";

let newTextArea = document.createElement("textarea");
newTextArea.style.display = "none";
// ALLA FUNKTIONER ************************************************************************************************************

/**
 * Konstruktor för Note-objekt
 * @param {string med list, text eller template} type 
 */
function Note(type) {
    this.date = date;
    this.type = type;
    this.title = " ";
    this.content = "nothing";
    this.addContent = function () {
        if (this.type === "list") {
            this.content = document.getElementsByTagName("li"); // sparas i en HTML-collection
        }
        else if (this.type === "text") {
            this.content = document.querySelector(".text").value;
        }
        else {
            this.content = document.querySelector(".template").value;
        }

    };
    this.addTitle = function () {
        this.title = document.getElementById("inputTitleBox").value;
    };
}

/**
 * Skapar Note-objekt av text-typ
 */
function createTextNote() {
    noteArray.push(new Note("text"));
}

/**
 * Skapar Note-objekt av template-typ
 */
function createTemplateTextNote() {
    noteArray.push(new Note("template"));
}

/**
 * Skapar Note-objekt av list-typ
 */
function createListNote() {
    noteArray.push(new Note("list"));
}

/**
* Tar bort innehållet i ett fält 
*/
function clearField(field) {
    field.value = " ";
}

function clearTitle(element) {
    element.textContent = "";

}

/*
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


function modal() {
    showObject(body.appendChild(modalBg));
    showObject(modalBg.appendChild(innerModal));
}

function closeModal(e) {
    if (e.target == modalBg) { //om target inte är modal, stäng modal (DAN) 
        hideObject(modalBg);
        resetNote()
    }
}

function chooseAndOpenTextArea() {
    let noteObject = noteArray.pop(); //plockar ut senaste note-objektet ur array
    newTextArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    noteArray.push(noteObject); // lägger tillbaks note-objektet i arrayen, det var detta jag hade glömt lägga till när jag bugfixade!

    showObject(newTextArea);

    if (noteObject.type === "text") {
        newTextArea.setAttribute("class", "text");
        
        innerModal.appendChild(newTextArea);
        innerModal.appendChild(saveButton);
        innerModal.appendChild(resetNoteButton);
    }
    else {
        newTextArea.setAttribute("class", "template");
        newTextArea.value = randomTextTemplate();
        innerModal.appendChild(newTextArea);
        innerModal.appendChild(saveButton);
        innerModal.appendChild(resetNoteButton);
    }
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

function saveTitleToNote() {
    let noteTitle = noteArray.pop();
    noteTitle.addTitle(userTitle);  // komma ihåg att använda samma titelfält för alla textboxar så de e samma variabel här
    noteArray.push(noteTitle);
}

function saveContentToNote() {
    let noteContent = noteArray.pop();
    noteContent.addContent();
    noteArray.push(noteContent);
}

function saveToStorage() {
    let noteBook = JSON.stringify(noteArray);
    localStorage.setItem("Notes", noteBook);
    //listan och rubrik hänger med till andra notes - FIXA
}

function resetNote() {
    while (listNote.firstChild) {
        listNote.removeChild(listNote.firstChild);
    }
    clearTitle(userTitle);
    newTextArea.value = "";
    if (newTextArea.classList.contains("template")) {
        newTextArea.value = randomTextTemplate();
    }
}

// ALLA APPEND CHILD **************************************************************************************

// KNAPPARNA FÖR OLIKA ANTECKNINGAR
container.appendChild(newEmptyListButton);
container.appendChild(emptyNoteButton); // Lägger till new empty note-knappen i container-div:en
container.appendChild(textTemplateButton); // Lägger till textTemplateButton i container-div:en

// LISTOR 
innerModal.appendChild(inputTitleBox);
innerModal.appendChild(inputItemBox);
innerModal.appendChild(userTitle);
innerModal.appendChild(listNote);
innerModal.appendChild(saveButton);


// KNAPPAR FÖR SPARA OCH RESET
innerModal.appendChild(saveButton);
innerModal.appendChild (resetNoteButton);


// ALLA EVENT LISTENERS ***********************************************************************************

//function to add title chosen by user. Triggered when enter is released. 

inputTitleBox.addEventListener("keyup", function (e) {
    
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
        saveTitleToNote();
        clearField(inputTitleBox);
        
    }
});

//Event for user to add list items//
inputItemBox.addEventListener("keyup", function (e) {
    let listItem = "";

    if (e.which === 13 || e.key === 13) {   //firefox .which, chrome .key//
        if (inputItemBox.value.length == 0) {  //checks if input is empty
            alert("Wow, so much empty")
        }
        else {
            listItem = document.createElement("li");
            listItem.setAttribute("class", "myListItem");
            listItem.innerText = document.getElementById("inputListBox").value;
            document.getElementsByClassName("myList")[0].appendChild(listItem);

            clearField(inputItemBox);
            showObject(saveButton);
            //showObject resetNoteButton);
            //addRemoveBtn();
        }
    }
    saveContentToNote();

});

saveButton.addEventListener("click", () => {
    saveContentToNote();
    saveToStorage();
})


emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    createTextNote();
    modal();

    showObject(userTitle);
    hideObject(listNote);
    hideObject(inputItemBox);
    chooseAndOpenTextArea();
    inputTitleBox.focus();
    showObject(saveButton);
    showObject (resetNoteButton);
});

textTemplateButton.addEventListener("click", () => {
    createTemplateTextNote();
    modal();
    
    chooseAndOpenTextArea();
    inputTitleBox.focus();
    hideObject(inputItemBox);
    hideObject(listNote);
    chooseAndOpenTextArea();
    showObject(saveButton);
    showObject(resetNoteButton);
});

newEmptyListButton.addEventListener("click", () => {
    createListNote();
    modal();
    
    hideObject(newTextArea);
    showObject(inputItemBox);
    showObject(listNote); // men nu visas den tidigare skrivna listan, kolla i clear modal
    hideObject(newTextArea);
    inputTitleBox.focus();
    showObject(saveButton);
    showObject (resetNoteButton);
});

modalBg.addEventListener("click", closeModal);

resetNoteButton.addEventListener("click", resetNote);

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
