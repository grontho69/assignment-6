
const categoryContainer = document.getElementById('categoryContainer');
const plantContainer = document.getElementById('plantContainer');
const spinner = document.getElementById('spinner');
const cartList = document.getElementById('cartList');
const totalEl = document.getElementById('total');
const detailsBox = document.getElementById('details-container')


let total = 0;


const showSpinner = () => spinner.classList.remove('hidden');
const hideSpinner = () => spinner.classList.add('hidden');


const loadcategory = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
      showCatergory(data.categories);
    })
    .catch(err => console.log(err));
};


const showCatergory = (categories) => {
  categoryContainer.innerHTML = "";

  
  categoryContainer.innerHTML += `
    <li id="all"
      class="px-4 py-2 rounded cursor-pointer bg-green-800 text-white">
      All Trees
    </li>
  `;

  categories.forEach(cat => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}"
        class="px-4 py-2 rounded cursor-pointer hover:bg-green-200">
        ${cat.category_name}
      </li>
    `;
  });

  categoryContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {

      const allLi = categoryContainer.querySelectorAll('li');
      allLi.forEach(li =>
        li.classList.remove('bg-green-800', 'text-white')
      );

      e.target.classList.add('bg-green-800', 'text-white');

      if (e.target.id === 'all') {
        loadAllPlants();
      } else {
        loadPlantByCategory(e.target.id);
      }
    }
  });
};


const loadAllPlants = () => {
  showSpinner();
  fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
      hideSpinner();
      showPlants(data.plants);
    })
    .catch(err => console.log(err));
};


const loadPlantByCategory = (id) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      hideSpinner();
      showPlants(data.plants);
    })
    .catch(err => console.log(err));
};


const showPlants = (plants) => {
  plantContainer.innerHTML = "";

  plants.forEach(plant => {
    plantContainer.innerHTML += `
      <div class="card bg-base-100 shadow-md">
        <figure class="px-6 pt-6">
          <img src="${plant.image}"
            class="h-40 w-full object-cover rounded" />
        </figure>

        <div class="card-body">
          <button class="font-bold text-green-700 cursor-pointer"
              onclick="loadPlantDetail(${plant.id})">
            ${plant.name}
          </button>

          <p class="text-sm text-gray-500">
            ${plant.description.slice(0, 80)}...
          </p>

          <div class="flex justify-between mt-2">
            <span class="badge badge-success badge-outline">
              ${plant.category}
            </span>
            <span class="font-bold">৳ ${plant.price}</span>
          </div>

          <button class="btn btn-success mt-3"
            onclick="addToCart('${plant.name}', ${plant.price})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
};

const addToCart = (name, price) => {
  total += price;
  totalEl.innerText = total;

  cartList.innerHTML += `
    <li class="flex justify-between items-center">
      ${name}
      <button onclick="removeItem(this, ${price})">❌</button>
    </li>
  `;
};

const removeItem = (el, price) => {
  total -= price;
  totalEl.innerText = total;
  el.parentElement.remove();
};

const loadPlantDetail = async (id) => {
  showSpinner()
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showPlantDetail(details.plants)
}

const showPlantDetail = (plant) => {
  hideSpinner()
  console.log(plant);
  detailsBox.innerHTML = `   <figure>
          <img src="${plant.image}" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            ${plant.name}
            <div class="badge badge-secondary">${plant.category}</div>
          </h2>
          <p>${plant.description}</p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">${plant.price}</div>
           
          </div>
        </div>`;
  document.getElementById('my_modal_3').showModal();
}




loadAllPlants();
loadcategory();
