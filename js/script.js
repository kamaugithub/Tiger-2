document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  // Navigation toggle for mobile UX
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

  // Simulated email (later to be replaced with user data from database)
  const userEmail = "mathew@example.com"; 
  const displayName = userEmail.split("@")[0];

  // Inject user's name into welcome section
  const nameEl = document.getElementById("welcome-name");
  if (nameEl) nameEl.textContent = displayName;

  // Inject today's date into dashboard
  const dateEl = document.getElementById("current-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // Login success popup simulation
  const loginForm = document.querySelector('.login-section form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const popup = document.createElement('div');
      popup.textContent = 'Login successful! Welcome!';
      popup.style.position = 'fixed';
      popup.style.top = '20px';
      popup.style.left = '50%';
      popup.style.transform = 'translateX(-50%)';
      popup.style.backgroundColor = '#2ecc71';
      popup.style.color = '#fff';
      popup.style.padding = '12px 24px';
      popup.style.borderRadius = '6px';
      popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      popup.style.zIndex = '1000';
      popup.style.fontWeight = 'bold';
      popup.style.fontSize = '16px';

      document.body.appendChild(popup);

      setTimeout(() => {
        popup.remove();
        window.location.href = 'dashboard.html';
      }, 2000);
    });
  }
});
