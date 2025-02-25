document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsElement = document.getElementById('cart-items');
    const productModal = document.getElementById('product-modal');
    const closeButton = document.getElementById('close-button');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');

    let cartItems = [];

    fetch('https://fakestoreapi.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('shopping-card');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-details">
                        <h2 class="product-title">${product.title}</h2>
                        <p class="product-description">${product.description}</p>
                        <div class="price-section">
                            <span class="price">$${product.price}</span>
                            <button class="add-to-cart">Sepete Ekle</button>
                        </div>
                    </div>
                `;

                productCard.addEventListener('click', () => {
                    modalProductImage.src = product.image;
                    modalProductTitle.textContent = product.title;
                    modalProductDescription.textContent = product.description;
                    modalProductPrice.textContent = `$${product.price}`;
                    productModal.style.display = 'flex';
                });

                productList.appendChild(productCard);
            });

            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const productTitle = button.closest('.shopping-card').querySelector('.product-title').textContent;
                    const productPrice = button.closest('.shopping-card').querySelector('.price').textContent;
                    cartItems.push({ title: productTitle, price: productPrice });
                    updateCart();
                    alert('Ürün sepete eklendi!');
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function updateCart() {
        cartCount.textContent = cartItems.length;
        cartItemsElement.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title} - ${item.price}`;
            cartItemsElement.appendChild(li);
        });
    }

    document.querySelector('.cart').addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});