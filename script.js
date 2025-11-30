// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Cart array
let cart = [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalAmount = document.getElementById("total-amount");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listener for add-to-cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.dataset.id));
    });
  });
}

// Render cart items
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty</li>";
    totalAmount.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(parseInt(btn.dataset.id));
    });
  });

  // Update total amount
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = total;
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

// Clear entire cart
document.getElementById('clear-cart-btn').addEventListener('click', 
function clearCart() {
  cart = [];
  renderCart();
})

// Initial render
renderProducts();
renderCart();
