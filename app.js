//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete">X</a></td>
    `;

    list.appendChild(row);   
};

//Show alert
UI.prototype.showAlert = function(message,className){
    //Create div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Time out after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete books
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

//Event Listne for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === '') {
        //Error Alert
        ui.showAlert('Please fill in all the field','error');
    } else {
        //Add book to list
        ui.addBookToList(book);

        //Show sucess
        ui.showAlert('Book Added !', 'sucess');

        //Clear field
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listners for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    //Instantiate UI
    const ui = new UI();

    //Delete book
    ui.deleteBook(e.target);
    
    //Show alert
    ui.showAlert('Delete Sucess', 'sucess');

    e.preventDefault();
});