"use strict"

// ALLA VARIABLER ***************************************************************************************************************

// KONSTANTER
const container = document.getElementById("container"); // sparar container i en variabel
const secondContainer = document.getElementById("secondContainer") //sparar secondContainer i en variabel
const innerModal = document.createElement("div");// inre divbox i modalen

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
userTitle.style.display="none";

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

let newPromptTextArea = document.createElement("textarea");

// MODALENS TRANSPERENTA BAKGRUND
let modalBg = document.createElement("div");

// ALLA FUNKTIONER ************************************************************************************************************

//function to clear input field//
function clearInput(input) {
    input.value = "";
}

//function to add remove button to every list item//
function addRemoveBtn (){
    let items = document.querySelectorAll(".myListItem");
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "removeListItem");
    removeBtn.innerText = "X";

    for (let i = 0; i < items.length; i++){
        document.getElementsByClassName("myListItem")[i].appendChild(removeBtn);
    }
}

/// ((( ALLA FEM FUNKTIONER HÄR UNDER SKULLE KUNNA ERSÄTTAS MED TVÅ, EN SOM VISAR OBJEKT, O EN SOM DÖLJER)))

/**
 * Döljer knapp
 */
function hideButton(button) {
    button.style.display = "none";
}

/**
 * Visar knapp
 */

function showButton(button) {
    button.style.display = "block";
}

function showNewList() { //function displays list
    listTitle.style.display = "block";
    listHeading.style.display = "block";
}

function hideNewEmptyListButton() {
    newEmptyListButton.style.display = "none"; //function hides newEmptyListButton
}

/**
 * Visar text area vid tryck på "new note"
*/
function showTextArea() {
    newTextArea.style.display = "block";
}

/**
* Rensar text area vid tryck på "save"
*/
function clearTextArea() {
    newTextArea.value = '';
}

/**
 * Skapar en text area, lägger till ett textförslag och appendar den till container-div:en
 */
function openSuggestionTextArea() {
    newPromptTextArea.value = randomTextSuggestion();
    innerModal.appendChild(newPromptTextArea);
}

function modal() {
    
    let body = document.querySelector("body");
    modalBg.setAttribute("id", "modalBgBox");
    
    modalBg.style.backgroundColor = "rgba(0,0,0,0.4)"; /* Black w/ opacity */
    modalBg.style.width = "100%";
    modalBg.style.height = "100vh";
    modalBg.style.position = "absolute";
    modalBg.style.top = "0px";
    modalBg.style.padding = "100px";

    innerModal.style.backgroundColor = "white";
    innerModal.style.width = "50%";
    
    
    body.appendChild(modalBg);
    modalBg.appendChild(innerModal);
}

function closeModal (e){
    if (e.target === modalBg){
        modalBg.style.display = "none";
    }
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
    
    if(e.which === 13 || e.key === 13){  //firefox .which, chrome .key//
        if(inputTitleBox.value.length == 0){  //checks if input field is empty//
            alert("Wow, so much empty")
        }
        else{
            userTitle.innerText = document.getElementById("inputTitleBox").value;   
            userTitle.style.display ="block"
            document.getElementsByClassName("myList")[0].appendChild(userTitle); //puts title before el-element
            clearInput(inputTitleBox);
        }
    }
});

//Event for user to add list items in DIV secondContainer//
//function to add title to variable. Triggered when enter is released. 
inputTitleBox.addEventListener("keyup", function (e) {
    let inputTitle = document.getElementById("inputTitleBox").value;
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

            clearInput(inputItemBox);
            showButton(saveBtn); //skicka med vilken button dete gäller till Ziggis function
            addRemoveBtn();
        }
    }
});

saveButton.addEventListener("click", () => { //clear text area vid tryck på save
    clearTextArea();
})
    
emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    modal();
    showTextArea();
    showButton(saveButton);
});

textSuggestionButton.addEventListener("click", () => {
    modal();
    openSuggestionTextArea();
    showButton(saveButton); 
});

newEmptyListButton.addEventListener("click", () => {
    showNewList();
    hideButton(emptyNoteButton);
    hideButton(newEmptyListButton);
    hideButton(textSuggestionButton);
    showButton(saveBtn);
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