// script.js

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    // Check if product already exists in cart
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart.`);
    updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').innerText = total.toFixed(2);

    let cartDiv = document.getElementById('cart');
    if (cartDiv) {
        cartDiv.innerHTML = '';
        cart.forEach(item => {
            let div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <p>${item.name} x ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartDiv.appendChild(div);
        });
    }
}

// Function to initialize the cart page
function initializeCart() {
    updateCartTotal();
}

// Function to checkout
function checkout() {
    window.location.href = 'checkout.html';
}

// Function to handle the checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let payment = document.getElementById('payment').value;

    // Process the order (this is a placeholder, actual implementation will depend on your backend)
    alert(`Thank you for your order, ${name}! Your order has been placed successfully.`);

    // Clear the cart
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// Initialize cart or checkout form on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart')) {
        initializeCart();
    }
    if (document.getElementById('checkout-form')) {
        document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
    }
});