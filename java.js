
const display = document.querySelector('.displayContainer')
const newBookButton = document.querySelector('.newBook')
const newBookDialog = document.getElementById("newBookDialog")
const closeButton = newBookDialog.querySelector('#closeButton')
const newBookSubmBtn = newBookDialog.querySelector('.submit')
const myLibrary =[]

const form = document.querySelector('form')

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
  })


  
closeButton.addEventListener("click", (event) => {
    Array.from(form.elements).forEach((input) =>{
        event.preventDefault()
        input.value = ''
    })
    newBookDialog.close();
  })

newBookSubmBtn.addEventListener('click', (event) =>{
    let myArray = []
    Array.from(form.elements).forEach((input) =>{
        myArray.push(input.value)
        input.value ='' 
    })
    addBookToLibrary(myArray)
    event.preventDefault()
    newBookDialog.close();
    displayAllBooks()
  })

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    myLibrary.push(`${this.title}, ${this.author}, ${this.pages}, ${this.read}`)
    return
}

function addBookToLibrary(array){
    let newBook = new Book(array[0], array[1], array[2], array[3])
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    const newPicture = document.createElement('div')
    newPicture.classList.add('picture')
    const newP1 = document.createElement('p')
    newP1.classList.add('cardTitle')
    newP1.textContent = `Title: ${array[0]}`
    const newP2 = document.createElement('p')
    newP2.classList.add('author')
    newP2.textContent = `Author: ${array[1]}`
    const newP3 = document.createElement('p')
    newP3.classList.add('pages')
    newP3.textContent = `Pages: ${array[2]}`
    const newP4 = document.createElement('p')
    newP4.classList.add('read')
    newP4.textContent = `Read: ${array[3]}`
    newCard.appendChild(newPicture)
    newCard.appendChild(newP1)
    newCard.appendChild(newP2)
    newCard.appendChild(newP3)
    newCard.appendChild(newP4)
    display.appendChild(newCard)
    return
}

/* function displayAllBooks(){
    for (i=0; i < myLibrary.length; i++){
    let id = myLibrary[i].toString().split(',')
    let newLine = document.createElement('p')
    newLine.textContent = myLibrary[i]
    newLine.setAttribute('id', id[0])
    display.appendChild(newLine)
    }
}

 */


