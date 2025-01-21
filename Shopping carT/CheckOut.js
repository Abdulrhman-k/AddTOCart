let listCart = JSON.parse(localStorage.getItem('ListCart')) || {};

// Function to retrieve cart data from local storage
function CheckCart() {
    if (listCart) {
        console.log('Cart data retrieved from local storage:', listCart); // Debugging log
    } else {
        console.log('No cart data found in local storage.'); // Debugging log
    }
}

// Function to display cart items on the Checkout Page
function displayCartOnCheckout() {
    const ListCartHtml = document.querySelector('.returnCart .list');
    const TotalQuantityHtml = document.querySelector('.totalQuantity');
    const TotalPriceHtml = document.querySelector('.totalPrice');

    if (!ListCartHtml || !TotalQuantityHtml || !TotalPriceHtml) {
        console.error('One or more elements are missing in the DOM');
        return;
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    // Clear existing cart items
    ListCartHtml.innerHTML = '';

    if (listCart) {
        Object.values(listCart).forEach(product => {
            const newCartItem = document.createElement('div');
            newCartItem.classList.add('item');
            newCartItem.innerHTML = `
                <img src="${product.image}">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}/1 Product</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">$${(product.price * product.quantity).toFixed(2)}</div>`;
            ListCartHtml.appendChild(newCartItem);

            totalQuantity += product.quantity;
            totalPrice += product.price * product.quantity;
        });
    }

    // Update total quantity and price
    TotalQuantityHtml.innerText = totalQuantity;
    TotalPriceHtml.innerText = `$${totalPrice.toFixed(2)}`;
}

// Initialize
CheckCart();
displayCartOnCheckout();
