window.onload = function() {
  document.addEventListener('click', documentActions);
  getProducts(document.querySelector('.top-products-section__button'));

  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains('top-products-section__button')) {
      getProducts(targetElement);
      e.preventDefault();
    }
  }
}

// Load more products
async function getProducts(button) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold');
    const file = 'json/products.json';
    let response = await fetch(file, {
      method: "GET"
    });
    if (response.ok) {
      let result = await response.json();
      loadProducts(result);
      button.classList.remove('_hold');
    } else {
      alert('Error');
    }
  }
}

function getLastId() {
  const elements = document.querySelectorAll(".top-products__card"),
      length = elements.length - 1,
      lastElement = elements[length];

  return +lastElement.getAttribute('data-pid') + 1;
}

function getIndex(data, lastId) {
  let lastIndex = null;
  let arrLength = data.products.length - 4;
  if (lastId > data.products[arrLength].id) {
    document.getElementById('moreButton').remove();
    return false;
  }
  data.products.forEach((item, index) => {
    if (item.id === lastId) {
      lastIndex = index;
    }
  })

  return lastIndex;
}

function loadProducts(data) {
  const productsItems = document.querySelector('.top-products-section__cards');
  let productsRender;
  if (document.querySelector('.top-products__card')) {
    const lastId = getLastId(),
          index = getIndex(data, lastId);
          productsRender = data.products.splice(index, 3);

    if (index === null) {
      document.getElementById('moreButton').remove();
    }
  } else {
    productsRender = data.products.splice(0, 9);
  }

  productsRender.forEach(item => {
    const productId = item.id,
          productImage = item.image,
          productTitle = item.title,
          productPrice = item.cost,
          productHoverImage = item.hoverImage;

    let productTemplateStart = `<div class="top-products__card" data-pid="${productId}" onmouseout="querySelector('img').src='./img/top-products/${productImage}'" onmouseover="querySelector('img').src='./img/top-products/${productHoverImage}'">`;
    let productTemplateEnd = `</div>`;

    let productTemplateImage = `
      <div class="card__image">
        <img src="./img/top-products/${productImage}" alt="${productTitle}">
      </div>
    `;

    let productTemplateContent = `
      <div class="card__content">
        <span class="good__name">${productTitle}</span>
        <div class="good__rating">
          <img src="./img/icons/star-golden.svg" alt="A golden star">
          <img src="./img/icons/star-golden.svg" alt="A golden star">
          <img src="./img/icons/star-golden.svg" alt="A golden star">
          <img src="./img/icons/star-golden.svg" alt="A golden star">
          <img src="./img/icons/star-silver.svg" alt="A silver star">
        </div>
        <span class="good__price">${productPrice}$</span>
      </div>
    `;

    let productTemplate = '';
    productTemplate += productTemplateStart;
    productTemplate += productTemplateImage;
    productTemplate += productTemplateContent;
    productTemplate += productTemplateEnd;

    productsItems.insertAdjacentHTML('beforeend', productTemplate);
  });
}