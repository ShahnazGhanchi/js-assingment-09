
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && email && password) {
    localStorage.setItem("userName", username);
    window.location.href = "dashboard.html";
  } else {
    alert("⚠️ Please fill all fields!");
  }
});