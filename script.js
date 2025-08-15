document.addEventListener('DOMContentLoaded', () => {
  // === Sidebar toggle ===
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isExpanded);
      nav.setAttribute('aria-hidden', !isExpanded);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // === Welcome Name ===
  const nameEl = document.getElementById("welcome-name");
  if (nameEl) {
    const userEmail = "mathew@example.com";
    nameEl.textContent = userEmail.split("@")[0];
  }

  // === Current Date ===
  const dateEl = document.getElementById("current-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // === Sidebar Navigation - Load Dynamic Sections ===
  const sidebarLinks = document.querySelectorAll('.nav-links a[data-target]');
  const allSections = document.querySelectorAll('section');
  const searchButtonsContainer = document.getElementById('search-buttons'); // added for controlling buttons

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (!targetSection) {
        console.warn(`Missing section: ${targetId}`);
        return;
      }

      allSections.forEach(section => section.classList.add('hidden'));
      targetSection.classList.remove('hidden');
      targetSection.scrollIntoView({ behavior: 'smooth' });

      if (targetId === "dynamic-content") {
        document.getElementById("dynamic-title").textContent = "Manage Stock Issues";
      }

      // Show search buttons only when clicking Search sidebar link (targetId === 'search-card')
      if (searchButtonsContainer) {
        if (targetId === 'search-card') {
          searchButtonsContainer.classList.remove('hidden');
        } else {
          searchButtonsContainer.classList.add('hidden');
        }
      }
    });
  });

  // === Tab Switcher ===
  window.showTab = function (tab) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    document.querySelector(".tab-content." + tab)?.classList.remove("hidden");

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => {
      if (t.textContent.toLowerCase().includes(tab)) t.classList.add("active");
    });
  };

  // === Reset View Button ===
  window.resetView = function () {
    allSections.forEach(section => section.classList.add('hidden'));
    document.getElementById("default-content").classList.remove('hidden');

    // Hide search buttons on reset
    if (searchButtonsContainer) {
      searchButtonsContainer.classList.add('hidden');
    }
  };

  // === Manage Units Logic ===
  const unitsCard = document.getElementById("units-card");
  const addUnitCard = document.getElementById("add-unit-card");

  window.showAddUnit = function () {
    if (unitsCard && addUnitCard) {
      unitsCard.classList.add("hidden");
      addUnitCard.classList.remove("hidden");
    }
  };

  // Delegate event handlers for edit/delete unit buttons (in case they are dynamically added later)
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-unit")) {
      if (unitsCard && addUnitCard) {
        unitsCard.classList.add("hidden");
        addUnitCard.classList.remove("hidden");
      }
    }

    if (e.target.classList.contains("delete-unit")) {
      const row = e.target.closest("tr");
      if (row) row.remove();
    }
  });
});
// === Theme Toggle ===
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkMode = document.body.classList.contains('dark');
    themeToggleBtn.textContent = darkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });

  // Load theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  }
}
