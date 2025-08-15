// Categories.js
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const manageCategoriesSection = document.getElementById("manage-categories");
    const addCategorySection = document.getElementById("add-category");
    const categoryTableBody = manageCategoriesSection.querySelector("tbody");
    const addCategoryForm = document.getElementById("add-category-form");
    const categoryNameInput = addCategoryForm.querySelector("input[placeholder='Category Name']");
    const categoryDescInput = addCategoryForm.querySelector("input[placeholder='Branch']");
    const formHeading = addCategorySection.querySelector("h2");

    // Message box
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box hidden';
    addCategorySection.prepend(messageBox);

    // Sample categories
    let categories = [
        { id: 1, name: "Electronics", description: "demo-branch-ramon" },
        { id: 2, name: "Clothing", description: "demo-branch-ramon" },
        { id: 3, name: "Groceries", description: "demo-branch-ramon" }
    ];

    // Track editing
    let editingId = null;

    // Show messages
    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${isError ? 'error' : 'success'}`;
        messageBox.classList.remove('hidden');
        setTimeout(() => messageBox.classList.add('hidden'), 3000);
    }

    // Render table
    function renderCategories() {
        categoryTableBody.innerHTML = "";
        if (categories.length === 0) {
            categoryTableBody.innerHTML = `<tr><td colspan="3" class="text-muted">No categories yet.</td></tr>`;
            return;
        }

        categories.forEach(cat => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${cat.name}</td>
                <td>${cat.description}</td>
                <td class="action-icons">
                    <i class="fas fa-pen edit-category" data-id="${cat.id}" title="Edit"></i>
                    <i class="fas fa-trash delete-category" data-id="${cat.id}" title="Delete"></i>
                </td>
            `;
            categoryTableBody.appendChild(tr);
        });
    }

    // Tab switching
    window.activateCategoryTab = (button, targetId) => {
        document.querySelectorAll('#categories-card .inner-card').forEach(card => card.classList.add('hidden'));
        document.querySelectorAll('#categories-card .top-buttons .sku-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(targetId).classList.remove('hidden');
        button.classList.add('active');

        if (targetId === 'add-category') {
            formHeading.textContent = "Add Category";
            addCategoryForm.reset();
            editingId = null;
        }
    };

    // Edit/Delete click
    categoryTableBody.addEventListener('click', e => {
        const target = e.target;
        const id = Number(target.dataset.id);
        if (isNaN(id)) return;

        const category = categories.find(cat => cat.id === id);
        if (!category) return;

        if (target.classList.contains('edit-category')) {
            // Prefill form with clicked item
            editingId = id;
            categoryNameInput.value = category.name;
            categoryDescInput.value = category.description;
            formHeading.textContent = "Edit Category";

            // Show Add/Edit form in place of table
            activateCategoryTab(
                document.querySelector("#categories-card .top-buttons .sku-button:last-child"),
                'add-category'
            );
        }

        if (target.classList.contains('delete-category')) {
            if (confirm("Are you sure you want to delete this category?")) {
                const index = categories.findIndex(cat => cat.id === id);
                if (index > -1) {
                    categories.splice(index, 1);
                    renderCategories();
                    showMessage("Category deleted successfully!");
                }
            }
        }
    });

    // Form submit (Add/Edit)
    addCategoryForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = categoryNameInput.value.trim();
        const desc = categoryDescInput.value.trim();

        if (!name) return showMessage("Category name cannot be empty.", true);

        if (editingId !== null) {
            // Update
            const index = categories.findIndex(cat => cat.id === editingId);
            if (index === -1) return showMessage("Category not found.", true);
            if (categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingId)) {
                return showMessage("Category name already exists.", true);
            }
            categories[index].name = name;
            categories[index].description = desc;
            editingId = null;
            showMessage("Category updated successfully!");
        } else {
            // Add new
            if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
                return showMessage("Category name already exists.", true);
            }
            const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
            categories.push({ id: newId, name, description: desc });
            showMessage("Category added successfully!");
        }

        addCategoryForm.reset();
        renderCategories();

        // Return to list view
        activateCategoryTab(
            document.querySelector("#categories-card .top-buttons .sku-button:first-child"),
            'manage-categories'
        );
    });

    // Initial render
    renderCategories();
});
