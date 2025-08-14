// ======= Customers JS =======

const customers = [
  { id: 1, name: "John Doe", contact: "0712345678", location: "Nairobi" },
  { id: 2, name: "Jane Smith", contact: "0723456789", location: "Mombasa" },
  { id: 3, name: "Samuel Green", contact: "0734567890", location: "Kisumu" },
  { id: 4, name: "Alice Brown", contact: "0745678901", location: "Nakuru" },
];

const customerTableBody = document.getElementById("customer-table-body");
const customerSearchInput = document.getElementById("customer-search");
const editCustomerForm = document.getElementById("edit-customer-form");
const editNameInput = document.getElementById("edit-name");
const editContactInput = document.getElementById("edit-contact");
const editLocationInput = document.getElementById("edit-location");

let currentEditingCustomerId = null;

// Render customers table with optional search filter
function renderCustomers(filter = "") {
  const filtered = customers.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  customerTableBody.innerHTML = "";
  if (!filtered.length) {
    customerTableBody.innerHTML = `<tr><td colspan="5" class="text-muted">No customers found.</td></tr>`;
    return;
  }

  filtered.forEach((cust, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${cust.name}</td>
      <td>${cust.contact}</td>
      <td>${cust.location}</td>
      <td class="action-icons">
        <i class="fas fa-pen edit-customer" data-id="${cust.id}" title="Edit"></i>
        <i class="fas fa-trash delete-customer" data-id="${cust.id}" title="Delete"></i>
      </td>
    `;
    customerTableBody.appendChild(tr);
  });
}

// Handle Edit/Delete icon clicks
customerTableBody.addEventListener('click', e => {
  const target = e.target;
  const id = Number(target.dataset.id);
  if (!id) return;

  const customer = customers.find(c => c.id === id);
  if (!customer) return;

  // Edit customer
  if (target.classList.contains('edit-customer')) {
    currentEditingCustomerId = id;
    editNameInput.value = customer.name;
    editContactInput.value = customer.contact;
    editLocationInput.value = customer.location;
    activateCustomerTab(
      document.querySelector("#customers-card .top-buttons .sku-button:nth-child(2)"),
      "edit-customer"
    );
  }

  // Delete customer
  if (target.classList.contains('delete-customer')) {
    if (confirm("Are you sure you want to delete this customer?")) {
      const index = customers.findIndex(c => c.id === id);
      if (index > -1) customers.splice(index, 1);
      renderCustomers(customerSearchInput.value);
    }
  }
});

// Handle Edit Customer form submission
editCustomerForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!currentEditingCustomerId) return;

  const updated = {
    id: currentEditingCustomerId,
    name: editNameInput.value.trim(),
    contact: editContactInput.value.trim(),
    location: editLocationInput.value.trim()
  };

  if (!updated.name || !updated.contact || !updated.location) return alert("Please fill all fields");

  const index = customers.findIndex(c => c.id === currentEditingCustomerId);
  customers[index] = updated;

  currentEditingCustomerId = null;
  activateCustomerTab(
    document.querySelector("#customers-card .top-buttons .sku-button:nth-child(1)"),
    "manage-customers"
  );
  renderCustomers(customerSearchInput.value);
});

// Search input
customerSearchInput.addEventListener('input', e => renderCustomers(e.target.value));

// Switch between Manage/Edit tabs
function activateCustomerTab(button, targetId) {
  document.querySelectorAll("#customers-card .inner-card").forEach(card => card.classList.add("hidden"));
  document.getElementById(targetId).classList.remove("hidden");
  document.querySelectorAll("#customers-card .sku-button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// Initial render
renderCustomers();
