let cart = [];

const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total-value");
const cartBadge = document.getElementById("cart-badge");
const mobileMenu = document.getElementById("mobile-menu");

function toggleCart() {
  cartSidebar.classList.toggle("open");
}

function toggleMobileMenu() {
  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "block";
  }
}

function addToCart(name, price) {
  cart.push({ name, price });

  updateCartUI();

  if (!cartSidebar.classList.contains("open")) {
    cartSidebar.classList.add("open");
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; color:#666; margin-top:20px;">Seu carrinho está vazio.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>R$ ${item.price.toFixed(2).replace(".", ",")}</small>
                </div>
                <div class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </div>
            `;

      cartItemsContainer.appendChild(itemDiv);
    });
  }

  cartTotalElement.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
  cartBadge.innerText = cart.length;
}