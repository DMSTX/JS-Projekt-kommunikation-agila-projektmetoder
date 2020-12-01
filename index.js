
//feature_list_note

/* create content to for the site using JS*/
let listTitle = document.createElement("h3"); //sub-heading//
listTitle.setAttribute("id", "listTitle");
listTitle.innerText = "Add your Title:";
document.getElementById("container").appendChild(listTitle);

let inputTitleBox = document.createElement("input"); //input field for user title//
inputTitleBox.setAttribute("id", "inputTitleBox");
inputTitleBox.setAttribute("type", "text");
inputTitleBox.setAttribute("placeholder", "Title");
document.getElementById("listTitle").appendChild(inputTitleBox);

let listHeading = document.createElement("h3"); //subheading//
listHeading.setAttribute("id", "listHeading");
listHeading.innerText = "Add your entry:";
document.getElementById("container").appendChild(listHeading);

let inputItemBox = document.createElement("input"); //input field for user list items
inputItemBox.setAttribute("id", "inputListBox");     
inputItemBox.setAttribute("type", "text");
inputItemBox.setAttribute("placeholder", "List Entry");
inputItemBox.attributes.required = "required"; //!oklart om denna gör något!//
document.getElementById("listHeading").appendChild(inputItemBox);

let listNote = document.createElement("ul"); //unordered list
listNote.setAttribute("class", "myList"); //om id, numereriskt som ökar för varje lista?
document.getElementById("secondContainer").appendChild(listNote);

//function to add title to variable. Triggered when enter is released. 
inputTitleBox.addEventListener("keyup", function (e) {
    let inputTitle = document.getElementById("inputTitleBox").value;
    if(e.which === 13 || e.key === 13){  //firefox .which, chrome .key//
        if(inputTitle.length == 0){
            alert("Wow, so much empty")
        }
        //console.log(inputTitle);//
    }
    return inputTitle;
});

//function for user to add list items//
inputItemBox.addEventListener("keyup", function(e) { 
    let listItem ="";

    if(e.which === 13 || e.key === 13){   //firefox .which, chrome .key//
        if(inputItemBox.value.length == 0){  //checks if input is empty
            alert("Wow, so much empty")
        }
        else {
            listItem = document.createElement("li"); 
            listItem.setAttribute("class", "myListItem");
            listItem.innerText = document.getElementById("inputListBox").value;
            document.getElementsByClassName("myList")[0].appendChild(listItem);

            inputItemBox.value = "";  //clears input field
        }    
    }    
});


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
