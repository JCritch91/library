
const display = document.querySelector('.displayContainer')
const newBookButton = document.querySelector('.newBook')
const newBookDialog = document.getElementById("newBookDialog")
const closeButton = newBookDialog.querySelector('#closeButton')
const newBookSubmBtn = newBookDialog.querySelector('.submit')
const form = document.querySelector('.new')
const inputOne = form.querySelector('.bookInput1')
const inputTwo = form.querySelector('.bookInput2')
const inputThree = form.querySelector('.bookInput3')
const inputFour = form.querySelector('.bookInput4')
const inputFive = form.querySelector('.bookInput5')

const myLibrary =[]

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






  


  function editBookInLibrary(){
    let book
    let i = newBookSubmBtn.id
    let title = inputOne.value
    let author = inputTwo.value
    let pages = inputThree.value
    let read = inputFour.checked
    let url = inputFive.value
    book = new Book(title, author, pages, read, url)
    myLibrary.splice(i,1,book)
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

        let cardDiv, picDiv, p, input

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

        const newP1 = document.createElement('p')
        newP1.classList.add('cardTitle')
        newP1.textContent = book.title
        const newP2 = document.createElement('p')
        newP2.classList.add('author')
        newP2.textContent = book.author
        const newP3 = document.createElement('p')
        newP3.classList.add('pages')
        newP3.textContent = `${book.pages} Pages`
        const newP4 = document.createElement('input')
        newP4.classList.add('read')
        newP4.type = 'checkbox'
        newP4.setAttribute('id', `read${index}`)
        newP4.setAttribute('name', 'read')
        newP4.checked = myLibrary[index].read
        newP4.addEventListener('click', () =>{
            myLibrary[index].read = newP4.checked
    })

    
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
    newBookDialog.showModal()
    let book = myLibrary[i]
    inputOne.value = book.title
    inputTwo.value = book.author
    inputThree.value = book.pages
    inputFour.checked = book.read
    inputFive.value = book.url
    newBookSubmBtn.id = i
}

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
  })    

closeButton.addEventListener("click", (event) => {
    Array.from(form.elements).forEach((input) =>{
        event.preventDefault()
        input.value = ''
    })
    newBookSubmBtn.id = ''
    newBookDialog.close();
  })

newBookSubmBtn.addEventListener('click', (event) =>{
    if (newBookSubmBtn.id == ''){
    addBookToLibrary()
    } else {
    editBookInLibrary()
    }
    event.preventDefault()
    newBookDialog.close();
    display.replaceChildren()
    displayAllBooks();
  })

populateLibrary()
displayAllBooks()

