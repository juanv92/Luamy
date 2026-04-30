/*--- CONFIGURACIÓN INICIAL Y ESTADO ---*/
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = 'es';
let currentSlide = 0;
let scale = 1;

// --- PRODUCTOS LOCALES (Modifica las imágenes aquí) ---
const misProductos = [
    { id: 1, title: "Poliester", price: 25.000, image: "./poliester.jpg" },
    { id: 2, title: "Seda", price: 45.000, image: "./seda.jpg" },
    { id: 3, title: "Lino", price: 35.000, image: "./lino.jpg" },
    { id: 4, title: "Antifluido", price: 45.000, image: "./antifluido.jpg" },
    { id: 5, title: "Estilo Crochet", price: 55.000, image: "./Crochet.jpeg" },
    { id: 6, title: "Estilo crochet2", price: 65.000, image: "./crochet2.jpeg" },
    { id: 7, title: "Estilo con Herraje", price: 15.000, image: "./herrajes.jpeg" },
    { id: 8, title: "Estilo con Encaje", price: 20.000, image: "./encajes.jpeg" },
];

const translations = {
    es: {
        "nav-home": "Inicio", "nav-gallery": "Galería", "nav-about": "Nosotros", "nav-contact": "Contacto",
        "hero-title": "Nueva Colección 2026", "hero-subtitle": "Calidad premium para el estilo moderno.",
        "btn-catalog": "Ver Catálogo", "slide2-title": "Streetwear Urban", "slide2-subtitle": "Diseños que rompen las reglas.",
        "btn-explore": "Explorar", "cat-title": "Nuestros Productos", "cart-title-modal": "Tu Carrito",
        "total": "Total", "checkout": "Finalizar Compra", "footer-follow": "Síguenos",
        "copyright": "© 2026 Todos los derechos reservados.", "add-btn": "Agregar", "remove-btn": "Quitar",
        "about-title": "Sobre Nosotros",
        "about-p1": "El Arte de Vestir tu Identidad En un mundo de moda masiva, en Luamy Taller apostamos por lo personal. No solo hacemos ropa; creamos piezas que cuentan tu historia.Cada diseño nace de una conversación, se perfecciona con tus medidas y se materializa con telas de alta calidad. Bajo la dirección de nuestra experta modista, cada puntada busca el equilibrio perfecto entre comodidad, tendencia y esa exclusividad que solo el trabajo artesanal puede ofrecer. El Proceso Creativo Para que una prenda sea perfecta, debe ser única. Así trabajamos: Consulta Inicial: Escuchamos tu idea, analizamos tu estilo y seleccionamos los materiales ideales. Diseño y Medidas: Creamos un boceto exclusivo y tomamos medidas precisas para asegurar un ajuste impecable.Confección Artesanal: Tu prenda se construye paso a paso en nuestro taller, con atención meticulosa a cada detalle.Prueba y Ajuste: Nada sale del taller hasta que te sientas absolutamente increíble al usarlo. Especialidades Alta Costura y Galas: Vestidos que roban miradas en eventos inolvidables. Novias y Ceremonias: El diseño de tus sueños para el día más importante. Streetwear de Autor: Estilo urbano con acabados de lujo y cortes personalizados.Transformaciones: Damos una nueva vida a tus prendas favoritas con ajustes técnicos de precisión.¿Lista para dar vida a tu próximo diseño? No te conformes con lo que hay en las vitrinas. Ven a Luamy y descubre el placer de vestir algo hecho especialmente para ti.",
        "stat-years": "Años de Experiencia", "stat-created": "Prendas Creadas",
        "contact-title": "Ponte en Contacto", "contact-subtitle": "Trabajemos juntos",
        "form-name": "Nombre", "form-email": "Correo Electrónico", "form-message": "Mensaje", "form-btn": "Enviar Mensaje",
        "loc-text": "Bogotá, Colombia"
    },
    en: {
        "nav-home": "Home", "nav-gallery": "Gallery", "nav-about": "About", "nav-contact": "Contact",
        "hero-title": "New Collection 2026", "hero-subtitle": "Premium quality for modern style.",
        "btn-catalog": "View Catalog", "slide2-title": "Urban Streetwear", "slide2-subtitle": "Designs that break the rules.",
        "btn-explore": "Explore", "cat-title": "Our Products", "cart-title-modal": "Your Cart",
        "total": "Total", "checkout": "Checkout", "footer-follow": "Follow Us",
        "copyright": "© 2026 All rights reserved.", "add-btn": "Add to Cart", "remove-btn": "Remove",
        "about-title": "About Us",
       "about-p1": "The Art of Dressing Your Identity In a world of mass-produced fashion, at Luamy Taller we advocate for the personal. We don’t just make clothes; we create pieces that tell your story. Each design is born from a conversation, perfected with your measurements, and brought to life using high-quality fabrics. Under the direction of our expert dressmaker, every stitch seeks the perfect balance between comfort, trend, and the exclusivity that only artisanal craftsmanship can offer. The Creative Process For a garment to be perfect, it must be unique. This is how we work: Initial Consultation: We listen to your ideas, analyze your style, and select the ideal materials.Design and Measurements: We create an exclusive sketch and take precise measurements to ensure a flawless fit. Artisanal Tailoring: Your garment is built step-by-step in our workshop, with meticulous attention to every detail.Fitting and Adjustments: Nothing leaves the workshop until you feel absolutely incredible wearing it. Specialties Haute Couture and Galas: Dresses that turn heads at unforgettable events.Bridal and Ceremonies: The design of your dreams for your most important day.Signature Streetwear: Urban style with luxury finishes and personalized cuts.Transformations: We give new life to your favorite garments with precision technical adjustments.Ready to bring your next design to life? Don't settle for what's in the shop windows. Come to Luamy and discover the pleasure of wearing something made especially for you.",
        "stat-years": "Years of Experience", "stat-created": "Garments Created",
        "contact-title": "Get in Touch", "contact-subtitle": "Let's work together",
        "form-name": "Name", "form-email": "Email", "form-message": "Message", "form-btn": "Send Message",
        "loc-text": "Bogota, Colombia"
    }
};

/* --- GESTIÓN DE IDIOMA Y TEMA --- */
document.getElementById('lang-toggle').addEventListener('click', (e) => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    e.target.innerText = currentLang === 'es' ? 'EN' : 'ES';
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
    });
    
    renderProducts(); // Actualizar botones de los productos al cambiar idioma
    updateCartUI();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
});

/* --- SLIDER --- */
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
function changeSlide(dir) { showSlide(currentSlide + dir); }
setInterval(() => changeSlide(1), 5000);

/*--- CARRITO DE COMPRAS ---*/
function addToCart(id, title, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ id, title, price, qty: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);

    const container = document.getElementById('cart-items');
    if (container) {
        container.innerHTML = cart.map(i => `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span>${i.title.slice(0, 15)} (x${i.qty})</span>
                <button class="btn-remove" onclick="removeFromCart(${i.id})" style="color: red; border: none; background: none; cursor: pointer; font-weight: bold;">
                    ${translations[currentLang]['remove-btn']}
                </button>
            </div>
        `).join('');
    }

    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    const totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.innerText = total.toFixed(2);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        const isDisplayed = cartModal.style.display === 'flex' || cartModal.style.display === 'block';
        cartModal.style.display = isDisplayed ? 'none' : 'flex';
    }
}

/* --- WHATSAPP CHECKOUT --- */
function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert(currentLang === 'es' ? "Tu carrito está vacío" : "Your cart is empty");
        return;
    }
    const phoneNumber = "573000000000"; 
    let message = currentLang === 'es' ? "¡Hola Luamy! Quisiera realizar este pedido:\n\n" : "Hello Luamy! I would like to place this order:\n\n";

    cart.forEach(item => {
        message += `• ${item.title} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}\n`;
    });

    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    message += `\n*Total: $${total.toFixed(2)}*`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

/* --- RENDERIZAR PRODUCTOS (Modificado para usar el array local) --- */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = misProductos.map(p => `
            <div class="product-card">
                <img src="${p.image}" alt="${p.title}" style="width:100%; height:150px; object-fit:contain;">
                <h4>${p.title}</h4>
                <p class="price">$${p.price.toFixed(2)}</p>
                <button class="btn-primary" onclick="addToCart(${p.id}, '${p.title}', ${p.price})">
                    ${translations[currentLang]['add-btn']}
                </button>
            </div>
        `).join('');
    }
}

/*--- LIGHTBOX & ZOOM ---*/
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function updateZoom() {
    if (lightboxImg) lightboxImg.style.transform = `scale(${scale})`;
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-item img')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
        scale = 1;
        updateZoom();
    }
    if (e.target.id === 'cart-modal') toggleCart();
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-content-wrapper')) {
        lightbox.style.display = 'none';
    }
});

if (document.getElementById('zoom-in')) {
    document.getElementById('zoom-in').onclick = () => { scale += 0.2; updateZoom(); };
    document.getElementById('zoom-out').onclick = () => { if (scale > 0.4) scale -= 0.2; updateZoom(); };
    document.getElementById('reset-zoom').onclick = () => { scale = 1; updateZoom(); };
    document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';
}

/* --- INICIALIZACIÓN --- */
window.addEventListener('DOMContentLoaded', () => {
    renderProducts(); // Cargamos nuestros productos manuales
    updateCartUI();
    
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) checkoutBtn.onclick = checkoutToWhatsApp;
});