"use strict"

let noteArray = []; // skapar en array
let userList = ["Ziggi", "Dan", "Ludvig", "Sandra"];
let currentUser = ""; // needs user name from a login-input field. add document.getElement....
let userNotes;

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
    let savedNotice = document.createElement("p");

    //saved notification
    savedNotice.textContent = "Saved";
    savedNotice.setAttribute("id", "savedNotice");

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
    let noteObject;
    let noteObjectIndex;

    let listItem;

    // ALLA FUNKTIONER ************************************************************************************************************

    /**
     * Konstruktor för Note-objekt
     * @param {string med list, text eller template} type 
     */
    function Note(type, title, user) { // skicka in content, user, title som parametrar!
        let today = new Date();
        this.date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " | " 
        + ('0' + today.getHours()).substr(-2) + ":" + ('0' + today.getMinutes()).slice(-2);

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

        this.addTitle = function () {
            this.title = userTitle.textContent;
        }

        this.addDate = function () {
            today = new Date;
            this.date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " | " 
            + ('0' + today.getHours()).substr(-2) + ":" + ('0' + today.getMinutes()).slice(-2);
        }
    }

    /**
     * Skapar nytt Note-objekt av text-typ
     */
    function newTextNote() {
        noteArray.push(new Note("text", userTitle.textContent, currentUser));

        let newNote = noteArray.pop();
        newNote.addContent();
        noteArray.push(newNote);
    }

    /**
     * Skapar nytt Note-objekt av template-typ
     */
    function newTemplateNote() {
        noteArray.push(new Note("template", userTitle.textContent, currentUser));

        let newNote = noteArray.pop();
        newNote.addContent();
        noteArray.push(newNote);
    }

    /**
     * Skapar nytt Note-objekt av list-typ
     */
    function newListNote() {
        noteArray.push(new Note("list", userTitle.textContent, currentUser));

        let newNote = noteArray.pop();
        newNote.addContent();
        noteArray.push(newNote);
    }

    /**
     * Tar bort innehållet i ett fält
     * @param {Input-fält} field 
     */
    function clearField(field) {
        field.value = "";
    }

    /**
     * Tar bort innehållet i ett fält
     * @param {TextContent-fält} element 
     */
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
            clearTitle(userTitle);
        }
    }

    /**
     * Kollar att användare får logga in
     */
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
        let number = Math.round((Math.random() * 9) +1);
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
        clearTitle(userTitle);
        clearField(textArea);
        clearField(inputTitleBox);
        clearField(inputItemBox);
        if (textArea.classList.contains("template")) {
            userTitle.textContent = randomTextTemplate();
        }
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

        //saved notice
        hideObject(savedNotice);
    }

    /**
     * Visar de objekt som ska finnas i modal vid lista
     */
    function showListObjects() {
        showObject(labelTitle);
        showObject(inputTitleBox);
        showObject(labelListItem)
        showObject(inputItemBox);
        showObject(listNote);
    }

    /**
     * Visar de objekt som ska finnas i modal vid template
     */
    function showTemplateObjects() {
        showObject(textArea);
        showObject(userTitle);
        textArea.focus();
    }

    /**
     * Visar de objekt som ska finnas i modal vid text
     */
    function showTextObjects() {
        showObject(inputTitleBox);
        showObject(labelTitle);
        showObject(textArea);
        showObject(userTitle);
        inputTitleBox.focus();
    }


    /**
     * Bekräftelse-meddelande när note sparats
     */
    function notificationTimeout () {
        setTimeout(function (){savedNotice.textContent="";},3000);
        savedNotice.textContent = "Saved...";
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
     * Skapar ett p-element med titel och datum för nyskapad Note
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
    
    function showAllStoredNotes() {
        updateSavedNotes();
        filterByUser();
        
        for (let i = 0; i < userNotes.length; i++){  
            pArray.push(document.createElement("p"));
            let lastNote = userNotes[i];
            console.log("kallas" + lastNote);

            let newP = pArray.pop();
            newP.textContent = lastNote.title + " " + lastNote.date;
            newP.setAttribute("id", counter);
            newP.addEventListener("click", (e) => { openSavedNote(e) });

            savedNotesDiv.appendChild(newP);
            pArray.push(newP);
            counter++;

        }    
    }

    /**
     * Öppnar en sparad Note
     * @param {eventet} e 
     */
    function openSavedNote(e) {
        initModal();
        hideModalObjects();

        noteObject = noteArray[e.target.id]; // här sparar vi objektet som vi klickat på 
        noteObjectIndex = e.target.id;

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

    /**
     * Uppdaterar arrayen med Notes hämtade från local Storage
     */
    function updateSavedNotes() {
        savedNotes = JSON.parse(localStorage.getItem("Notes"));
    }

    /**
     * Läser in och skriver ut titel i modal
     * @param {eventet} e 
     */
    function addTitleToNote(e) {
        if (e.which === 13 || e.key === 13) {  //firefox .which, chrome .key//
            if (inputTitleBox.value.length == 0) {  //checks if input field is empty//
                alert("Title cannot be empty!")
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

    /**
     * Läser in och skriver ut list-items i modal
     * @param {eventet} e 
     */
    function addListItemToList(e) {
        if (e.which === 13 || e.key === 13) {   //firefox .which, chrome .key//
            if (inputItemBox.value.length == 0) {  //checks if input is empty
                alert("This field cannot be empty!")
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

    /**
     * Fyller noteArray med Notes från local Storage
     */
    function fillNoteArray(){

        if(JSON.parse(localStorage.getItem("Notes")) != null){
            let prevNotes = JSON.parse(localStorage.getItem("Notes"));
            
            for(let i = 0; i < prevNotes.length; i++){
                noteArray.push(new Note(prevNotes[i].type, prevNotes[i].title, prevNotes[i].user)); 
            }

            for(let k = 0; k < noteArray.length; k++){
                let typeName = prevNotes[k].type;

                if(typeName === "list"){
                    let y = prevNotes[k].content;

                    for(let j = 0; j < y.length; j++){
                        listItem = document.createElement("li");
                        listItem.textContent = y[j];
                        listNote.appendChild(listItem);
                    }
                    noteArray[k].addContent();
                    resetNote();
                    
                }else{
                    textArea.setAttribute("class", typeName);
                    let contentID = prevNotes[k].content;
                    textArea.value = contentID;
                    noteArray[k].addContent();
                }

            }
        }
    }

    /**
     * Döljer loginboxar och visar förstasidan vid lyckad inloggning
     */
    function loginFunc (){
        let value = validateUser();
        if (value) {
            currentUser = userInput.value;
                
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
        }
        else {
            alert("Something went wrong please try again");
            clearField(userInput);
            userInput.focus();
        }
    }

    
    function filterByUser(){
        userNotes = noteArray.filter(checkUser =>{
            return checkUser.user.includes(currentUser)
        });
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
    innerModal.appendChild(savedNotice);


    // ALLA EVENT LISTENERS ***********************************************************************************

    //function to add title chosen by user. Triggered when enter is released.
    inputTitleBox.addEventListener("keyup", (e) => { addTitleToNote(e) });

    //Event for user to add list items//
    inputItemBox.addEventListener("keyup", (e) => { addListItemToList(e) });

    saveNewTextNoteBtn.addEventListener("click", (e) => {
        if (userTitle.textContent.length == 0) {  //checks if input field is empty//
            alert("Title cannot be empty!")
            inputTitleBox.focus();
        }
        else {
            newTextNote();
            saveToStorage();
            showSavedNoteTitles(e);
            showObject(savedNotice);
            notificationTimeout();
        }
    })

    saveNewTemplateNoteBtn.addEventListener("click", (e) => {
        if (userTitle.textContent.length == 0) {  //checks if input field is empty//
            alert("Title cannot be empty!")
            inputTitleBox.focus();
        }
        else {
            newTemplateNote();
            saveToStorage();
            showSavedNoteTitles(e);
            showObject(savedNotice);
            notificationTimeout();
        } 
    })

    saveNewListNoteBtn.addEventListener("click", (e) => {
        if (userTitle.textContent.length == 0) {  //checks if input field is empty//
            alert("Title cannot be empty!")
            inputTitleBox.focus();
        }
        else {
            newListNote();
            saveToStorage();
            showSavedNoteTitles(e);
            showObject(savedNotice);
            notificationTimeout();
        }
    })

    saveEditedTextBtn.addEventListener("click", () => {
        if (userTitle.textContent.length == 0) {  //checks if input field is empty//
            alert("Title cannot be empty!");
            inputTitleBox.focus();
        }
        else {
            noteObject.addContent();
            noteObject.addTitle();
            noteObject.addDate();
            pArray[noteObjectIndex].textContent = noteObject.title + " " + noteObject.date;
            saveToStorage();
            showObject(savedNotice);
            notificationTimeout();
        }
    })

    saveEditedTemplateBtn.addEventListener("click", () => {
        if (userTitle.textContent.length == 0) {  //checks if input field is empty//
            alert("Title cannot be empty!")
            inputTitleBox.focus();
        }
        else {
            noteObject.addContent();
            noteObject.addContent();
            noteObject.addTitle();
            noteObject.addDate();
            pArray[noteObjectIndex].textContent = noteObject.title + " " + noteObject.date;
            saveToStorage();
            showObject(savedNotice);
            notificationTimeout();
        }
    })

    saveEditedListBtn.addEventListener("click", () => {
        if (userTitle.textContent.length == 0) {  
            alert("Title cannot be empty!")
            inputTitleBox.focus();
        }
        else {
            noteObject.addContent();
            noteObject.addContent();
            noteObject.addTitle();
            noteObject.addDate();
            pArray[noteObjectIndex].textContent = noteObject.title + " " + noteObject.date;
            saveToStorage();
            showObject(savedNotice);
            notificationTimeout();
        }
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
        loginFunc();
        fillNoteArray();

        if (JSON.parse(localStorage.getItem("Notes")) != null) {
            savedNotesMessage.textContent = "Saved notes";
        }
        resetNote();
        clearTitle(userTitle);
        showAllStoredNotes();
    });

}

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});
