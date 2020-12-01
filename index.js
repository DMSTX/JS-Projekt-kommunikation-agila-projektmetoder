// när knappen trycks 
// skapas en ny anteckning 
// och det öppnas en textruta 
// att skriva anteckningen i. 


let emptyNoteButton = document.createElement("button"); // skapar ett nytt button-element
emptyNoteButton.setAttribute("id", "emptyNoteButton"); // ger det nya button-elementet id="emptyNoteButton"
emptyNoteButton.textContent = "New empty note"; // sätter knappens text till New empty note

let saveButton = document.createElement("button"); // skapar ett nytt button-element
saveButton.setAttribute("id", "saveButton"); // ger detta nya button-element id="saveButton"
saveButton.style.display = "none"; // ger den visibility: none, så att den är osynlig
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
    emptyNoteButton.style.display = "none";
}

/**
 * Visar Save-knappen
 */
function showSaveButton() {
    saveButton.style.display = "block";
}

emptyNoteButton.addEventListener("click", () => { // lägger till en eventlistener på New note-knappen
    hideNewEmptyNoteButton();  // dessa tre funktioner körs vid klick: dölj new note-knappen, öppna textarea, visa save-knappen
    openTextArea(); 
    showSaveButton(); });