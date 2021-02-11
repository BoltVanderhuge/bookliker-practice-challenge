document.addEventListener("DOMContentLoaded", function() {
const url = "http://localhost:3000/books"
const list = document.querySelector("ul#list")
const showPanel = document.querySelector("#show-panel")
let bookLikers = []

fetchAllBooks()

function fetchAllBooks(){
     fetch(url)
    .then(res => res.json())
    .then(allBooks => renderAllBooks(allBooks))
    
}

function fetchABook(e){
    fetch(`${url}/${e}`)
    .then(res => res.json())
    .then(book => renderABook(book))
    
}



function renderAllBooks(allBooks){
    allBooks.forEach(book => {
        const li = document.createElement("li")
        li.dataset.id = book.id
        li.innerText = book.title
        li.className = "book-title"
        list.append(li)
    });
}


function renderABook(book){
    bookLikers = []
    showPanel.innerHTML = ""
    const id = book.id
    const title = book.title
    const subtitle = book.subtitle
    const description = book.description
    const author = book.author
    const img = book.img_url
    const users = book.users
    
    
    const image = document.createElement('img')
    image.src = img
    image.alt = title
    
    const h3 = document.createElement('h3')
    h3.innerHTML = `
    <ul>
    <ul> ${title} </ul>
    <ul> ${subtitle} </ul>
        <ul> ${author} </ul>
        </ul>`
        const p = document.createElement('p')
        p.innerHTML = `${description}`
        
        showPanel.dataset.id = id
        showPanel.append(image, h3, p)
        users.forEach(user =>{
            bookLikers.push(user)
            const li = document.createElement('li')
            li.className = "stupid-list"
            li.innerText = user.username
            li.dataset.id = user.id
            showPanel.append(li)
        })
  const button = document.createElement("button")
  button.type = "button"
  button.innerText = "Like"
  button.className = "like-button"
  button.dataset.id = id
  showPanel.append(button)

}

list.addEventListener("click", handleClick)
showPanel.addEventListener("click", handleClick)

function handleClick(e){
    if(e.target.className === 'book-title'){
        fetchABook(e.target.dataset.id)
    }  else if (e.target.className === 'like-button'){
        const currentUser = {
            "id": 1,
            "username": "pouros"
        }
        bookLikers.push(currentUser)
        addLikedUser(e.target.dataset.id)
    }  else if (e.target.className === 'dislike-button'){
        e.target.className = 'like-button'
        e.target.innerText = "like"
        const currentUser = {
            "id": 1,
            "username": "pouros"
        }
        bookLikers = bookLikers.filter(user => user.id !== 1)
        console.log(bookLikers)
        addLikedUser(e.target.dataset.id)

    }
}


function addLikedUser(id){
    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({users: bookLikers})
    })
    .then(res => res.json())
    .then(book => renderABook(book))
    setTimeout(changeLike, 1000)
    
}

function changeLike(){
    const likeBtn = document.querySelector(".like-button")
    likeBtn.className = 'dislike-button'
    likeBtn.innerText = "unlike"
}


});
