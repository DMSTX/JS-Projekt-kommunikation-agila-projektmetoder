// när knappen trycks 
// skapas en ny anteckning 
// och det öppnas en textruta 
// att skriva anteckningen i. 


let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.setAttribute("display", "none"); // ger den visibility: none, så att den är osynlig
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
    console.log("nu är jag i hide");
    emptyNoteButton.setAttribute("display", "none");
}

/**
 * Visar Save-knappen
 */
function showSaveButton() {
    console.log("nu är jag i show save button");
    saveButton.removeAttribute("display", "none");
}
/**
 * Skapar ett nytt Empty Note-objekt
 */
function emptyNote() {
    
}


emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på knappen som kör openTextArea vid klick
    hideNewEmptyNoteButton(); 
    openTextArea(); 
    showSaveButton(); });

