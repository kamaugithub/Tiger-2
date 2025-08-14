// Activate supplier tabs: Manage Suppliers / Add Suppliers
function activateSupplierTab(button, targetId) {
  // Hide all supplier content sections
  document.querySelectorAll('#suppliers-card .inner-card').forEach(card => {
    card.classList.add('hidden');
  });

  // Show the selected content
  document.getElementById(targetId).classList.remove('hidden');

  // Update button styles
  document.querySelectorAll('#suppliers-card .sku-button').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

// Filter suppliers table based on search input
function setupSupplierSearch() {
  const searchInput = document.querySelector('#manage-suppliers .search-input');
  const tableBody = document.querySelector('#manage-suppliers tbody');

  if (!searchInput || !tableBody) return;

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
      const cellsText = Array.from(row.cells).slice(0, 3) // Only first 3 columns (Name, Contact, Location)
        .map(cell => cell.textContent.toLowerCase())
        .join(' ');
      row.style.display = cellsText.includes(filter) ? '' : 'none';
    });
  });
}

// Add Supplier form handling (basic example)
function setupAddSupplierForm() {
  const form = document.querySelector('#add-suppliers form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    const name = inputs[0].value.trim();
    const contact = inputs[1].value.trim();
    const location = inputs[2].value.trim();

    if (!name || !contact || !location) {
      alert('Please fill all fields');
      return;
    }

    // Check if editing an existing row
    const editingRow = form.dataset.editingRow;
    if (editingRow) {
      // Update the existing row
      const row = document.querySelector(`#manage-suppliers tbody tr[data-id='${editingRow}']`);
      if (row) {
        row.cells[0].textContent = name;
        row.cells[1].textContent = contact;
        row.cells[2].textContent = location;
      }
      delete form.dataset.editingRow;
    } else {
      // Add new row
      const tableBody = document.querySelector('#manage-suppliers tbody');
      const newRow = document.createElement('tr');
      const rowId = Date.now(); // simple unique ID
      newRow.dataset.id = rowId;
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${contact}</td>
        <td>${location}</td>
        <td class="action-icons">
          <i class="fas fa-pen edit-supplier" title="Edit"></i>
          <i class="fas fa-trash delete-supplier" title="Delete"></i>
        </td>
      `;
      tableBody.appendChild(newRow);
    }

    form.reset();
    activateSupplierTab(document.querySelector('#suppliers-card .top-buttons .sku-button'), 'manage-suppliers');
  });
}

// Handle Edit/Delete click events
function setupSupplierActions() {
  const tableBody = document.querySelector('#manage-suppliers tbody');
  const form = document.querySelector('#add-suppliers form');
  if (!tableBody || !form) return;

  tableBody.addEventListener('click', (e) => {
    const target = e.target;
    const row = target.closest('tr');
    if (!row) return;

    // Edit supplier
    if (target.classList.contains('edit-supplier')) {
      const cells = row.querySelectorAll('td');
      form.querySelectorAll('input')[0].value = cells[0].textContent;
      form.querySelectorAll('input')[1].value = cells[1].textContent;
      form.querySelectorAll('input')[2].value = cells[2].textContent;
      form.dataset.editingRow = row.dataset.id;

      // Switch to Add Suppliers tab
      activateSupplierTab(document.querySelector('#suppliers-card .top-buttons .sku-button:nth-child(2)'), 'add-suppliers');
    }

    // Delete supplier
    if (target.classList.contains('delete-supplier')) {
      if (confirm('Are you sure you want to delete this supplier?')) {
        row.remove();
      }
    }
  });
}

// Initialize all supplier section behaviors
function initSuppliersSection() {
  setupSupplierSearch();
  setupAddSupplierForm();
  setupSupplierActions();
}

// Run the initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSuppliersSection();
});
