"use strict"
//feature_list_note


/* create content for the site using JS*/


let newEmptyListButton = document.createElement("button"); //button is created to initialize new list
newEmptyListButton.setAttribute("id", "newEmptyListButton");
newEmptyListButton.textContent = "New empty list";
document.getElementById("container").appendChild(newEmptyListButton);

function showNewList() {						//function displays list
    listTitle.style.display = "block";
    listHeading.style.display = "block";
}

function hideNewEmptyListButton() {
    newEmptyListButton.style.display = "none"; //function hides newEmptyListButton
}



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

let userTitle = document.createElement("h4");
userTitle.setAttribute("class", "userTitle");
userTitle.style.display="none";

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
saveBtn.style.display = "none";
saveBtn.innerText = "Save";
document.getElementById("secondContainer").appendChild(saveBtn);

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

let inputTitle = document.createElement("h4"); //skapar en titel som user valt
inputTitle.setAttribute("class", "userTitle");
inputTitle.setAttribute("id", "myTitle");
inputTitle.style.display = "none";


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

let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let textSuggestionButton = document.createElement("button");
textSuggestionButton.setAttribute("id", "textSuggestionButton"); // ger det nya button-elementet id
textSuggestionButton.textContent = "New note with text suggestion"; // sätter knappens text

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
saveButton.textContent = "Save"; // ger den texten Save

const container = document.getElementById("container"); // sparar container i en variabel
container.appendChild(emptyNoteButton); // Lägger till new empty note-knappen i container-div:en
container.appendChild(saveButton); // Lägger till save-knappen i container-div:en
container.appendChild(textSuggestionButton); // Lägger till textSuggestionButton i container-div:en

let newTextArea = document.createElement("textarea");
container.appendChild(newTextArea);
newTextArea.style.display = "none";

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
 * Skapar en ny text area och lägger till den i container-div:en
 */
function openEmptyTextArea() {
    let newTextArea = document.createElement("textarea");
    container.appendChild(newTextArea);
}

/**
 * Skapar en text area, lägger till ett textförslag och appendar den till container-div:en
 */
function openSuggestionTextArea() {
    let newPromptTextArea = document.createElement("textarea");
    newPromptTextArea.value = randomTextSuggestion();
    container.appendChild(newPromptTextArea);
}
function modal() {
    let modalBg = document.createElement("div");
    let innerModal = document.createElement("div");

    modalBg.setAttribute("id", "")
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

saveButton.addEventListener("click", () => { //clear text area vid tryck på save
    clearTextArea();
})

emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    hideButton(emptyNoteButton);
    hideButton(newEmptyListButton);
    hideButton(textSuggestionButton);  // dessa tre funktioner körs vid klick: dölj new note-knappen, öppna textarea, visa save-knappen
    showButton(saveButton);
    showTextArea();
});

textSuggestionButton.addEventListener("click", () => {
    hideButton(emptyNoteButton);
    hideButton(newEmptyListButton);
    hideButton(textSuggestionButton);
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
