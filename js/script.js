document.addEventListener('DOMContentLoaded', () => {
  // Toggle only if the element exists
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

  // Welcome Name
  const nameEl = document.getElementById("welcome-name");
  if (nameEl) {
    const userEmail = "mathew@example.com";
    nameEl.textContent = userEmail.split("@")[0];
  }

  // Current Date
  const dateEl = document.getElementById("current-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // Sidebar Nav
  const sidebarLinks = document.querySelectorAll(".nav-links a");
  const dynamicContent = document.getElementById("dynamic-content");
  const dynamicTitle = document.getElementById("dynamic-title");
  const defaultContent = document.getElementById("default-content");

  if (sidebarLinks.length && dynamicContent && dynamicTitle && defaultContent) {
    sidebarLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = link.textContent.trim();
        dynamicTitle.textContent = section;
        defaultContent.classList.add("hidden");
        dynamicContent.classList.remove("hidden");
        dynamicContent.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Login popup simulation
  const loginForm = document.querySelector('.login-section form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const popup = document.createElement('div');
    popup.textContent = 'Login successful!';
    Object.assign(popup.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#2ecc71',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: '1000',
      fontWeight: 'bold',
      fontSize: '16px'
    });

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
     
      window.location.href = 'dashboard.html';
    }, 2000);
  });
}

});

// Make these global
function resetView() {
  document.getElementById("dynamic-content")?.classList.add("hidden");
  document.getElementById("default-content")?.classList.remove("hidden");
}

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelector(".tab-content." + tab)?.classList.remove("hidden");

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => {
    if (t.textContent.toLowerCase().includes(tab)) t.classList.add("active");
  });
}
