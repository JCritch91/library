
const display = document.querySelector('.displayContainer')
const newBookButton = document.querySelector('.newBook')
const newBookDialog = document.getElementById("newBookDialog")
const editBookDialog = document.getElementById('editBookDialog')
const closeButton = newBookDialog.querySelector('#closeButton')
const newBookSubmBtn = newBookDialog.querySelector('.submit')
const editBookSubmitBtn = editBookDialog.querySelector('.update')
const form = document.querySelector('.new')
const form2 = document.querySelector('.edit')
const inputOne = form.querySelector('.bookInput1')
const inputTwo = form.querySelector('.bookInput2')
const inputThree = form.querySelector('.bookInput3')
const inputFour = form.querySelector('.bookInput4')
const inputFive = form.querySelector('.bookInput5')
const inputSix = form2.querySelector('#bookInput6')
const inputSeven = document.getElementById('bookInput7')
const inputEight = document.getElementById('bookInput8')
const inputNine = document.getElementById('bookInput9')
const inputTen = document.getElementById('bookInput10')

const myLibrary =[]

function populateLibrary(){
    let book
book = new Book('The Hobbit', 'J.R.R. Tolkien', '310', false, 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/TheHobbit_FirstEdition.jpg/220px-TheHobbit_FirstEdition.jpg' )
myLibrary.push(book)
book = new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', '607', true, 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/220px-Harry_Potter_and_the_Deathly_Hallows.jpg')
myLibrary.push(book)
book = new Book('Dracula', 'Bram Stoker', '418', false, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dracula_1st_ed_cover_reproduction.jpg/220px-Dracula_1st_ed_cover_reproduction.jpg')
myLibrary.push(book)
book = new Book('Of Mice and Men', 'John Steinbeck', '107', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg/220px-Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg')
myLibrary.push(book)
book = new Book('Lord of the Flies', 'William Golding', '224', false, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/LordOfTheFliesBookCover.jpg/220px-LordOfTheFliesBookCover.jpg')

}



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
    addBookToLibrary()
    event.preventDefault()
    newBookDialog.close();
    display.replaceChildren()
    displayAllBooks();
  })

  editBookSubmitBtn.addEventListener('click', (event) =>{
    let myArray = []

    this.title = inputSix.value
    this.author = inputSeven.value
    this.pages = inputEight.value
    this.url = inputTen.value
    this.read = inputNine.checked
    myArray.push(`${this.title}, ${this.author}, ${this.pages}, ${this.read}, ${this.url}`)
    myLibrary.splice(event.id,1,myArray)

    event.preventDefault()
    editBookDialog.close()
    display.replaceChildren()
    displayAllBooks();
  })

function Book(title, author, pages, read, url){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.url = url
    this.isReadMessage = function () {
        if (this.read){
            return "Has been read"
        } else {
            return "Has not been read"
        }
    }
}


function addBookToLibrary(){
    let title = inputOne.value
    let author = inputTwo.value
    let pages = inputThree.value
    let read = inputFour.checked
    let url = inputFive.value
    let book = new Book(title, author, pages, read, url)
    myLibrary.push(book)
}

    function displayAllBooks(){
        myLibrary.forEach((book, index) =>{


    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.setAttribute('id', index)
    const newBottomContent = document.createElement('div')
    newBottomContent.classList.add('bottomContent')
    const line1 = document.createElement('div')
    const line2 = document.createElement('div')
    const line3 = document.createElement('div')
    const line4 = document.createElement('div')
    line1.classList.add('line')
    line2.classList.add('line')
    line3.classList.add('line')
    line4.classList.add('line')

    const newT1 = document.createElement('p')
    newT1.classList.add('bookTitle')
    newT1.textContent ='Title:'
    const newT2 = document.createElement('p')
    newT2.textContent = 'Author:'
    newT2.classList.add('heading')
    const newT3 = document.createElement('p')
    newT3.textContent = 'Pages:'
    newT3.classList.add('heading')
    const newT4 = document.createElement('p')
    newT4.textContent = 'Read:'
    newT4.classList.add('heading')

    const newP1 = document.createElement('p')
    newP1.classList.add('cardTitle')
    newP1.textContent = book.title
    const newP2 = document.createElement('p')
    newP2.classList.add('author')
    newP2.textContent = book.author
    const newP3 = document.createElement('p')
    newP3.classList.add('pages')
    newP3.textContent = book.pages
    const newP4 = document.createElement('input')
    newP4.classList.add('read')
    newP4.type = 'checkbox'
    newP4.setAttribute('id', `read${index}`)
    newP4.setAttribute('name', 'read')
    newP4.checked = myLibrary[index].read

    
    const newPicture = document.createElement('div')
    newPicture.classList.add('picture')
    newPicture.style.backgroundImage = `url(${book.url})`

    const newButton = document.createElement('button')
    newButton.setAttribute('id', index)
    newButton.textContent = 'Delete'
    newButton.addEventListener('click', () =>{
    display.replaceChildren()
    const x = myLibrary.splice(newButton.id, 1);
    displayAllBooks() 
    })

    const newButton2 = document.createElement('button')
    newButton2.setAttribute('id', index)
    const cardButtonContainer = document.createElement('div')
    cardButtonContainer.classList.add('cardButtonContainer')
    newButton2.textContent = 'Edit'
    newButton2.addEventListener('click', ()=>{
        editBook(newButton2.id)
    })

    line1.appendChild(newT1)
    line2.appendChild(newT2)
    line3.appendChild(newT3)
    line4.appendChild(newT4)

    line1.appendChild(newP1)
    line2.appendChild(newP2) 
    line3.appendChild(newP3)
    line4.appendChild(newP4)

    newBottomContent.appendChild(line1)
    newBottomContent.appendChild(line2)
    newBottomContent.appendChild(line3)
    newBottomContent.appendChild(line4)

    newCard.appendChild(newPicture)
    newCard.appendChild(newBottomContent)
    cardButtonContainer.appendChild(newButton)
    cardButtonContainer.appendChild(newButton2)
    newCard.appendChild(cardButtonContainer)
    display.appendChild(newCard)


})
}

function editBook(i){
    editBookDialog.showModal()
    let myArray = myLibrary[i].toString().split(',')
    inputSix.value = myArray[0]
    inputSeven.value = myArray[1]
    inputEight.value = myArray[2]
    if (myArray[3] == 'yes'){    
        inputNine.checked = true
    } else{
        inputNine.checked = false
    }

    inputTen.value = myArray[4]
}


populateLibrary()
displayAllBooks()