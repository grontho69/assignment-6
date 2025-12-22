

const categoryContainer = document.getElementById('categoryContainer')

const plantContainer = document.getElementById('plantContainer')
const loadcategory = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories
      showCatergory(categories)
      
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCatergory = (categories) => {
  categories.forEach(cat => {
      categoryContainer.innerHTML+=`<li id="${cat.id}" class="px-4 py-2 rounded cursor-pointer hover:bg-green-200  text-black ">${cat.category_name}</li>`
  })
  categoryContainer.addEventListener('click', (e) => {const allLi = document.querySelectorAll('li')
    allLi.forEach(li => {
      li.classList.remove('bg-green-800'),
          li.classList.remove('text-white')
})


    if ((e.target.localName === 'li')) {
      
      e.target.classList.add('bg-green-800'),
        e.target.classList.add('text-white')
      loadPlantByCategory(e.target.id)
    }
  })
}


const loadPlantByCategory = (categoryId) => {
  console.log(categoryId)
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
     
      showPlantsByCategory(data.plants)


    })
    .catch(err => {
    console.log(err)
  })
}

const showPlantsByCategory = (plants) => {
  console.log(plants)
  plantContainer.innerHTML=""
  plants.forEach(plants => {
    plantContainer.innerHTML += `
     <div class="card bg-base-100 w-96 shadow-md rounded-xl">
            
            <figure class="px-6 pt-6">
              <img src=${plants.image} alt="Mango Tree" class="rounded-xl h-48 w-full object-cover" />
            </figure>

            
            <div class="card-body p-6 text-left">
              
              <h2 class="text-xl font-semibold">${plants.name}</h2>

              
              <p class="text-sm text-gray-500">
                ${plants.description}
              </p>

              
              <div class="flex items-center justify-between mt-3">
                <span class="badge badge-success badge-outline">
                  ${plants.category}
                </span>
                <span class="text-lg font-bold">${plants.price}</span>
              </div>

             
              <div class="mt-4">
                <button class="btn btn-success w-full rounded-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
    `
  })
}


loadcategory()