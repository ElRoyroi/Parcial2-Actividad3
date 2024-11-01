// Variables globales
let cart = []; // Arreglo para almacenar los productos en el carrito
let subtotal = 0; // Variable para almacenar el subtotal del carrito

// Mostrar/Ocultar carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active'); // Alternar la clase 'active' para mostrar/ocultar el carrito
    document.body.classList.toggle('cart-open'); // Agrega la clase al body
}

// Función para agregar al carrito
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++; // Aumenta la cantidad si el producto ya está en el carrito
    } else {
        cart.push({ ...product, quantity: 1 }); // Agrega el producto al carrito con cantidad 1
    }
    updateCartUI(); // Actualiza la interfaz del carrito
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar contenido previo
    subtotal = 0; // Reiniciar subtotal

    // Iterar sobre los productos en el carrito para mostrarlos
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <h5>${item.title}</h5>
                <p>$${item.price.toLocaleString('en-US')}</p>
                <div>
                    <button class="btn-decrease" onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-increase" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="btn-danger" onclick="confirmRemoval(${item.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem); // Agregar el producto a la interfaz
        subtotal += item.price * item.quantity; // Calcular el subtotal
    });

    const tax = subtotal * 0.10; // Calcular impuestos
    const total = subtotal + tax; // Calcular total
    document.getElementById('subtotal-price').innerText = `$${subtotal.toLocaleString('en-US')}`;
    document.getElementById('tax-price').innerText = `$${tax.toLocaleString('en-US')}`;
    document.getElementById('total-price').innerText = `$${total.toLocaleString('en-US')}`;

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calcular total de productos
    document.getElementById('cart-count').innerText = totalItems; // Mostrar total de productos en el carrito
}

// ** Eventos personalizados **
// Agregar evento a los botones de agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () { // Evento personalizado: clic en el botón de agregar al carrito
        const productElement = button.closest('.item');
        const product = {
            id: parseInt(productElement.dataset.id),
            title: productElement.querySelector('.titulo-item').innerText,
            price: parseFloat(
                productElement.querySelector('.precio-item strong').innerText.replace('$', '').replace(',', '')
            ),
            image: productElement.querySelector('.img-item').src,
        };
        addToCart(product); // Llama a la función para agregar el producto
    });
});

// ** Evento normal **
// Animación para reordenamiento de productos
document.getElementById('search-bar').addEventListener('input', function () { // Evento normal: entrada en el campo de búsqueda
    const searchTerm = this.value.toLowerCase();
    const items = Array.from(document.querySelectorAll('.item'));
    const itemsContainer = document.querySelector('.contenedor-items');

    const filteredItems = items
        .map(item => {
            const title = item.querySelector('.titulo-item').innerText.toLowerCase();
            return { element: item, matches: title.includes(searchTerm) }; // Determina si hay coincidencias
        })
        .sort((a, b) => b.matches - a.matches);

    // Agregar animación con `opacity` y `transform`
    itemsContainer.innerHTML = ''; // Limpiar contenedor
    filteredItems.forEach(({ element, matches }) => {
        element.classList.add('fade-in');
        element.classList.toggle('hidden', !matches); // Oculta los no coincidentes
        itemsContainer.appendChild(element); // Agregar elemento filtrado al contenedor
    });
});

// ** Eventos normales para aumentar/disminuir la cantidad **
function decreaseQuantity(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--; // Disminuir cantidad si es mayor a 1
        } else {
            removeFromCart(productId); // Eliminar del carrito si la cantidad es 1
        }
        updateCartUI(); // Actualizar la interfaz del carrito
    }
}

function increaseQuantity(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].quantity++; // Aumentar cantidad
        updateCartUI(); // Actualizar la interfaz del carrito
    }
}

// ** Evento normal de confirmación **
function confirmRemoval(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        removeFromCart(productId); // Eliminar producto si se confirma
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Filtrar el carrito para eliminar el producto
    updateCartUI(); // Actualizar la interfaz del carrito
}

// ** Evento personalizado **
// Evento para aplicar descuento
document.getElementById('apply-discount').addEventListener('click', function () { // Evento personalizado: clic en aplicar descuento
    const discountCode = document.getElementById('discount-code').value;
    if (discountCode === 'DESCUENTO10') {
        const discountAmount = subtotal * 0.10; // Calcular descuento
        subtotal -= discountAmount; // Aplicar descuento al subtotal
        updateCartUI(); // Actualizar la interfaz del carrito
        alert('Código de descuento aplicado'); // Mensaje de éxito
    } else {
        alert('Código de descuento no válido'); // Mensaje de error
    }
});

// ** Evento normal **
// Función de checkout
function proceedToCheckout() {
    alert('Procediendo a la compra...'); // Mensaje de alerta al proceder al checkout
}
