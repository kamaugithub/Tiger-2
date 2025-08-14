document.addEventListener("DOMContentLoaded", () => {
  // Tabs buttons
  const listTabBtn = document.querySelector("#categories-card .top-buttons .sku-button:first-child");
  const addTabBtn = document.querySelector("#categories-card .top-buttons .sku-button:last-child");

  // Sections
  const listSection = document.getElementById("manage-categories");
  const addSection = document.getElementById("add-category");

  // Category list table body
  const categoryTableBody = listSection.querySelector("tbody");

  // Add category form
  const addCategoryForm = document.getElementById("add-category-form");
  const categoryNameInput = addCategoryForm.querySelector("input[placeholder='Category Name']");
  const categoryDescInput = addCategoryForm.querySelector("input[placeholder='Description']");

  // Track editing state
  let editIndex = null;

  // Initial categories
  let categories = [
    { name: "Electronics", description: "demo-branch-ramon" },
    { name: "Clothing", description: "demo-branch-ramon" },
    { name: "Groceries", description: "demo-branch-ramon" }
  ];

  // Render categories in table
  function renderCategories() {
    categoryTableBody.innerHTML = "";
    if (categories.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="3" class="text-muted">No categories yet.</td>`;
      categoryTableBody.appendChild(tr);
      return;
    }

    categories.forEach((cat, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${cat.name}</td>
        <td>${cat.description}</td>
        <td class="action-icons">
          <i class="fas fa-pen edit-category" data-index="${index}" title="Edit"></i>
          <i class="fas fa-trash delete-category" data-index="${index}" title="Delete"></i>
        </td>
      `;
      categoryTableBody.appendChild(tr);
    });

    // Delete functionality
    categoryTableBody.querySelectorAll(".delete-category").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        categories.splice(idx, 1);
        renderCategories();
      });
    });

    // Edit functionality
    categoryTableBody.querySelectorAll(".edit-category").forEach(btn => {
      btn.addEventListener("click", () => {
        editIndex = btn.getAttribute("data-index");
        const cat = categories[editIndex];
        categoryNameInput.value = cat.name;
        categoryDescInput.value = cat.description;
        // Switch to Add Category tab for editing
        addTabBtn.click();
      });
    });
  }

  // Tab switching
  listTabBtn.addEventListener("click", () => {
    listSection.classList.remove("hidden");
    addSection.classList.add("hidden");
    listTabBtn.classList.add("active");
    addTabBtn.classList.remove("active");
  });

  addTabBtn.addEventListener("click", () => {
    addSection.classList.remove("hidden");
    listSection.classList.add("hidden");
    addTabBtn.classList.add("active");
    listTabBtn.classList.remove("active");
  });

  // Add / Update category
  addCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = categoryNameInput.value.trim();
    const desc = categoryDescInput.value.trim();

    if (!name) {
      alert("Category name cannot be empty.");
      return;
    }

    if (editIndex !== null) {
      // Update existing category
      if (categories.some((c, i) => c.name.toLowerCase() === name.toLowerCase() && i != editIndex)) {
        alert("Category name already exists.");
        return;
      }
      categories[editIndex] = { name, description: desc };
      editIndex = null;
      alert("Category updated successfully!");
    } else {
      // Add new category
      if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert("Category already exists.");
        return;
      }
      categories.push({ name, description: desc });
      alert("Category added successfully!");
    }

    categoryNameInput.value = "";
    categoryDescInput.value = "";
    renderCategories();
    // Switch back to list tab
    listTabBtn.click();
  });

  // Initial render and show list
  renderCategories();
  listTabBtn.click();
});
