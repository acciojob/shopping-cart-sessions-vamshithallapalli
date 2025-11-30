// Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ---------------------------
// Load Cart from sessionStorage
// ---------------------------
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// ---------------------------
// Render Product List
// ---------------------------
function renderProducts() {
  productList.innerHTML = ""; // clear before rendering (optional)

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners for add buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.dataset.id));
    });
  });
}

// ---------------------------
// Render Cart Items
// ---------------------------
function renderCart() {
  cartList.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    return; // Keeps UL empty (Cypress will check that)
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ---------------------------
// Add Item to Cart
// ---------------------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    updateSession();
    renderCart();
  }
}

// ---------------------------
// Clear Cart
// ---------------------------
function clearCart() {
  cart = [];
  updateSession();
  renderCart();
}

// ---------------------------
// Update sessionStorage
// ---------------------------
function updateSession() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------------------
// Event Listener: Clear Cart Button
// ---------------------------
clearCartBtn.addEventListener("click", clearCart);

// ---------------------------
// Initial Page Load
// ---------------------------
renderProducts();
renderCart();
