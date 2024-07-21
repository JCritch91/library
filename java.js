
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

function displayAllBooks(){
    myLibrary.forEach((book, index)=>{
        let cardDiv, div, p, input, button

        cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        cardDiv.setAttribute('id', index)

        div = document.createElement('div')
        div.classList.add('picture')
        div.style.backgroundImage = `url(${book.url})`
        cardDiv.appendChild(div)

        p = document.createElement('p')
        p.classList.add('cardTitle')
        p.textContent = book.title
        cardDiv.appendChild(p)

        p = document.createElement('p')
        p.classList.add('author')
        p.textContent = book.author
        cardDiv.appendChild(p)

        p = document.createElement('p')
        p.classList.add('pages')
        p.textContent = `${book.pages} Pages`
        cardDiv.appendChild(p)

        input = document.createElement('input')
        input.classList.add('read')
        input.type = 'checkbox'
        input.setAttribute('id', `read${index}`)
        input.setAttribute('name', 'read')
        input.checked = myLibrary[index].read
        input.addEventListener('click', () =>{
            myLibrary[index].read = input.checked
        })
        cardDiv.appendChild(input)

        div = document.createElement('div')
        div.classList.add('cardButtonContainer')
        button = document.createElement('button')
        button.setAttribute('id', index)
        button.textContent = 'Delete'
        button.addEventListener('click', ()=>{
            display.replaceChildren()
            const x = myLibrary.splice(button.id, 1);
            displayAllBooks() 
        })
        div.appendChild(button)

        button = document.createElement('button')
        button.setAttribute('id', index)
        button.textContent = 'Edit'
        button.addEventListener('click', ()=>{
            editBook(button.id)
        })
        div.appendChild(button)
        cardDiv.appendChild(div)
        display.appendChild(cardDiv)
    })
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

