document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙";
  }

  // Listen for toggle click
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
