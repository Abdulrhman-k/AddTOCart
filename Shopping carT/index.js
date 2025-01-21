  const iconCart = document.querySelector('.iconCart');
  const cart = document.querySelector('.Cart');
  const container = document.querySelector('.container');
  const close = document.querySelector('.close');
  
  iconCart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
      cart.style.right = '0px';
      container.style.transform = 'translateX(-400px)';
    } else {
      cart.style.right = '-100%';
      container.style.transform = 'translateX(0px)';
    }
  });
  
  close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0px)';
  });
  
  let products = null;
  fetch('Products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      addDataToHTML();
    })
    .catch(error => console.error('Error fetching products:', error));
  
  function addDataToHTML() {
    const ListProductsHTML = document.querySelector('.listProduct');
    ListProductsHTML.innerHTML = '';
  
    if (products != null) {
      products.forEach(product => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `<img src="${product.image}">
         <h2>${product.name}</h2>
         <div class="price">$${product.price}</div>
         <button onClick="addToCart(${product.id})">Add To Cart</button>`;
        ListProductsHTML.appendChild(newProduct);
      });
    }
  }
  
  let ListCart = JSON.parse(localStorage.getItem('ListCart')) || {};
  
  function addToCart($idProduct) {
    const productCopy = JSON.parse(JSON.stringify(products));
    if (!ListCart[$idProduct]) {
      let DataProduct = productCopy.filter(
        product => product.id == $idProduct
      )[0];
      ListCart[$idProduct] = DataProduct;
      ListCart[$idProduct].quantity = 1;
    } else {
      ListCart[$idProduct].quantity++;
    }
    localStorage.setItem('ListCart', JSON.stringify(ListCart));
    addToCartToHTML();
  }
  
  function addToCartToHTML() {
    const ListCartHtml = document.querySelector('.listCart');
    ListCartHtml.innerHTML = '';
     
    const TotalHtml = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
  
    if (ListCart) {
      Object.values(ListCart).forEach(product => {
        const newCart = document.createElement("div");
        newCart.classList.add('item');
        newCart.innerHTML = 
        `<img src="${product.image}">
         <div class="content">
             <div class="name">${product.name}</div>
             <div class="price">${product.price}</div>
             <div class="quantity">
                 <button onClick="ChangeQuantity(${product.id}, '-')">-</button>
                 <span class="value">${product.quantity}</span>
                 <button onClick="ChangeQuantity(${product.id}, '+')">+</button>
             </div>
         </div>`;
        ListCartHtml.appendChild(newCart);
        totalQuantity += product.quantity;
      });
    }
    TotalHtml.innerText = totalQuantity;
  }
  
  function ChangeQuantity($idProduct, $type) {
    switch ($type) {
      case '+':
        ListCart[$idProduct].quantity++;
        break;
      case '-':
        ListCart[$idProduct].quantity--;
        if (ListCart[$idProduct].quantity <= 0) {
          delete ListCart[$idProduct];
        }
        break;
      default:
        break;
    }
    localStorage.setItem('ListCart', JSON.stringify(ListCart));
    addToCartToHTML();
  }
  
  addToCartToHTML();
  function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = 'home.html'; 
  }
  
  window.onload = function () {
    const savedEmail = localStorage.getItem('email');
    if (!savedEmail) {
      window.location.href = 'home.html';
    }
  };
  