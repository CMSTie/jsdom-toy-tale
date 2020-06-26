let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  


function fetchData (){
  fetch ('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => renderToys(data))
  }

  function renderToys(data){
    const values = Object.values(data)
    for (const value of values){
    const mainContainer = document.getElementById("toy-collection")
    const toyCard = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyImage = document.createElement("img")
    const toyLikes = document.createElement("p")
    const toyButton = document.createElement("button")
    const br = document.createElement('br')
    const hr = document.createElement('hr')

    toyImage.className = 'toy-avatar'
    toyButton.className = 'like-btn'
    toyCard.id = 'card'
    toyLikes.className = 'num-likes'
    toyCard.dataset.id = value.id
    
    toyName.innerHTML = value.name
    toyImage.src = value.image
    toyLikes.textContent = value.likes
    toyButton.innerText = 'Like'
    mainContainer.append(toyCard)
    
    toyCard.append(toyName, toyImage, toyLikes, toyButton, hr, br)
    }
  }
  
  

function addNewToy(){
document.addEventListener('submit', function(e){
  e.preventDefault()

  const form = document.querySelector('.add-toy-form')
  
  const name = form.elements.name.value

  const image = form.elements.image.value

  // const newToy = {
  //   name,
  //   image,
  //   likes: '0'
  // }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
      headers: 
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify({
              name: `${name}`,
              image: `${image}`,
              likes: 0
            })
          })
      form.reset()
      // fetchData()
})
}

function addLikes(){
  document.addEventListener('click', function(e){
    if (e.target.className === 'like-btn'){
        const toyId = e.target.parentNode.dataset.id
        let numLikes = e.target.parentNode.querySelector('.num-likes')
        
        numLikes.textContent = parseInt(numLikes.textContent) + 1
      console.log(numLikes)
    
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        'likes': `${numLikes.textContent}`
      })

    })
    .then(response => response.json())
    .then(console.log)
    .catch(error => {
      console.log(error)
    })
  }
  })
}
addNewToy()
addLikes()
fetchData()
});
