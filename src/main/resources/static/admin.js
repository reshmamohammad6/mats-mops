// Navigation logic
document.querySelectorAll('.sidebar li[data-target]').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        const targetId = item.getAttribute('data-target');
        
        // Hide all sections, then show the target
        document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.animation = 'fadeIn 0.4s ease';
        }
    });
});

// Helper to show messages
function showMessage(elementId, message, isSuccess) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `msg show ${isSuccess ? 'success' : 'error'}`;
    setTimeout(() => { el.className = 'msg'; }, 5000);
}

let allProducts = [];
let currentPage = 1;
const itemsPerPage = 6;

async function fetchProducts() {
    try {
        const res = await fetch('/api/admin/products');
        allProducts = (await res.json()).reverse();
        renderProducts();
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

function renderProducts() {
    const tbody = document.querySelector('#productsTable tbody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = allProducts.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageProducts.map(p => `
        <tr>
            <td><img src="${p.image}" alt="${p.productName}" onerror="this.src='https://via.placeholder.com/40'"></td>
            <td><strong>${p.productName}</strong></td>
            <td><span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">${p.categoryKey}</span></td>
            <td>${p.price}</td>
            <td>
                <button onclick="deleteProduct(${p.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
            </td>
        </tr>
    `).join('');
    
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('productPagination');
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button onclick="goToPage(${i})" style="padding: 5px 10px; cursor: pointer; background: ${i === currentPage ? '#c69739' : '#333'}; color: white; border: none; border-radius: 4px;">${i}</button>`;
    }
    pagination.innerHTML = buttons;
}

function goToPage(page) {
    currentPage = page;
    renderProducts();
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
        const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showMessage('productMsg', 'Product deleted successfully!', true);
            // Adjust page if current page becomes empty
            if (allProducts.length > 0 && (allProducts.length - 1) % itemsPerPage === 0 && currentPage > 1 && currentPage === Math.ceil(allProducts.length / itemsPerPage)) {
                currentPage--;
            }
            fetchProducts();
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (err) {
        showMessage('productMsg', err.message, false);
    }
}

// Fetch and render categories
async function fetchCategories() {
    try {
        const res = await fetch('/api/admin/categories');
        const categories = await res.json();
        const tbody = document.querySelector('#categoriesTable tbody');
        
        tbody.innerHTML = categories.reverse().map(c => `
            <tr>
                <td><img src="${c.image}" alt="${c.productName}" onerror="this.src='https://via.placeholder.com/40'"></td>
                <td><strong>${c.productName}</strong></td>
                <td><small style="color: #94a3b8">${c.description}</small></td>
                <td>
                    <button onclick="deleteCategory(${c.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error("Error fetching categories:", err);
    }
}

async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
        const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showMessage('categoryMsg', 'Category deleted successfully!', true);
            fetchCategories();
        } else {
            throw new Error('Failed to delete category');
        }
    } catch (err) {
        showMessage('categoryMsg', err.message, false);
    }
}

// Add Product Submit
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Adding...';
    btn.disabled = true;

    const imageFile = document.getElementById('p_image').files[0];
    if (!imageFile) {
        alert("Please select an image");
        btn.textContent = 'Add Product';
        btn.disabled = false;
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", imageFile);
        
        const uploadRes = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!uploadRes.ok) throw new Error("Image upload failed");
        
        const uploadData = await uploadRes.json();
        const imageUrl = uploadData.url;

        const product = {
            productName: document.getElementById('p_name').value,
            price: document.getElementById('p_price').value,
            description: document.getElementById('p_desc').value,
            image: imageUrl,
            categoryKey: document.getElementById('p_category').value
        };

        const res = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        
        if (res.ok) {
            showMessage('productMsg', 'Product added successfully!', true);
            document.getElementById('productForm').reset();
            fetchProducts(); // Refresh list
        } else {
            throw new Error('Failed to add product');
        }
    } catch (err) {
        showMessage('productMsg', err.message, false);
    } finally {
        btn.textContent = 'Add Product';
        btn.disabled = false;
    }
});

// Add Category Submit
document.getElementById('categoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Adding...';
    btn.disabled = true;

    const imageFile = document.getElementById('c_image').files[0];
    if (!imageFile) {
        alert("Please select an image");
        btn.textContent = 'Add Category';
        btn.disabled = false;
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();

        const category = {
            productName: document.getElementById('c_name').value,
            description: document.getElementById('c_desc').value,
            image: uploadData.url
        };

        const res = await fetch('/api/admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });
        
        if (res.ok) {
            showMessage('categoryMsg', 'Category added successfully!', true);
            document.getElementById('categoryForm').reset();
            fetchCategories(); // Refresh list
        } else {
            throw new Error('Failed to add category');
        }
    } catch (err) {
        showMessage('categoryMsg', err.message, false);
    } finally {
        btn.textContent = 'Add Category';
        btn.disabled = false;
    }
});

// Initial fetch
fetchProducts();
fetchCategories();
