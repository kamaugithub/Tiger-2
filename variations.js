// ===== Variations Data =====
const variations = {}; 
// format: { productIndex: [ { name: "Color", value: "Red" }, ... ] }

// ===== DOM Elements =====
const variationTableBody = document.getElementById('variation-table-body');
const variationForm = document.getElementById('variation-form');
const variationNameInput = document.getElementById('variation-name');
const variationValueInput = document.getElementById('variation-value');

// keep track of context
let currentProductIndex = null;
let editingVariationIndex = null;

// ===== Open Variations Tab (called from products.js) =====
function openVariationsTab(product, index) {
    currentProductIndex = index;

    // make the variations card visible
    document.getElementById('variations-card').classList.remove('hidden');

    // switch to "view-variations"
    const variationsBtn = document.querySelector("#variations-card .sku-button[onclick*='view-variations']");
    if (variationsBtn) {
        activateVariationTab(variationsBtn, 'view-variations');
    }

    renderVariations();
}
// ===== Event Listeners =====
variationForm.addEventListener('submit', e => {
    e.preventDefault();
    if (currentProductIndex === null) return;

    const newVar = {
        name: variationNameInput.value.trim(),
        value: variationValueInput.value.trim()
    };

    if (!variations[currentProductIndex]) {
        variations[currentProductIndex] = [];
    }

    if (editingVariationIndex !== null) {
        variations[currentProductIndex][editingVariationIndex] = newVar;
    } else {
        variations[currentProductIndex].push(newVar);
    }

    editingVariationIndex = null;
    variationForm.reset();
    renderVariations();
});

// ===== Render Variations =====
function renderVariations() {
    variationTableBody.innerHTML = '';

    const list = variations[currentProductIndex] || [];
    if (list.length === 0) {
        variationTableBody.innerHTML = `<tr><td colspan="3" class="text-muted text-center">No variations found.</td></tr>`;
        return;
    }

    list.forEach((v, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center">${idx + 1}</td>
            <td class="text-center">${v.name}</td>
            <td class="text-center">${v.value}</td>
            <td class="action-icons">
                <i class="fas fa-pen edit-var" title="Edit"></i>
                <i class="fas fa-trash delete-var" title="Delete"></i>
            </td>
        `;

        row.querySelector('.edit-var').addEventListener('click', () => {
            variationNameInput.value = v.name;
            variationValueInput.value = v.value;
            editingVariationIndex = idx;
        });

        row.querySelector('.delete-var').addEventListener('click', () => {
            if (confirm(`Delete variation "${v.name}: ${v.value}"?`)) {
                variations[currentProductIndex].splice(idx, 1);
                renderVariations();
            }
        });

        variationTableBody.appendChild(row);
    });
}

// ===== Tab Activation for Variations =====
function activateVariationTab(button, targetId) {
    const allSections = document.querySelectorAll('#variations-card .inner-card');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });

    const allButtons = document.querySelectorAll('#variations-card .top-buttons .sku-button');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(targetId).classList.remove('hidden');
    button.classList.add('active');
}
