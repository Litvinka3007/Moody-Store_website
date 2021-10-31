window.onload = function () {
  document.addEventListener('click', documentActions);

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
      // button.remove();
    } else {
      alert('Error');
    }
  }
}

function loadProducts(data) {
  const productsItems = document.querySelector('.top-products-section__cards');

  data.products.forEach(item => {
    const productId = item.id;
    const productImage = item.image;
    const productTitle = item.title;
    const productPrice = item.cost;
    const productHoverImage = item.hoverImage;

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