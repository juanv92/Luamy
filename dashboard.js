// 1. Configuración de Supabase
const supabaseUrl = 'https://cjgsxkqlslemhbyhdfll.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ3N4a3Fsc2xlbWhieWhkZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTIwMzEsImV4cCI6MjA5Mjk2ODAzMX0.VRC0Xn3R94WFZKY0vUW6G9TXCzsoO0Y-2LjFAbEQZYQ';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Referencias a elementos
const adminGrid = document.getElementById('admin-grid');
const productForm = document.getElementById('productForm');
const uploadType = document.getElementById('uploadType');
const mainTitle = document.getElementById('mainTitle');
const prodPrice = document.getElementById('prodPrice');
const prodCategory = document.getElementById('prodCategory');
const gallerySubtitle = document.getElementById('gallerySubtitle');

// 2. Control dinámico de Placeholders
uploadType.addEventListener('change', () => {
    const tipo = uploadType.value;
    // Reiniciamos visibilidad
    prodPrice.style.display = "block";
    prodCategory.style.display = "block";
    gallerySubtitle.style.display = "block";

    if (tipo === 'productos') {
        mainTitle.placeholder = "Nombre del producto";
        gallerySubtitle.style.display = "none";
    } else if (tipo === 'gallery') {
        mainTitle.placeholder = "Título de la imagen";
        prodPrice.style.display = "none";
    } else if (tipo === 'slider') {
        mainTitle.placeholder = "Texto descriptivo (Alt Text)";
        prodPrice.style.display = "none";
        prodCategory.style.display = "none";
        gallerySubtitle.style.display = "none";
    }
    fetchData(); // Recargar la lista al cambiar de categoría
});

// 3. Cargar datos (Corregido: Declaración de variables y visibilidad)
async function fetchData() {
    const tabla = uploadType.value;
    adminGrid.innerHTML = '<p>Cargando contenido...</p>';
    
    const { data, error } = await supabase
        .from(tabla)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error:", error);
        return alert("Error al cargar datos");
    }

    adminGrid.innerHTML = '';

    data.forEach(item => {
        let imgURL = "";
        let titulo = "";

        // VALIDACIÓN ESTRICTA DE CAMPOS SEGÚN LA TABLA
        if (tabla === 'productos') {
            imgURL = item.image_url; 
            titulo = item.nombre;
        } else if (tabla === 'gallery') {
            imgURL = item.image_url; // En gallery usas 'image_url'
            titulo = item.titulo;
        } else if (tabla === 'slider') {
            imgURL = item.url;    // En slider usas 'url'
            titulo = item.alt_text;
        }

        // Si la URL no existe o es nula, ponemos un placeholder
        const finalImg = (imgURL && imgURL.trim() !== "") ? imgURL : 'https://via.placeholder.com/150?text=Sin+Imagen';
        const finalTitle = titulo || "Sin título";
        const pathToDelete = item.image_path || "";

        adminGrid.innerHTML += `
            <article class="product-card">
                <img src="${finalImg}" alt="${finalTitle}">
                <div class="card-info">
                    <p><strong>${finalTitle}</strong></p>
                    ${item.precio ? `<p class="price">$${Number(item.precio).toLocaleString()}</p>` : ''}
                    <p><small class="category">${item.categoria || ''}</small></p>
                    ${item.subtitulo ? `<p><small>${item.subtitulo}</small></p>` : ''}
                </div>
                <button class="btn-danger" style="margin: 10px;" onclick="deleteItem('${item.id}', '${pathToDelete}', '${tabla}')">Eliminar</button>
            </article>
        `;
    });
}

// 4. Subir Contenido
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('uploadBtn');
    const tipo = uploadType.value;
    const file = document.getElementById('prodImage').files[0];

    if (!file) return alert("Selecciona una imagen");
    btn.disabled = true;

    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: sError } = await supabase.storage.from('product-images').upload(fileName, file);
        if (sError) throw sError;

        const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        let dataToInsert = {};

        if (tipo === 'productos') {
            dataToInsert = { 
                nombre: mainTitle.value, 
                precio: parseFloat(prodPrice.value), 
                categoria: prodCategory.value, 
                image_url: publicUrl, 
                image_path: fileName 
            };
        } else if (tipo === 'gallery') {
            dataToInsert = {
                titulo: mainTitle.value,
                subtitulo: gallerySubtitle.value,
                categoria: prodCategory.value,
                image_url: publicUrl, 
                image_path: fileName
            }; // <-- Aquí faltaba esta llave
        } else if (tipo === 'slider') {
            dataToInsert = { 
                url: publicUrl, 
                alt_text: mainTitle.value || "Imagen de slider", //
                image_path: fileName 
            };
        }

        // 4. INSERTAR EN TABLA
        const { error: dbError } = await supabase.from(tipo).insert([dataToInsert]);

        if (dbError) {
            console.error("Error de inserción en Supabase:", dbError);
            throw new Error(`Error en base de datos: ${dbError.message}`);
        }

        alert("¡Guardado correctamente!");
        productForm.reset();
        fetchData();

    } catch (err) {
        console.error("Causa del error:", err);
        alert("Error: " + err.message);
    } finally {
        btn.disabled = false;
    }
});

// 5. Eliminar (IMPORTANTE: window. para que funcione con onclick)
window.deleteItem = async function(id, path, tabla) {
    if (!confirm(`¿Eliminar de ${tabla}?`)) return;
    const { error: dbError } = await supabase.from(tabla).delete().eq('id', id);
    if (path) await supabase.storage.from('product-images').remove([path]);
    if (!dbError) fetchData();
    else alert("Error al eliminar");
}

// 6. Auth y Salida
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) window.location.href = "login.html";
    else fetchData();
}

document.getElementById('btn-logout').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
});

checkAuth();