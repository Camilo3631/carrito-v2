// Función para agregar productos al carrito
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productToAdd = products.find(product => product.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}

// Función para inicializar la página de productos
function initProducts() {
    const products = [
        { id: 1, name: 'Producto 1', price: 10.00 },
        { id: 2, name: 'Producto 2', price: 20.00 },
        { id: 3, name: 'Producto 3', price: 30.00 },
    ];
    localStorage.setItem('products', JSON.stringify(products));

    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <span>${product.name}</span>
            <span class="price">${product.price.toFixed(2)} €</span> <!-- Agregar símbolo de euro aquí -->
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', initProducts);
