
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
/*     displayAllBooks() */
  })

function Book(title, author, pages, read, url){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.url = url
    myLibrary.push(`${this.title}, ${this.author}, ${this.pages}, ${this.read}, ${this.url}`)
    return
}

function addBookToLibrary(array){
    let newBook = new Book(array[0], array[1], array[2], array[3], array[4])

    return
}

    function displayAllBooks(){
    for (i=0; i < myLibrary.length; i++){
    let id = myLibrary[i].toString().split(',')


    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.setAttribute('id', i)
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
    newP1.textContent = `${id[0]}`
    const newP2 = document.createElement('p')
    newP2.classList.add('author')
    newP2.textContent = `${id[1]}`
    const newP3 = document.createElement('p')
    newP3.classList.add('pages')
    newP3.textContent = `${id[2]}`
    const newP4 = document.createElement('p')
    newP4.classList.add('read')
    newP4.textContent = `${id[3]}`
    const newPicture = document.createElement('div')
    newPicture.classList.add('picture')
    newPicture.style.backgroundImage = `url(${id[4]})`

    const newButton = document.createElement('button')
    newButton.setAttribute('id', i)
    newButton.textContent = 'Delete'
    newButton.addEventListener('click', () =>{
    display.replaceChildren()
    const x = myLibrary.splice(newButton.id, 1);
    displayAllBooks()
          return
        
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
    newCard.appendChild(newButton)
    display.appendChild(newCard)


    }
}

const newBook1 = new Book('The Hobbit', 'J.R.R. Tolkien', '310', 'No', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/TheHobbit_FirstEdition.jpg/220px-TheHobbit_FirstEdition.jpg' )
const newBook2 = new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', '607', 'Yes', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/220px-Harry_Potter_and_the_Deathly_Hallows.jpg')
const newBook3 = new Book('Dracula', 'Bram Stoker', '418', 'No', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dracula_1st_ed_cover_reproduction.jpg/220px-Dracula_1st_ed_cover_reproduction.jpg')
const newBook4 = new Book('Of Mice and Men', 'John Steinbeck', '107', 'Yes', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg/220px-Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg')
const newBook5 = new Book('Lord of the Flies', 'William Golding', '224', 'No', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/LordOfTheFliesBookCover.jpg/220px-LordOfTheFliesBookCover.jpg')
displayAllBooks()