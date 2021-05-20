let bookCollection = []
function renderBooks(books){
    // if (!whereTo) whereTo = "library-content"
    const parent = document.getElementById("library-content")
   
  

    parent.innerHTML = books.map(book => `<div class="card col-12 col-md-4 col-lg-2 px-0 my-3" >
            <img class="card-img-top img-fluid" src="${book.img}" alt="Card image cap">
            <div class="card-body" style ="height:20px;">
            <button type="button" onclick="HideCard()" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            <p class="card-title small">${book.title}</p>
            <p class="card-text">${book.price} $</p>
            <button type="button" id="cart-btn" class="btn btn-secondary">${"Add to cart"}</button>
            </div>
        </div>`)
        .join("")

        let AddCartBtn = document.querySelectorAll('#cart-btn')
        let parentCartList = document.getElementById('cart-list')
        let parentTable = document.querySelector('.table')
        parentTable.style.visibility = 'hidden'
        AddCartBtn.forEach((cartbtn, i)=>{
            cartbtn.addEventListener('click', (e)=>{
                parentTable.style.visibility = 'visible' 
                /* alert('click') */
                let currentBookTitle = e.currentTarget.closest('.card').querySelector('p:first-of-type').innerText
                let currentBookPrice = e.currentTarget.closest('.card').querySelector('p:last-of-type').innerText
                e.currentTarget.closest('.card').querySelector('#cart-btn').innerText = "Added to Card"
                 e.currentTarget.closest('.card').querySelector('.card-text').innerText = 'Enjoy Deal'
                 
                 let currentImg = e.currentTarget.closest('.card').querySelector('img').src

               parentTable.innerHTML += `<tbody>
               <tr>
                 <th scope="row">${i}</th>
                 <td><img class="card-img-top" style="height:40px; width:40px" src="${currentImg}" alt="Card image cap"></td>
                 <td>${currentBookTitle}</td>
                 <td>${currentBookPrice}</td>
                 <td><button onclick=" deleteFunc()" type="button" id="cart-btn" class="btn btn-secondary">${"Remove"}</button></td>
               </tr>
             </tbody>`
        }) 
    })

}

const deleteFunc = function(){
    let deleteButton = document.querySelectorAll('#cart-btn')
    deleteButton.forEach((delbtn => {
        delbtn.addEventListener('click', (e)=>{
           e.currentTarget.closest('tr').remove()
           /* setTimeout(() => {removeRow.remove();}, 500);  */
        })
    }))
}

const deleteAll = function(){
    let deleteAllButton = document.querySelector('#cart-del-all')
    let allRow = deleteAllButton.closest('table').querySelectorAll('tbody')
    allRow.forEach(row =>{
        row.remove()
    })
}

function HideCard(){
    const close = document.querySelectorAll('.close')

    close.forEach((hide) =>{
        hide.addEventListener('click', (e)=>{
            e.target.closest('.card').remove()
        })
    })  
}

window.onload = async function () {
   
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(result => result.json()) 
        .then(books => { 
            bookCollection = books          
            renderBooks(books) 
            console.log(bookCollection); 
        }) 
    }

     function search(){
        let searchButton = document.querySelector('#searchSection button')
        console.log(searchButton);
        let searchBar = document.querySelector("#searchSection input") 
        console.log(searchBar)        
            let searchQuery = searchBar.value 
            let booksToLoad = bookCollection.filter(book => book.title.includes(searchQuery))
            renderBooks(booksToLoad)
        
    }
 
    
   