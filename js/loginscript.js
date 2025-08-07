document.addEventListener('DOMContentLoaded', () => {
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
