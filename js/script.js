document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  toggle.addEventListener('click', () => {
    const isExpanded = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isExpanded);
    nav.setAttribute('aria-hidden', !isExpanded);
  });

  // Optional: Hide menu on link click (mobile UX)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    });
  });
});



