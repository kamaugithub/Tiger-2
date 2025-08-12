// customers.js

// Sample customer data
const customers = [
  { id: 1, name: "John Doe", contact: "0712345678", location: "Nairobi" },
  { id: 2, name: "Jane Smith", contact: "0723456789", location: "Mombasa" },
  { id: 3, name: "Samuel Green", contact: "0734567890", location: "Kisumu" },
  { id: 4, name: "Alice Brown", contact: "0745678901", location: "Nakuru" },
];

// References to DOM elements
const customerTableBody = document.getElementById("customer-table-body");
const customerSearchInput = document.getElementById("customer-search");

const manageCustomersDiv = document.getElementById("manage-customers");
const editCustomerDiv = document.getElementById("edit-customer");

const editCustomerForm = document.getElementById("edit-customer-form");
const editNameInput = document.getElementById("edit-name");
const editContactInput = document.getElementById("edit-contact");
const editLocationInput = document.getElementById("edit-location");

let currentEditingCustomerId = null;

// Function to render customer rows based on data & optional filter
function renderCustomers(filter = "") {
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  customerTableBody.innerHTML = "";

  if (filteredCustomers.length === 0) {
    customerTableBody.innerHTML = `<tr><td colspan="5" class="text-muted">No customers found.</td></tr>`;
    return;
  }

  filteredCustomers.forEach((cust, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${cust.name}</td>
      <td>${cust.contact}</td>
      <td>${cust.location}</td>
      <td>
        <button class="edit-btn" data-id="${cust.id}">Edit</button>
        <button class="delete-btn" data-id="${cust.id}">Delete</button>
      </td>
    `;

    customerTableBody.appendChild(tr);
  });

  // Add event listeners for edit/delete buttons
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      startEditCustomer(id);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      deleteCustomer(id);
    });
  });
}

// Start editing a customer by filling form and switching tab
function startEditCustomer(id) {
  const cust = customers.find(c => c.id === id);
  if (!cust) return;

  currentEditingCustomerId = id;

  editNameInput.value = cust.name;
  editContactInput.value = cust.contact;
  editLocationInput.value = cust.location;

  activateCustomerTab(
    document.querySelector("#customers-card .top-buttons .sku-button:nth-child(2)"),
    "edit-customer"
  );
}

// Delete customer from array and re-render
function deleteCustomer(id) {
  const confirmed = confirm("Are you sure you want to delete this customer?");
  if (!confirmed) return;

  const index = customers.findIndex(c => c.id === id);
  if (index > -1) {
    customers.splice(index, 1);
    renderCustomers(customerSearchInput.value);
  }
}

// Handle form submission to update customer data
editCustomerForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!currentEditingCustomerId) return;

  const updatedName = editNameInput.value.trim();
  const updatedContact = editContactInput.value.trim();
  const updatedLocation = editLocationInput.value.trim();

  if (!updatedName || !updatedContact || !updatedLocation) {
    alert("Please fill all fields.");
    return;
  }

  const custIndex = customers.findIndex(c => c.id === currentEditingCustomerId);
  if (custIndex > -1) {
    customers[custIndex] = {
      id: currentEditingCustomerId,
      name: updatedName,
      contact: updatedContact,
      location: updatedLocation,
    };
  }

  currentEditingCustomerId = null;

  // Switch back to Manage Customers tab and re-render
  activateCustomerTab(
    document.querySelector("#customers-card .top-buttons .sku-button:nth-child(1)"),
    "manage-customers"
  );
  renderCustomers(customerSearchInput.value);
});

// Search input event to filter customers
customerSearchInput.addEventListener("input", e => {
  renderCustomers(e.target.value);
});

// Tab activation function (called from HTML inline onclick)
function activateCustomerTab(button, targetId) {
  // Hide all customer content sections
  document.querySelectorAll("#customers-card .inner-card").forEach(card => {
    card.classList.add("hidden");
  });

  // Show the selected content
  document.getElementById(targetId).classList.remove("hidden");

  // Update button styles
  const buttons = document.querySelectorAll("#customers-card .top-buttons .sku-button");
  buttons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// Initial render
renderCustomers();
