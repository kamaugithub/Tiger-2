document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  //  Check if toggle and nav exist before adding listeners
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isExpanded);
      nav.setAttribute('aria-hidden', !isExpanded);
    });

    // Hide menu on link click (mobile UX)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  //  Success popup on login submit
  const loginForm = document.querySelector('.login-section form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Create and style the popup
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

      // Remove popup and redirect after 2 seconds
      setTimeout(() => {
        popup.remove();
        window.location.href = 'dashboard.html';
      }, 2000);
    });
  }
});





