"use strict"

let noteArray = []; // skapar en array
let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); //datum under 10 skrivs ut lite fult men ok

// ALLA VARIABLER ***************************************************************************************************************

// KONSTANTER
const body = document.querySelector("body");
const container = document.getElementById("container"); // sparar container i en variabel
const secondContainer = document.getElementById("secondContainer") //sparar secondContainer i en variabel
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

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
saveButton.textContent = "Save"; // ger den texten Save

//CLEAR-BUTTONS
let clearListBtn = document.createElement("button");
clearListBtn.setAttribute("id", "clearList");
clearListBtn.style.display = "none";
clearListBtn.textContent = "Start Over";

// FÄLT TILL LISTOR 
let listTitle = document.createElement("h3"); //sub-heading//
listTitle.setAttribute("id", "listTitle");
listTitle.innerText = "Add your Title:";
listTitle.style.display = "none"; // display = 'block' from eventlistener (DAN)

let inputTitleBox = document.createElement("input"); //input field for user title//
inputTitleBox.setAttribute("id", "inputTitleBox");
inputTitleBox.setAttribute("type", "text");
inputTitleBox.setAttribute("placeholder", "Title");

let userTitle = document.createElement("h4");
userTitle.setAttribute("class", "userTitle");
userTitle.style.display = "none";

let listHeading = document.createElement("h3"); //subheading//
listHeading.setAttribute("id", "listHeading");
listHeading.innerText = "Add your entry:";
listHeading.style.display = "none"; //display = 'block' from eventlistener (DAN)

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");
inputItemBox.setAttribute("type", "text");
inputItemBox.setAttribute("placeholder", "List Entry");
inputItemBox.attributes.required = "required"; //!oklart om denna gör något!//

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
            this.content = document.getElementsByClassName("text").value;
        }
        else {
            this.content = document.getElementsByClassName("template").value;
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

function clearList() {

}

//function to add remove button to every list item//
/* Väntar med detta...// Sandra
function addRemoveBtn() {
    let items = document.querySelectorAll(".myListItem");
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "removeListItem");
    removeBtn.innerText = "X";

    for (let i = 0; i < items.length; i++) {
        document.getElementsByClassName("myListItem")[i].appendChild(removeBtn);
    }
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
    if (e.target === modalBg) {
        newTextArea.value = " ";
        innerModal.removeChild(newTextArea);
        hideObject(modalBg);
    }
}

function chooseAndOpenTextArea() {
    let noteObject = noteArray.pop();

    newTextArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
    showObject(newTextArea);

    if (noteObject.type === "text") {
        newTextArea.setAttribute("class", "text");
        innerModal.appendChild(newTextArea);
        console.log("typ text");
    }
    else {
        newTextArea.setAttribute("class", "template");
        newTextArea.value = randomTextTemplate();
        innerModal.appendChild(newTextArea);
        console.log("typ template");
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

// ALLA APPEND CHILD **************************************************************************************

// KNAPPARNA FÖR OLIKA ANTECKNINGAR
container.appendChild(newEmptyListButton);
container.appendChild(emptyNoteButton); // Lägger till new empty note-knappen i container-div:en
container.appendChild(textTemplateButton); // Lägger till textTemplateButton i container-div:en

// LISTOR 
container.appendChild(listTitle);
container.appendChild(listHeading);
secondContainer.appendChild(listNote);
secondContainer.appendChild(saveBtn);
secondContainer.appendChild(clearListBtn);
document.getElementById("listHeading").appendChild(inputItemBox);

// MODAL
innerModal.appendChild(saveButton); // Lägger till save-knappen i container-div:en

// dessa två är i konflikt med varandra, och gör att title box inte syns när man ska skapa list
listTitle.appendChild(inputTitleBox);
innerModal.appendChild(inputTitleBox);

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
            container.appendChild(userTitle);
            inputItemBox.focus();

            /* DET GAMLA
            userTitle.innerText = document.getElementById("inputTitleBox").value;
            userTitle.style.display = "block"
            document.getElementsByClassName("myList")[0].appendChild(userTitle); //puts title before el-element
            //clearInput(inputTitleBox); */
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
            showObject(saveBtn);
            showObject(clearListBtn);
            //addRemoveBtn();
        }
    }
    saveContentToNote();
});

saveButton.addEventListener("click", () => { //clear text area vid tryck på save
    //clearTextArea();
    saveContentToNote();
})


emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    modal();
    showObject(saveButton);
    createTextNote();
    chooseAndOpenTextArea()

});

textTemplateButton.addEventListener("click", () => {
    modal();
    showObject(saveButton);
    createTemplateTextNote();
    chooseAndOpenTextArea()
});

newEmptyListButton.addEventListener("click", () => {
    showObject(listTitle);
    showObject(listHeading);
    hideObject(emptyNoteButton);
    hideObject(newEmptyListButton);
    hideObject(textTemplateButton);
    showObject(saveBtn);
    createListNote();
});

modalBg.addEventListener("click", closeModal);

clearListBtn.addEventListener("click", () => { //clears any items fron UL
    while (listNote.firstChild) {
        listNote.removeChild(listNote.firstChild);
    }
});
