// --- 1. CONSTANTS & CONFIGURATION ---
const CONFIG = {
  LOCALE: 'pt-BR',
  CURRENCY: 'BRL',
  STORAGE_KEY: 'imperium_cart_v1',
  ANIMATION_DURATION: 3000,
  SELECTORS: {
    GRID_SALGADAS: 'grid-salgadas',
    GRID_DOCES: 'grid-doces',
    GRID_BEBIDAS: 'grid-bebidas',
    CART_SIDEBAR: 'cart-sidebar',
    CART_ITEMS: 'cart-items',
    CART_TOTAL: 'cart-total-value',
    CART_BADGE: 'cart-badge',
    MOBILE_MENU: 'mobile-menu',
    MODAL: 'checkout-modal',
  },
};

// --- 2. UTILS (DRY Helpers) ---
class Utils {
  /**
   * Formats a number into currency string (e.g., R$ 10,00)
   * @param {number} value
   * @returns {string}
   */
  static formatCurrency(value) {
    return new Intl.NumberFormat(CONFIG.LOCALE, {
      style: 'currency',
      currency: CONFIG.CURRENCY,
    }).format(value);
  }

  /**
   * Safe JSON parse with fallback
   * @param {string} key
   * @param {any} fallback
   * @returns {any}
   */
  static getFromStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return fallback;
    }
  }
}

// --- 3. DATA REPOSITORY ---
class MenuRepository {
  constructor() {
    this._items = [
      {
        id: 1,
        name: "Calabresa Imperial",
        price: 39.90,
        category: "salgada",
        desc: "Calabresa defumada, cebola roxa, azeitonas e orégano.",
        img: "https://media.istockphoto.com/id/874332804/pt/foto/calabrian-pizza.jpg?s=612x612&w=0&k=20&c=f5LxklGxScA9tTzV3uarUrjLe5Z8wDEgXcyYeEEZe1w=",
      },
      {
        id: 2,
        name: "Marguerita Real",
        price: 42.90,
        category: "salgada",
        desc: "Mussarela de búfala, tomate italiano e manjericão fresco.",
        img: "https://media.istockphoto.com/id/1189884515/pt/foto/margherita-pizza-with-ham-and-pepper-on-white-background.jpg?s=612x612&w=0&k=20&c=9KEd8nIidmhmF-EaCSlANzGRl4eiGBbKf9chPBLvmSY=",
      },
      {
        id: 3,
        name: "Portuguesa",
        price: 45.90,
        category: "salgada",
        desc: "Presunto, ovo, ervilha, cebola e azeitonas pretas.",
        img: "https://media.istockphoto.com/id/534635519/pt/foto/pizza.jpg?s=612x612&w=0&k=20&c=TqGtmupAiFgSF2j8WbP5iZbtcycSyWOH_79vBhL2VTo=",
      },
      {
        id: 4,
        name: "Pepperoni NY",
        price: 49.90,
        category: "salgada",
        desc: "Dobro de pepperoni importado e queijo mussarela.",
        img: "https://media.istockphoto.com/id/1327326168/pt/foto/pizza-pepperoni-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=KG0d7MK7pmWP4gsPAXqp8OMwBf-i387ohMvAo4E0Qdo=",
      },
      {
        id: 5,
        name: "Quatro Queijos",
        price: 48.90,
        category: "salgada",
        desc: "Gorgonzola, provolone, parmesão e catupiry.",
        img: "https://media.istockphoto.com/id/1191586130/pt/foto/white-four-cheeses-pizza-isolated-on-white-background-close-up.jpg?s=612x612&w=0&k=20&c=217QC7JxFG2eiXp4N-HrUzw4_e8LcnQg_e5oomgbSk4=",
      },
      {
        id: 6,
        name: "Frango Supremo",
        price: 44.90,
        category: "salgada",
        desc: "Frango desfiado, milho, bacon e catupiry original.",
        img: "https://media.istockphoto.com/id/186295807/pt/foto/galinha-tikka-pizza.jpg?s=612x612&w=0&k=20&c=yo0jsL2gORl6YnLmkizIXO4m1HqxkzB7PKihZu1phWQ=",
      },
      {
        id: 7,
        name: "Nordestina",
        price: 52.90,
        category: "salgada",
        desc: "Carne seca desfiada, cebola roxa e queijo coalho.",
        img: "https://media.istockphoto.com/id/174902112/pt/foto/carne-amantes-de-pizza3.jpg?s=612x612&w=0&k=20&c=QOn4t9ES3dt_wa6MidW5A96DlnaJeVsHztqOhXDtwKQ=",
      },
      {
        id: 8,
        name: "Horta Fina",
        price: 46.90,
        category: "salgada",
        desc: "Brócolis, palmito, tomate seco e champignon.",
        img: "https://media.istockphoto.com/id/184098729/pt/foto/pizza-vegetariana-03.jpg?s=612x612&w=0&k=20&c=nfCPGuGzOCKMkP-5mq8o1I4yoeUw1usF6FwkR_1WJwA=",
      },
      {
        id: 9,
        name: "Bacon Crocante",
        price: 43.90,
        category: "salgada",
        desc: "Mussarela e tiras de bacon extra crocantes.",
        img: "https://media.istockphoto.com/id/175385309/pt/foto/pizza.jpg?s=612x612&w=0&k=20&c=SNNPdSxQFyQgf0kUR4moSqEX2rhdq6Q3tSRDIIbU6ak=",
      },
      {
        id: 10,
        name: "Lombo Canadense",
        price: 47.90,
        category: "salgada",
        desc: "Lombo defumado e abacaxi caramelizado.",
        img: "https://media.istockphoto.com/id/1192287215/pt/foto/delicious-pizza-with-meat-on-white.jpg?s=612x612&w=0&k=20&c=YduSKGOJZGsb1WttOA6j1Z_m-wVGFEUmyvo5DtfCSbg=",
      },
      {
        id: 11,
        name: "Chocolate Real",
        price: 35.90,
        category: "doce",
        desc: "Ganache de chocolate meio amargo e raspas.",
        img: "https://media.istockphoto.com/id/964267588/pt/foto/pizza-de-chocolate.jpg?s=612x612&w=0&k=20&c=S0ZCD9IBEWUVvxif0IXAsWwXF7GV0ojrMZAlRkYixmU=",
      },
      {
        id: 12,
        name: "Sensação",
        price: 38.90,
        category: "doce",
        desc: "Chocolate ao leite coberto com morangos frescos.",
        img: "https://media.istockphoto.com/id/531619124/pt/foto/engra%C3%A7ado-pizza-vista-superior-isolados.jpg?s=612x612&w=0&k=20&c=mnR_SC6d0PGJJ7KumncWVHzx8ZR93duUCZyepBXv-DM=",
      },
      {
        id: 13,
        name: "Banana Nevada",
        price: 32.90,
        category: "doce",
        desc: "Banana, leite condensado, canela e chocolate branco.",
        img: "https://media.istockphoto.com/id/1095964018/pt/foto/sweet-dessert-pizza-with-chocolate-colored-candy.jpg?s=612x612&w=0&k=20&c=I8hUVRQ4VNwgegCnMKPxqUuil19C6PQyexKHPsaT2Dg=",
      },
      {
        id: 14,
        name: "Prestígio",
        price: 36.90,
        category: "doce",
        desc: "Chocolate ao leite com muito coco ralado.",
        img: "https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/hummmpizzas/209_647f6339db857.png",
      },
      {
        id: 15,
        name: "Confete Kids",
        price: 34.90,
        category: "doce",
        desc: "Chocolate ao leite coberto com M&Ms coloridos.",
        img: "https://media.istockphoto.com/id/182477190/pt/foto/candy-shop-pizza.jpg?s=612x612&w=0&k=20&c=BpyXb0FE2NocH70w_0_oC56VjxvoLpTLDIr-DA1_gUY=",
      },
      {
        id: 16,
        name: "Romeu e Julieta",
        price: 33.90,
        category: "doce",
        desc: "Goiabada cremosa com queijo minas.",
        img: "https://www.cosmopolitapizza.com.br/wp-content/uploads/2021/03/ROMEU_E_JULIETA.png",
      },
      {
        id: 17,
        name: "Grand Gateau",
        price: 29.90,
        category: "doce",
        desc: "Pequeno bolo de chocolate com picolé magnum.",
        img: "https://media.istockphoto.com/id/1286571718/pt/foto/grand-gateau-ice-cream-chocolate-and-strawberry-on-wood-background.jpg?s=612x612&w=0&k=20&c=aR97v9ThGQWGC-tq8Eozw2PQGwl7ESl0ZdLYZYOLA-A=",
      },
      {
        id: 18,
        name: "Coca-Cola 2L",
        price: 14.00,
        category: "bebida",
        desc: "A clássica, trincando de gelada.",
        img: "https://www.naturaldaterra.com.br/_next/image?url=https%3A%2F%2Fnaturalterra.vtexassets.com%2Farquivos%2Fids%2F173881%2FRefrigerante-Coca-Cola-sabor-original-2l-gelada.jpg.jpg%3Fv%3D638944163980900000%26format%3Dwebp&w=1440&q=75",
      },
      {
        id: 19,
        name: "Suco Natural 1L",
        price: 18.00,
        category: "bebida",
        desc: "Laranja 100% da fruta.",
        img: "https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dw057d3d52/Produtos/682179-7899916900503-suco%20natural%20one%20laranja%20integral%2015l-natural%20one-2.jpg",
      },
      {
        id: 20,
        name: "Heineken",
        price: 12.00,
        category: "bebida",
        desc: "330ml. Venda proibida para menores.",
        img: "https://carrefourbrfood.vtexassets.com/arquivos/ids/193526100/7941234_1.jpg?v=638864688650200000",
      },
      {
        id: 21,
        name: "Água Mineral",
        price: 5.00,
        category: "bebida",
        desc: "500ml. Com ou sem gás.",
        img: "https://www.imigrantesbebidas.com.br/bebida/images/products/full/2893-agua-mineral-crystal-sem-gas-500ml.jpg",
      },
      {
        id: 22,
        name: "Guaraná 2L",
        price: 12.00,
        category: "bebida",
        desc: "O original do Brasil.",
        img: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/14062/medium/refrigerante-antarctica-guarana-2l_18875.png",
      },
    ];
  }

  getAll() {
    return this._items;
  }

  getByCategory(category) {
    return this._items.filter(item => item.category === category);
  }
}

// --- 4. BUSINESS LOGIC (Service Layer) ---
class CartService {
  constructor() {
    this.cart = Utils.getFromStorage(CONFIG.STORAGE_KEY, []);
  }

  /**
   * Adds an item to the cart
   * @param {string} name
   * @param {number} price
   */
  addItem(name, price) {
    this.cart.push({ name, price, addedAt: new Date() });
    this._persist();
    return this.cart;
  }

  /**
   * Removes item at specific index
   * @param {number} index
   */
  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this._persist();
    }
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this._persist();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  getItemCount() {
    return this.cart.length;
  }

  getItems() {
    return [...this.cart]; // Return copy for immutability
  }

  _persist() {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.error("Storage limit reached or error:", e);
    }
  }
}

// --- 5. UI MANAGER (View Layer) ---
class UIManager {
  constructor(cartService) {
    this.cartService = cartService;
    this.elements = {
      salgadas: document.getElementById(CONFIG.SELECTORS.GRID_SALGADAS),
      doces: document.getElementById(CONFIG.SELECTORS.GRID_DOCES),
      bebidas: document.getElementById(CONFIG.SELECTORS.GRID_BEBIDAS),
      cartSidebar: document.getElementById(CONFIG.SELECTORS.CART_SIDEBAR),
      cartItems: document.getElementById(CONFIG.SELECTORS.CART_ITEMS),
      cartTotal: document.getElementById(CONFIG.SELECTORS.CART_TOTAL),
      cartBadge: document.getElementById(CONFIG.SELECTORS.CART_BADGE),
      mobileMenu: document.getElementById(CONFIG.SELECTORS.MOBILE_MENU),
      modal: document.getElementById(CONFIG.SELECTORS.MODAL),
    };

    this._initObserver();
  }

  _initObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-element");
        }
      });
    });
  }

  /**
   * Renders a single product card
   * @param {Object} item
   * @returns {HTMLElement}
   */
  createCard(item) {
    const card = document.createElement("article");
    card.classList.add("card", "hidden-element");
    
    // Prevent XSS by using textContent where possible, though InnerHTML is used here for structure.
    // In a real framework (React), this is handled automatically.
    card.innerHTML = `
      <div class="img-container">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
      </div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <span>${Utils.formatCurrency(item.price)}</span>
      <button class="btn-add-cart" data-name="${item.name}" data-price="${item.price}">
        ADD +
      </button>
    `;

    // Attach specific event listener for this button
    const btn = card.querySelector('.btn-add-cart');
    btn.addEventListener('click', () => {
        this.handleAddClick(item.name, item.price);
    });

    this.observer.observe(card);
    return card;
  }

  renderMenu(items) {
    // Clear containers
    this.elements.salgadas.innerHTML = "";
    this.elements.doces.innerHTML = "";
    this.elements.bebidas.innerHTML = "";

    items.forEach(item => {
      const card = this.createCard(item);
      if (item.category === "salgada") this.elements.salgadas.appendChild(card);
      else if (item.category === "doce") this.elements.doces.appendChild(card);
      else if (item.category === "bebida") this.elements.bebidas.appendChild(card);
    });
  }

  updateCartUI() {
    const items = this.cartService.getItems();
    this.elements.cartItems.innerHTML = "";

    if (items.length === 0) {
      this.elements.cartItems.innerHTML =
        '<p style="text-align:center; color:#666; margin-top:20px;">Seu carrinho está vazio.</p>';
    } else {
      items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${Utils.formatCurrency(item.price)}</small>
            </div>
            <div class="remove-btn-wrapper">
                 <i class="fas fa-trash remove-btn"></i>
            </div>
        `;
        
        // Listener for removal
        itemDiv.querySelector('.remove-btn').addEventListener('click', () => {
            this.handleRemoveClick(index);
        });

        this.elements.cartItems.appendChild(itemDiv);
      });
    }

    this.elements.cartTotal.innerText = Utils.formatCurrency(this.cartService.getTotal());
    this.elements.cartBadge.innerText = this.cartService.getItemCount();
  }

  // --- Actions & Events ---

  handleAddClick(name, price) {
    this.cartService.addItem(name, price);
    this.updateCartUI();
    this.openSidebar();
    this.showToast(`${name} adicionado!`);
  }

  handleRemoveClick(index) {
    this.cartService.removeItem(index);
    this.updateCartUI();
  }

  toggleSidebar() {
    this.elements.cartSidebar.classList.toggle("open");
  }

  openSidebar() {
    this.elements.cartSidebar.classList.add("open");
  }

  toggleMobileMenu() {
    const isVisible = this.elements.mobileMenu.style.display === "block";
    this.elements.mobileMenu.style.display = isVisible ? "none" : "block";
  }

  showToast(message) {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.innerText = message;
    toast.className = "show";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
      if (document.body.contains(toast)) {
         document.body.removeChild(toast);
      }
    }, CONFIG.ANIMATION_DURATION);
  }

  openCheckoutModal() {
    if (this.cartService.getItemCount() === 0) {
        this.showToast("Seu carrinho está vazio!");
        return;
    }
    this.elements.modal.classList.add("active");
    this.cartService.clearCart();
    this.updateCartUI();
    this.toggleSidebar();
  }

  closeCheckoutModal() {
    this.elements.modal.classList.remove("active");
  }
}

// --- 6. APP CONTROLLER (Orchestrator) ---
class App {
  constructor() {
    this.repository = new MenuRepository();
    this.cartService = new CartService();
    this.ui = new UIManager(this.cartService);

    this._initEventListeners();
    this._init();
  }

  _init() {
    const items = this.repository.getAll();
    this.ui.renderMenu(items);
    this.ui.updateCartUI();
  }

  _initEventListeners() {
    // Header Buttons
    document.getElementById('btn-toggle-cart').addEventListener('click', () => this.ui.toggleSidebar());
    document.getElementById('btn-close-cart').addEventListener('click', () => this.ui.toggleSidebar());
    document.getElementById('btn-mobile-menu').addEventListener('click', () => this.ui.toggleMobileMenu());
    
    // Checkout Buttons
    document.getElementById('btn-checkout').addEventListener('click', () => this.ui.openCheckoutModal());
    document.getElementById('btn-close-modal').addEventListener('click', () => this.ui.closeCheckoutModal());
    
    // Mobile Links
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => this.ui.toggleMobileMenu());
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (event) => {
        if (event.target === this.ui.elements.modal) {
            this.ui.closeCheckoutModal();
        }
    });
  }
}

// Start the App
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});