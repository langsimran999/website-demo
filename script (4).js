// Example cart items
let cart = [
    { id: 1, name: "Wireless Mouse", price: 25.99, quantity: 1 },
    { id: 2, name: "USB-C Cable", price: 12.49, quantity: 2 },
    { id: 3, name: "Notebook", price: 5.99, quantity: 3 }
];

function renderCart() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} ($${item.price.toFixed(2)})</span>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartList.appendChild(li);
    });
    updateTotal();
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1;
        renderCart();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // You can add more validation or submission logic here
    document.getElementById('orderSuccess').style.display = 'block';
    setTimeout(() => {
        document.getElementById('orderSuccess').style.display = 'none';
        this.reset();
    }, 3000);
    // Optionally, clear cart
    cart = [];
    renderCart();
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
});

window.onload = renderCart;