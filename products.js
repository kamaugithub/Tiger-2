// ===== Product Data =====
const products = [
    { category: 'charger-B', name: 'Samsung' },
    { category: 'charger', name: 'Type-B' },
    { category: 'tvs', name: 'Hotpoint' },
    { category: 'Fridge', name: 'Hotpoint' },
    { category: 'tvs', name: 'LG' },
    { category: 'tvs', name: 'Sony' }
];

// ===== DOM Elements =====
const productTableBody = document.getElementById('product-table-body');
const productSearchInput = document.getElementById('product-search');

// Add/Edit Product Card Elements
const productForm = document.getElementById('product-form');
const categoryInput = document.getElementById('product-category');
const nameInput = document.getElementById('product-name');

let editingIndex = null; // only declare once

// ===== Event Listeners =====
productForm.addEventListener('submit', e => {
    e.preventDefault();
    const updatedProduct = {
        category: categoryInput.value.trim(),
        name: nameInput.value.trim()
    };

    if (editingIndex !== null) {
        products[editingIndex] = updatedProduct;
    } else {
        products.push(updatedProduct);
    }

    renderProducts(productSearchInput.value.trim().toLowerCase());
    
    // Switch back to the 'manage-products' tab and set the active button
    const viewProductsBtn = document.querySelector(".sku-button[onclick*='manage-products']");
    activateProductTab(viewProductsBtn, 'manage-products');
});

productSearchInput.addEventListener('input', () => {
    const query = productSearchInput.value.trim().toLowerCase();
    renderProducts(query);
});

// ===== Render Products Function =====
function renderProducts(filter = '') {
    productTableBody.innerHTML = '';
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter) ||
        product.category.toLowerCase().includes(filter)
    );

    if (filteredProducts.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" class="text-muted text-center">No products found.</td>`;
        productTableBody.appendChild(row);
        return;
    }

    filteredProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${product.category}</td>
            <td class="text-center">${product.name}</td>
            <td class="action-icons">
                <i class="fas fa-pen edit-icon" title="Edit"></i>
                <i class="fas fa-trash delete-icon" title="Delete"></i>
                <button class="manage-variations-btn">Manage Variations</button>
            </td>
        `;

        // Edit
        row.querySelector('.edit-icon').addEventListener('click', () => {
            document.getElementById('add-product').querySelector('h2').textContent = 'Edit Product';
            categoryInput.value = product.category;
            nameInput.value = product.name;
            editingIndex = index;
            const addEditBtn = document.querySelector(".sku-button[onclick*='add-product']");
            activateProductTab(addEditBtn, 'add-product');
        });

        // Delete
        row.querySelector('.delete-icon').addEventListener('click', () => deleteProduct(index));

        // Manage Variations (➡ talk to variations.js)
        row.querySelector('.manage-variations-btn').addEventListener('click', () => {
            if (typeof openVariationsTab === "function") {
                openVariationsTab(product, index); 
            } else {
                alert("Variations module not loaded.");
            }
        });

        productTableBody.appendChild(row);
    });
}

// ===== Delete Product =====
function deleteProduct(index) {
    if (confirm(`Are you sure you want to delete "${products[index].name}"?`)) {
        products.splice(index, 1);
        renderProducts(productSearchInput.value.trim().toLowerCase());
    }
}

// ===== Tab Activation Function =====
function activateProductTab(button, targetId) {
    const allSections = document.querySelectorAll('#products-card .inner-card');
    allSections.forEach(section => section.classList.add('hidden'));

    const allButtons = document.querySelectorAll('#products-card .top-buttons .sku-button');
    allButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(targetId).classList.remove('hidden');
    button.classList.add('active');

    if (targetId === 'add-product') {
        document.getElementById('add-product').querySelector('h2').textContent = 'Add Product';
        categoryInput.value = '';
        nameInput.value = '';
        editingIndex = null;
    }

    renderProducts(productSearchInput.value.trim().toLowerCase());
}

// ===== Initial Render =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
