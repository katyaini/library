
const myLibrary = [];
const title = document.querySelector("#title");
const author  = document.querySelector("#author");
const pages =document.querySelector("#pages");
const read = document.querySelector("#pages_read");
const modal  = document.getElementById("modal_form");
const dialog = document.getElementById("form_dialog");
const cancel = document.getElementById("cancel");
const inputForm = document.getElementById("book_form");

//BOOK FUNCTIONS

//BOOK OBJECT CONSTRUCTOR FUNCTION
function Books(title,author,pages,isRead,bookID){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isRead = isRead;
    this.bookID = bookID;
    
}
let bookID = 0;
function getBookFromInput(e){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#status").value;
    bookId=bookID++;
    return new Books(title,author,pages,isRead,bookID);
}

function addBookToLibrary(book){
   myLibrary.push(book);
}
   
function addBook(){
    addBookToLibrary(getBookFromInput());
    displayBook(myLibrary);
}

inputForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addBook();
});

// INPUT FORM POP-UP TO ADD BOOKS
modal.addEventListener("click",(e)=>{
    dialog.showModal();
});

cancel.addEventListener("click",(e)=>{
    dialog.close();
});

function clearField(){
    document.getElementById("book_form").reset();  
};

let tables = document.getElementById("display_book");

function clearTable(table){
    while(table.lastChild){
        table.removeChild(table.lastChild);
    }
}

// FUNCTION TO DISPLAY BOOK IN TABLE
function displayBook(myLibrary){
    clearTable(tables);   
    for(let book in myLibrary){
        let row = document.createElement("tr");
        tables.appendChild(row);

    for(let i = 0; i < 5; i++){
        let cell = document.createElement("td");
        row.appendChild(cell);
        switch(i){
            case 0:
                cell.textContent = myLibrary[book].title;
                break;
            case 1:
                cell.textContent = myLibrary[book].author;
                break;
            case 2:
                cell.textContent = myLibrary[book].pages;
                break;
            
            case 3 :
                let delIcon = document.createElement("Button");
                delIcon.innerHTML="delete";
                delIcon.id=myLibrary[book].bookID;
                cell.appendChild(delIcon);
               setRemove(delIcon);
               break;
            case 4 :
            let statusIcon = document.createElement("Button");
            statusIcon.innerHTML=  myLibrary[book].isRead;
            statusIcon.id=myLibrary[book].bookID;
            statusIcon.id = myLibrary[book].bookID
            cell.appendChild(statusIcon);
            changeStatus(statusIcon);
        }
    }}}

// FUNCTION TO DELETE BOOK FROM TABLE AND LIBRARY
    function setRemove(icon){
        icon.addEventListener("click",()=>{
        
        let idNum = parseInt(icon.id);
        for (book in myLibrary) {

            if(myLibrary[book].bookID === idNum){
            let bookIndex = myLibrary.indexOf(myLibrary[book]);
            myLibrary.splice(bookIndex,1);
            icon.parentElement.parentElement.remove();
            }
        }      
    })
};

//FUNCTION TO CHANGE READ/UNREAD STATUS
function changeStatus(icon){
    
    icon.addEventListener("click",()=>{
    
    let idNumber = parseInt(icon.id);
    for (book in myLibrary) {

        if(myLibrary[book].bookID === idNumber){
            if(myLibrary[book].isRead === "Read"){
                myLibrary[book].isRead = "Unread";
                icon.innerHTML="Unread";
            }
            else{
                myLibrary[book].isRead = "Read";
                icon.innerHTML="Read";
            }
        }
    }
})
};
