let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = 'es';
let currentSlide = 0;

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
        "stat-years": "Años de Experiencia",
        "stat-created": "Prendas Creadas",
        "contact-title": "Ponte en Contacto",
        "contact-subtitle": "Trabajemos juntos para dar vida a tu próximo diseño",
        "form-name": "Nombre",
        "form-email": "Correo Electrónico",
        "form-message": "Mensaje",
        "form-btn": "Enviar Mensaje",
        "loc-text": "Bogotá, Colombia",
        
        // --- GALERÍA (Actualizada) ---
        "gal-t1": "Conjuntos", "gal-cat-maravillosos": "Maravillosos",
        "gal-t2": "Conjuntos", "gal-cat-gala": "De Gala",
        "gal-t3": "Conjuntos", "gal-cat-estilo": "Con Tu Estilo",
        "gal-t4": "Faldas", "gal-cat-elegantes": "Elegantes",
        "gal-t5": "Novias", "gal-cat-unicas": "Únicas",
        "gal-t6": "Gabanes", "gal-cat-diferentes": "Diferentes",
        "gal-t7": "Gabanes", "gal-cat-elegantes-2": "Elegantes",
        "gal-t8": "Para", "gal-cat-hombres": "Hombres",
        "gal-t9": "Faldas", "gal-cat-casuales": "Casuales",
        "gal-t10": "Para", "gal-cat-matrimonios": "Matrimonios",
        "gal-t11": "Vestidos", "gal-cat-unicos": "Únicos",
        "gal-t12": "Estilo", "gal-cat-infantil": "Infantil"
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
        "stat-years": "Years of Experience",
        "stat-created": "Garments Created",
        "contact-title": "Get in Touch",
        "contact-subtitle": "Let's work together to bring your next design to life",
        "form-name": "Name",
        "form-email": "Email",
        "form-message": "Message",
        "form-btn": "Send Message",
        "loc-text": "Bogota, Colombia",

        // --- GALLERY (Updated) ---
        "gal-t1": "Outfits", "gal-cat-maravillosos": "Wonderful",
        "gal-t2": "Outfits", "gal-cat-gala": "Gala Wear",
        "gal-t3": "Outfits", "gal-cat-estilo": "Your Style",
        "gal-t4": "Skirts", "gal-cat-elegantes": "Elegant",
        "gal-t5": "Brides", "gal-cat-unicas": "Unique",
        "gal-t6": "Coats", "gal-cat-diferentes": "Distinctive",
        "gal-t7": "Coats", "gal-cat-elegantes-2": "Elegant",
        "gal-t8": "For", "gal-cat-hombres": "Men",
        "gal-t9": "Skirts", "gal-cat-casuales": "Casual",
        "gal-t10": "For", "gal-cat-matrimonios": "Weddings",
        "gal-t11": "Dresses", "gal-cat-unicos": "Unique",
        "gal-t12": "Style", "gal-cat-infantil": "Kids"
    }
};

// Traducción
document.getElementById('lang-toggle').addEventListener('click', (e) => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    e.target.innerText = currentLang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
    });
    fetchProducts();
    updateCartUI();
});

// Slider
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
function changeSlide(dir) { showSlide(currentSlide + dir); }
setInterval(() => changeSlide(1), 5000);

// Carrito
function addToCart(id, title, price) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++; else cart.push({ id, title, price, qty: 1 });
    updateCartUI();
}
function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.map(i => `
        <div class="cart-item">
            <span>${i.title.slice(0,15)} (x${i.qty})</span>
            <button class="btn-remove" onclick="removeFromCart(${i.id})">${translations[currentLang]['remove-btn']}</button>
        </div>
    `).join('');
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    document.getElementById('total-price').innerText = total.toFixed(2);
}
function removeFromCart(id) { cart = cart.filter(i => i.id !== id); updateCartUI(); }
function toggleCart() { const m = document.getElementById('cart-modal'); m.style.display = m.style.display === 'block' ? 'none' : 'block'; }

// API Productos
async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products?limit=8');
    const data = await res.json();
    document.getElementById('products-grid').innerHTML = data.map(p => `
        <div class="product-card">
            <img src="${p.image}">
            <h4>${p.title.slice(0,25)}</h4>
            <p class="price">$${p.price}</p>
            <button class="btn-primary" onclick="addToCart(${p.id}, '${p.title.replace(/'/g, "")}', ${p.price})">
                ${translations[currentLang]['add-btn']}
            </button>
        </div>
    `).join('');
}

// --- MANTENER IGUAL ---
function addToCart(id, title, price) {
    const item = cart.find(i => i.id === id);
    if (item) item.qty++; else cart.push({ id, title, price, qty: 1 });
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.map(i => `
        <div class="cart-item">
            <span>${i.title.slice(0,15)} (x${i.qty})</span>
            <button class="btn-remove" onclick="removeFromCart(${i.id})">${translations[currentLang]['remove-btn']}</button>
        </div>
    `).join('');
    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function removeFromCart(id) { cart = cart.filter(i => i.id !== id); updateCartUI(); }
function toggleCart() { const m = document.getElementById('cart-modal'); m.style.display = m.style.display === 'block' ? 'none' : 'block'; }

// --- NUEVA FUNCIÓN PARA REDIRECCIONAR A WHATSAPP ---
function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert(currentLang === 'es' ? "Tu carrito está vacío" : "Your cart is empty");
        return;
    }

    const phoneNumber = "573000000000"; // PON AQUÍ TU NÚMERO (Sin el + y con código de país)
    let message = currentLang === 'es' ? "¡Hola! Quisiera realizar este pedido:\n\n" : "Hello! I would like to place this order:\n\n";

    cart.forEach(item => {
        message += `• ${item.title} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}\n`;
    });

    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    message += `\n*Total: $${total.toFixed(2)}*`;

    // Codificar el mensaje para URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Redireccionar
    window.open(whatsappUrl, '_blank');
}

// Asignar la función al botón de finalizar compra cuando cargue la ventana
window.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.onclick = checkoutToWhatsApp;
    }
});

// Tema
document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

window.onload = () => { fetchProducts(); updateCartUI(); };