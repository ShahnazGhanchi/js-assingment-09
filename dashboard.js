
document.addEventListener("DOMContentLoaded", () => {

document.getElementById("toggleBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
});


// ✅ Check user login
const user = localStorage.getItem("userName");
if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("userName").innerText = user;
}
});

// ✅ Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userName");
  window.location.href = "index.html";
});

// ✅ Fetch & Display Products
let allProducts = [];

const fetchProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    allProducts = data.products;
    showProducts(allProducts);
    fillCategories(allProducts);
  } catch (err) {
    console.error("Error fetching:", err);
    document.getElementById("productsContainer").innerHTML = "<p>Error loading products.</p>";
  }
};


const showProducts = (products) => {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";
  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    container.innerHTML += `
      <div class="card shadow-sm" style="width: 18rem;">
        <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="fw-bold">$${p.price}</p>
          <p class="text-muted">${p.category}</p>
        </div>
      </div>
    `;
  });
};

// ✅ Fill categories
const fillCategories = (products) => {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById("categoryFilter");
  select.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
};

// ✅ Search filter
document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(term));
  showProducts(filtered);
});

// ✅ Category filter
document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const category = e.target.value;
  const filtered = category
    ? allProducts.filter(p => p.category === category)
    : allProducts;
  showProducts(filtered);
});

// ✅ Run on load
fetchProducts();