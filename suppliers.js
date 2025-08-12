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

    // For now, just alert and reset; you can expand to actually add a row or call backend
    alert(`Added supplier:\nName: ${name}\nContact: ${contact}\nLocation: ${location}`);
    form.reset();

    // Switch back to Manage Suppliers tab
    activateSupplierTab(document.querySelector('#suppliers-card .top-buttons .sku-button'), 'manage-suppliers');
  });
}

// Optional: placeholder for Edit/Delete click handlers (enhance as needed)
function setupSupplierActions() {
  const tableBody = document.querySelector('#manage-suppliers tbody');
  if (!tableBody) return;

  tableBody.addEventListener('click', (e) => {
    const target = e.target;

    if (target.textContent.toLowerCase().includes('edit')) {
      alert('Edit Supplier - feature to be implemented');
      // Add your edit logic here
    }

    if (target.textContent.toLowerCase().includes('delete')) {
      if (confirm('Are you sure you want to delete this supplier?')) {
        const row = target.closest('tr');
        if (row) row.remove();
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

// Run the initialization when DOM is loaded or when you load the suppliers section
document.addEventListener('DOMContentLoaded', () => {
  initSuppliersSection();
});
