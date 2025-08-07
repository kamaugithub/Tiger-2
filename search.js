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
  }

  // === Sidebar link click: show target card ===
  const navLinks = document.querySelectorAll('.nav-links a');
  const allCards = document.querySelectorAll('.slide-in-card');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;

      // Hide all cards
      allCards.forEach(card => card.classList.add('hidden'));

      // Show the matching card
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.classList.remove('hidden');
      }

      // Optional: highlight active link
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
});

// === Back button logic (called inline in HTML) ===
function resetView() {
  document.querySelectorAll('.slide-in-card').forEach(card => {
    card.classList.add('hidden');
  });

  // Optional: remove active class from sidebar
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });
}
