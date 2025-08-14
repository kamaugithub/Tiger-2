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
const viewBtn = document.getElementById('view-products-btn');
const editBtn = document.getElementById('add-edit-btn');
const viewSection = document.getElementById('products-view');
const productSearchInput = document.getElementById('product-search');

// Add/Edit Card Elements
const addEditCard = document.getElementById('add-edit-card');
const formTitle = document.getElementById('form-title');
const productForm = document.getElementById('product-form');
const cancelEditBtn = document.getElementById('cancel-edit');
const categoryInput = document.getElementById('product-category');
const nameInput = document.getElementById('product-name');

// Optional Variation section
const variationSection = document.getElementById('variation-view');

let editingIndex = null;

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
      <td class="hover-highlight text-center">${product.category}</td>
      <td class="hover-highlight text-center">${product.name}</td>
      <td>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <i class="fas fa-pen edit-icon cursor-pointer" title="Edit"></i>
          <i class="fas fa-trash delete-icon cursor-pointer" title="Delete"></i>
          <button class="btn btn-success btn-sm manage-variations">Manage Variations</button>
        </div>
      </td>
    `;

    row.querySelector('.edit-icon').addEventListener('click', () => openEditCard(index));
    row.querySelector('.delete-icon').addEventListener('click', () => deleteProduct(index));
    row.querySelector('.manage-variations').addEventListener('click', () => manageVariations(index));

    productTableBody.appendChild(row);
  });
}

// ===== Open Add/Edit Card =====
editBtn.addEventListener('click', () => {
  formTitle.textContent = 'Add Product';
  categoryInput.value = '';
  nameInput.value = '';
  editingIndex = null;
  showCard();
});

// ===== Edit Product =====
function openEditCard(index) {
  const product = products[index];
  formTitle.textContent = 'Edit Product';
  categoryInput.value = product.category;
  nameInput.value = product.name;
  editingIndex = index;
  showCard();
}

// ===== Save Product =====
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
  hideCard();
});

// ===== Cancel Button =====
cancelEditBtn.addEventListener('click', hideCard);

// ===== Show/Hide Card =====
function showCard() {
  viewSection.classList.add('d-none'); // hide table
  if (variationSection) variationSection.classList.add('d-none');
  addEditCard.classList.remove('hidden');
  setTimeout(() => addEditCard.classList.add('visible'), 10);
}

function hideCard() {
  addEditCard.classList.remove('visible');
  setTimeout(() => {
    addEditCard.classList.add('hidden');
    viewSection.classList.remove('d-none'); // show table again
  }, 300);
}

// ===== Delete Product =====
function deleteProduct(index) {
  if (confirm(`Are you sure you want to delete "${products[index].name}"?`)) {
    products.splice(index, 1);
    renderProducts(productSearchInput.value.trim().toLowerCase());
  }
}

// ===== Manage Variations =====
function manageVariations(index) {
  if (!variationSection) return;
  viewSection.classList.add('d-none');
  variationSection.classList.remove('d-none');

  variationSection.innerHTML = `
    <h6 class="fw-bold">Manage Variations for "${products[index].name}"</h6>
    <p class="text-muted">(Placeholder: Add variation management UI here)</p>
    <button class="btn-gray mt-2" id="back-to-view">Back</button>
  `;

  document.getElementById('back-to-view').addEventListener('click', () => {
    variationSection.classList.add('d-none');
    viewSection.classList.remove('d-none');
  });
}

// ===== Live Search =====
productSearchInput.addEventListener('input', () => {
  const query = productSearchInput.value.trim().toLowerCase();
  renderProducts(query);
});

// ===== Initial Render =====
renderProducts();
