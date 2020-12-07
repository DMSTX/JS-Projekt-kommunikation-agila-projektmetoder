"use strict"

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

let textSuggestionButton = document.createElement("button");
textSuggestionButton.setAttribute("id", "textSuggestionButton"); // ger det nya button-elementet id
textSuggestionButton.textContent = "New note with text suggestion"; // sätter knappens text

// SAVE-BUTTONS
let saveBtn = document.createElement("button");
saveBtn.setAttribute("id", "listSaveBtn");
saveBtn.style.display = "none";
saveBtn.innerText = "Save";

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
saveButton.textContent = "Save"; // ger den texten Save

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

// TEXTAREAS
let newTextArea = document.createElement("textarea");
newTextArea.style.display = "none";



// ALLA FUNKTIONER ************************************************************************************************************

/**
* Tar bort innehållet i ett fält 
*/
function clearField(field) {
    field.value = " ";
}

//function to add remove button to every list item//
function addRemoveBtn() {
    let items = document.querySelectorAll(".myListItem");
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "removeListItem");
    removeBtn.innerText = "X";

    for (let i = 0; i < items.length; i++) {
        document.getElementsByClassName("myListItem")[i].appendChild(removeBtn);
    }
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


function modal() {
    showObject(body.appendChild(modalBg)) ;
    showObject(modalBg.appendChild(innerModal));
}

function closeModal(e) {
    if (e.target === modalBg) {
        hideObject(modalBg);
        newTextArea.value="";
    }
}

/**
 * Skapar en text area, lägger till ett textförslag och appendar den till container-div:en
 */
function openSuggestionTextArea() {
    newTextArea.value = randomTextSuggestion();
    showObject(innerModal.appendChild(newTextArea));
}

/**
 * Slumpar fram ett av 10 textförslag
 * Returnerar en string med ett textförslag
 */
function randomTextSuggestion() {
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

// ALLA APPEND CHILD **************************************************************************************

// KNAPPARNA FÖR OLIKA ANTECKNINGAR
container.appendChild(newEmptyListButton);
container.appendChild(emptyNoteButton); // Lägger till new empty note-knappen i container-div:en
container.appendChild(textSuggestionButton); // Lägger till textSuggestionButton i container-div:en

// LISTOR 
container.appendChild(listTitle);
container.appendChild(listHeading);
secondContainer.appendChild(saveBtn);
secondContainer.appendChild(listNote);

document.getElementById("listTitle").appendChild(inputTitleBox);
document.getElementById("listHeading").appendChild(inputItemBox);

innerModal.appendChild(saveButton); // Lägger till save-knappen i container-div:en
innerModal.appendChild(newTextArea);

// ALLA EVENT LISTENERS ***********************************************************************************

//function to add title chosen by user. Triggered when enter is released. 
inputTitleBox.addEventListener("keyup", function (e) {

    if (e.which === 13 || e.key === 13) {  //firefox .which, chrome .key//
        if (inputTitleBox.value.length == 0) {  //checks if input field is empty//
            alert("Wow, so much empty")
        }
        else {
            userTitle.innerText = document.getElementById("inputTitleBox").value;
            userTitle.style.display = "block"
            document.getElementsByClassName("myList")[0].appendChild(userTitle); //puts title before el-element
            clearField(inputTitleBox);
        }
    }
});

//Event for user to add list items in DIV secondContainer//
//function to add title to variable. Triggered when enter is released. 
inputTitleBox.addEventListener("keyup", function (e) {
    if (e.which === 13 || e.key === 13) {  //firefox .which, chrome .key//
        if (inputTitle.length == 0) {
            alert("Wow, so much empty")
        }
        //console.log(inputTitle);//
    }
    return inputTitle;
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
            showObject(saveBtn); //skicka med vilken button dete gäller till Ziggis function
            addRemoveBtn();
        }
    }
});

saveButton.addEventListener("click", () => { //clear text area vid tryck på save
    clearField(newTextArea);
});

emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    modal();
    showObject(newTextArea);
    showObject(saveButton);
});

textSuggestionButton.addEventListener("click", () => {
    modal();
    openSuggestionTextArea();
    showObject(saveButton);
});

newEmptyListButton.addEventListener("click", () => {
    showObject(listTitle);
    showObject(listHeading);
    hideObject(emptyNoteButton);
    hideObject(newEmptyListButton);
    hideObject(textSuggestionButton);
    showObject(saveBtn);
});

modalBg.addEventListener("click", closeModal);

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