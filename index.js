"use strict"

// ALLA ELEMENT ***************************************************************************************************************
function init() {

    // ELEMENT SOM FINNS I INDEX.HTML
    const body = document.querySelector("body");
    const container = document.getElementById("container"); // sparar container i en variabel
    
    //MODALER
    const modalBg = document.createElement("div"); // modalens transperenta bakgrund
    modalBg.setAttribute("id", "modalBgBox");
    modalBg.style.display = "none";
    
    const innerModal = document.createElement("div");// inre divbox i modalen
    innerModal.setAttribute("id", "popUp");
    
    const savedNotice = document.createElement("p");
    
    //saved notification
    savedNotice.textContent = "Saved";
    savedNotice.setAttribute("id", "savedNotice");

    // ÖPPNA NY ANTECKNING-BUTTONS
    const openNewListNoteBtn = document.createElement("button"); //button is created to initialize new list
    openNewListNoteBtn.setAttribute("id", "newEmptyListButton");
    openNewListNoteBtn.setAttribute("class", "pageButtons");
    openNewListNoteBtn.textContent = "New empty list";

    const openNewTextNoteBtn = document.createElement("button"); // skapar ett nytt button-element
    openNewTextNoteBtn.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
    openNewTextNoteBtn.setAttribute("class", "pageButtons");
    openNewTextNoteBtn.textContent = "New empty note"; // sätter knappens text till New empty note

    const openNewTemplateNoteBtn = document.createElement("button");
    openNewTemplateNoteBtn.setAttribute("id", "textTemplateButton"); // ger det nya button-elementet id
    openNewTemplateNoteBtn.setAttribute("class", "pageButtons");
    openNewTemplateNoteBtn.textContent = "New note with text Template"; // sätter knappens text

    //LOGIN-BUTTON
    const loginButton = document.createElement("button");
    loginButton.setAttribute("id", "loginButton");
    loginButton.setAttribute("class", "pageButtons");
    loginButton.textContent = "Login";

    //FÄLT TILL USER LOGIN
    const labelUser = document.createElement("label");
    labelUser.setAttribute("for", "inputUser");
    labelUser.textContent = "";

    const userInput = document.createElement("input");
    userInput.setAttribute("id", "userInput");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("placeholder", "Input username");
    userInput.required = true;

    // SKAPA NOTE-OBJEKT OCH SPARA DET-BUTTONS
    const saveNewTextNoteBtn = document.createElement("button");
    saveNewTextNoteBtn.setAttribute("id", "textNoteButton");
    saveNewTextNoteBtn.setAttribute("class", "modalButtons");
    saveNewTextNoteBtn.style.display = "none"; 
    saveNewTextNoteBtn.textContent = "Save";

    const saveNewTemplateNoteBtn = document.createElement("button");
    saveNewTemplateNoteBtn.setAttribute("id", "templateNoteButton");
    saveNewTemplateNoteBtn.setAttribute("class", "modalButtons");
    saveNewTemplateNoteBtn.style.display = "none";
    saveNewTemplateNoteBtn.textContent = "Save";

    const saveNewListNoteBtn = document.createElement("button");
    saveNewListNoteBtn.setAttribute("id", "listNoteButton");
    saveNewListNoteBtn.setAttribute("class", "modalButtons");
    saveNewListNoteBtn.style.display = "none"; 
    saveNewListNoteBtn.textContent = "Save";

    // SPARA REDIGERAD ANTECKNING-BUTTONS
    const saveEditedTextBtn = document.createElement("button");
    saveEditedTextBtn.setAttribute("id", "saveEditedTextButton");
    saveEditedTextBtn.setAttribute("class", "modalButtons");
    saveEditedTextBtn.style.display = "none"; 
    saveEditedTextBtn.textContent = "Save";

    const saveEditedTemplateBtn = document.createElement("button");
    saveEditedTemplateBtn.setAttribute("id", "saveEditedTemplateButton");
    saveEditedTemplateBtn.setAttribute("class", "modalButtons");
    saveEditedTemplateBtn.style.display = "none"; 
    saveEditedTemplateBtn.textContent = "Save";

    const saveEditedListBtn = document.createElement("button");
    saveEditedListBtn.setAttribute("id", "saveEditedListButton");
    saveEditedListBtn.setAttribute("class", "modalButtons");
    saveEditedListBtn.style.display = "none"; 
    saveEditedListBtn.textContent = "Save";

    //RESET-BUTTON
    const resetNoteButton = document.createElement("button");
    resetNoteButton.setAttribute("id", "clearList");
    resetNoteButton.setAttribute("class", "modalButtons");
    resetNoteButton.style.display = "none"; 
    resetNoteButton.textContent = "Start Over";

    // FÄLT TILL ANTECKNINGAR
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "inputTitleBox");
    labelTitle.textContent = "TITLE ";

    const inputTitleBox = document.createElement("input"); //input field for user title//
    inputTitleBox.setAttribute("id", "inputTitleBox");
    inputTitleBox.setAttribute("type", "text");

    const userTitle = document.createElement("h4");
    userTitle.setAttribute("class", "userTitle");
    userTitle.style.display = "none";

    const labelListItem = document.createElement("label");
    labelListItem.setAttribute("for", "inputListBox");
    labelListItem.textContent = "TO-DO ";

    const inputItemBox = document.createElement("input"); //input field for user list items
    inputItemBox.setAttribute("id", "inputListBox");
    inputItemBox.setAttribute("type", "text");
    inputItemBox.attributes.required = true;

    const listNote = document.createElement("ul"); //unordered list
    listNote.setAttribute("class", "myList");

    const inputTitle = document.createElement("h4");
    inputTitle.setAttribute("class", "userTitle");
    inputTitle.setAttribute("id", "myTitle");
    inputTitle.style.display = "none"; 

    //TEXT AREA TILL TEXT O TEMPLATE
    const textArea = document.createElement("textarea");
    textArea.style.display = "none"; 

    //SPARADE NOTES 
    const savedNotesDiv = document.createElement("div");
    savedNotesDiv.setAttribute("id", "myNotes");

    const savedNotesMessage = document.createElement("h3");
    savedNotesMessage.textContent = "When you save a note it will show up here!";
    
    //KNAPP FÖR ATT RADERA ALLA NOTES I LOCAL
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete all notes";
    deleteBtn.setAttribute("class", "pageButtons");

    // GLOBALA VARIABLER *************************************************************************************************************
    let pArray = [];
    let savedNotes = [];
    let counter = 0;
    let noteObject;
    let noteObjectIndex;
    let listItem;
    let noteArray = [];
    let userList = ["Ziggi", "Dan", "Ludvig", "Sandra"];
    let currentUser = ""; 
    let userNotes;

    // ALLA APPEND CHILD **************************************************************************************

    //USER LOGIN
    container.appendChild(labelUser);
    container.appendChild(userInput);
    container.appendChild(loginButton);

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
    innerModal.appendChild(saveEditedTextBtn);
    innerModal.appendChild(saveEditedTemplateBtn);
    innerModal.appendChild(saveEditedListBtn);
    innerModal.appendChild(resetNoteButton);
    innerModal.appendChild(savedNotice);


    // ALLA FUNKTIONER ************************************************************************************************************

    /**
     * Konstruktor för Note-objekt
     * @param {string med list, text eller template} type 
     * @param {string med anteckningens titel} Title
     * @param {string med användare} User
     */
    function Note(type, title, user) { 
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
     * Skapar nytt Note-objekt av list-typ
     */
    function newListNote() {
        noteArray.push(new Note("list", userTitle.textContent, currentUser));

        let newNote = noteArray.pop();
        newNote.addContent();
        noteArray.push(newNote);
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
     * Öppnar modal och sätter pekaren i titelfältet
     */
    function initModal() {
        showObject(modalBg);
        showObject(innerModal);;
        showObject(resetNoteButton);
        inputTitleBox.focus();
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
     * Bekräftelse-meddelande när note sparats
     */
    function notificationTimeout () {
        setTimeout(function (){savedNotice.textContent="";},3000);
        savedNotice.textContent = "Saved...";
    }

    /**
     * Skapar ett p-element med titel och datum för nyskapad Note
     */
    function createPForNewNote() {
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
    
    /**
     * Visar sparade notes
     * 
     */
    function showSavedNoteTitles(e) {
        filterByUser();
        if (userNotes.length != 0) {
            savedNotesMessage.textContent = currentUser + "'s saved notes";
        }
        createPForNewNote();
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
            showObject(saveEditedTemplateBtn);
            showTemplateObjects();
            
        }
        else {
            userTitle.textContent = noteObject.title;
            textArea.value = noteObject.content;
            showObject(saveEditedTextBtn);
            showTextObjects();
        }
    }


    /**
     * Skapar p-element med titel och datum för Notes som hämtas från Local Storage
     */
    function showAllStoredNotes() {
        updateSavedNotes();
        filterByUser();
        
        for (let i = 0; i < userNotes.length; i++){  
            pArray.push(document.createElement("p"));
            let lastNote = userNotes[i];

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
     * Sparar noteArray till localStorage
     */
    function saveToStorage() {
        let noteBook = JSON.stringify(noteArray);
        localStorage.setItem("Notes", noteBook);
    }

    /**
     * Uppdaterar arrayen med Notes hämtade från local Storage
     */
    function updateSavedNotes() {
        savedNotes = JSON.parse(localStorage.getItem("Notes"));
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
     * Filtrerar noteArray på användarnamn
     */
    function filterByUser(){
        userNotes = noteArray.filter(checkUser =>{
            return checkUser.user.includes(currentUser)
        });
    }

    /**
     * Raderar alla notes i localStorage, tar bort alla element ur savedNotesDiv
     * och sätter tillbaka rubriken och delete-knappen
     */
    function deleteAllNotes() {
        localStorage.clear();
        while (savedNotesDiv.firstChild) {
            savedNotesDiv.removeChild(savedNotesDiv.firstChild);
        }
        savedNotesMessage.textContent = "When you save a note it will show up here!";
        savedNotesDiv.appendChild(deleteBtn);
        savedNotesDiv.appendChild(savedNotesMessage);
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
            savedNotesDiv.appendChild(deleteBtn);

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

    // ALLA EVENT LISTENERS ***********************************************************************************

    // öppna ny text-note
    openNewTextNoteBtn.addEventListener("click", () => {
        textArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
        textArea.setAttribute("class", "text");
        initModal();
        hideModalObjects();
        showTextObjects();
        showObject(saveNewTextNoteBtn);
    });

    // öppna ny template-note
    openNewTemplateNoteBtn.addEventListener("click", () => {
        textArea.removeAttribute("class"); // rensar class-attributet så det alltid bara finns ett
        textArea.setAttribute("class", "template");
        userTitle.textContent = randomTextTemplate();
        initModal();
        hideModalObjects();
        showTemplateObjects();
        showObject(saveNewTemplateNoteBtn);
    });

    // öppna ny list-note
    openNewListNoteBtn.addEventListener("click", () => {
        initModal();
        hideModalObjects();
        showListObjects();
        showObject(saveNewListNoteBtn);
    });

    //function to add title chosen by user. Triggered when enter is released.
    inputTitleBox.addEventListener("keyup", (e) => { addTitleToNote(e) });

    //Event for user to add list items//
    inputItemBox.addEventListener("keyup", (e) => { addListItemToList(e) });

    //Spara ny text-note
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

    // spara ny Template-note
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

    // spara ny list-note
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

    // spara redigerad text-note
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

    // Spara redigerad template-note
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

    // spara redigerade list-note
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

    // klicka utanför inre modal för att stänga
    modalBg.addEventListener("click", closeModal);

    // tömmer innehåll i titel- och textfält 
    resetNoteButton.addEventListener("click", resetNote);

    // login-knappen 
    loginButton.addEventListener("click", () => {
        loginFunc();
        fillNoteArray();

        filterByUser();
        if (userNotes.length != 0) {
            savedNotesMessage.textContent = currentUser + "'s saved notes";
        }

        resetNote();
        clearTitle(userTitle);
        showAllStoredNotes();
    });

    // raderar alla notes
    deleteBtn.addEventListener("click", deleteAllNotes);
}

window.addEventListener('DOMContentLoaded', (event) => {
    init();
});
