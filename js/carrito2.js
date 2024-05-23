// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Elimina todos los productos del carrito
    displayCart();
}

// Función para mostrar los productos en el carrito
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('btnPagar'); // Cambiado para usar el ID del botón de pago
    const clearCartButton = document.getElementById('btnEliminarSumar'); // Cambiado para usar el ID del botón de eliminar y sumar
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((product) => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <span>${product.name}</span>
            <span class="price">${product.price.toFixed(2)} €</span>
        `;
        cartItems.appendChild(item);
        total += product.price;
    });

    // Agregar el total al final de la lista de productos
    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = `Total: ${total.toFixed(2)} €`;
    cartItems.appendChild(totalElement);

    // Muestra los botones siempre que la función displayCart() esté definida
    checkoutButton.style.display = 'inline-block';
    clearCartButton.style.display = 'inline-block';
}

// Función para procesar el pago con Square
function checkout() {
    const paymentForm = new SqPaymentForm({
        applicationId: 'sandbox-sq0idb-pNZhZzX_fHDe44_rtOl5_A', // Reemplaza con tu ID de aplicación de prueba de Square
        apiVersion: '2021-06-16',
        paymentForm: {
            fields: {
                cardNumber: { elementId: 'card-number' },
                cvv: { elementId: 'cvv' },
                expirationDate: { elementId: 'expiration-date' },
                postalCode: { elementId: 'postal-code' }
            },
            callbacks: {
                paymentFormLoaded: function () {
                    console.log('Formulario de pago cargado correctamente');
                },
                paymentFormError: function (errors) {
                    console.error('Error al cargar el formulario de pago:', errors);
                },
                paymentFormCallback: function (response) {
                    console.log('Pago exitoso:', response);
                    localStorage.setItem('paymentDone', true); // Marca el pago como realizado
                    clearCart(); // Vacía el carrito después del pago
                }
            }
        }
    });

    // Inicializa el formulario de pago
    paymentForm.build();
}

// Llama a la función displayCart cuando se carga la página
displayCart();
