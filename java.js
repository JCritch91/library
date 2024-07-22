
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
const titleErr = document.querySelector('.titleErr')
const authorErr = document.querySelector('.authorErr')
const pagesErr = document.querySelector('.pagesErr')
const pageNumErr = document.querySelector('.pageNumErr')
const urlErr = document.querySelector('.urlErr')

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

function validateForm(event){
    event.preventDefault()
    if (inputOne.value ==''){
        titleErr.style.display = 'block'
        inputOne.style.borderColor = 'red'
    } else {
        titleErr.style.display = 'none'
    }
    if (inputTwo.value ==''){
        authorErr.style.display = 'block'
        inputTwo.style.borderColor = 'red'
    } else {
        authorErr.style.display = 'none'
    }
    if (inputThree.value ==''){
        pagesErr.style.display = 'block'
        inputThree.style.borderColor = 'red'
    } else {
        pagesErr.style.display = 'none'
    }
    if (inputThree.value <=0){
        pageNumErr.style.display = 'block'
        inputFour.style.borderColor = 'red'
    } else {
        pageNumErr.style.display = 'none'
    }
    if (inputFive.value ==''){
        urlErr.style.display = 'block'
        inputFive.style.borderColor = 'red'
    } else {
        urlErr.style.display = 'none'
    }
    if (inputOne.value !=='' && inputTwo.value !=='' && inputThree.value !=='' && inputThree.value > 0 && inputFive.value !==''){
    if (newBookSubmBtn.id == ''){
        addBookToLibrary()
        newBookDialog.close();
        display.replaceChildren()
        displayAllBooks();
    } else {
        editBookInLibrary()
        newBookDialog.close();
        display.replaceChildren()
        displayAllBooks();
    }
  }
}

 function displayAllBooks(){
    myLibrary.forEach((book, index)=>{
        let cardDiv, div, picture, p, input, button, label

        cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        cardDiv.setAttribute('id', index)

        div = document.createElement('div')
        div.classList.add('picture')
        picture = document.createElement('img')
        picture.src = `${book.url}`
        div.appendChild(picture)
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

        label = document.createElement('label')
        input = document.createElement('input')
        input.type ='checkbox'
        input.setAttribute('id', `checkbox${index}`)
        label.setAttribute('for', `checkbox${index}`)
        label.classList.add('labelForCheckbox')
        input.classList.add('customCheckbox')
        input.checked = myLibrary[index].read
        input.addEventListener('click', () =>{
            myLibrary[index].read = input.checked
        })
        label.appendChild(input)
        cardDiv.appendChild(label)


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
    event.preventDefault()
    newBookDialog.close();
  })

newBookSubmBtn.addEventListener('click', (event) =>{
    validateForm(event)
})

newBookDialog.addEventListener('close',() =>{
    Array.from(form.elements).forEach((input)=>{
    input.style.border = '1px solid gray'
    })
    titleErr.style.display ='none'
    authorErr.style.display ='none'
    pagesErr.style.display ='none'
    pageNumErr.style.display='none'
    urlErr.style.display ='none'
    newBookSubmBtn.id = ''
    form.reset()
})

populateLibrary()
displayAllBooks()

