
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded...");


setTimeout(() => {
    console.log("Hiding loader, showing login form...");
    const loader = document.getElementById("loader");
    const loginSection = document.getElementById("loginSection");

    if (loader) loader.style.display = "none";
    if (loginSection) loginSection.style.display = "block";
  }, 1000);

///////////////log in 
 const loginBtn = document.getElementById("loginBtn");
 if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username && email && password) {
        localStorage.setItem("userName", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Please fill all fields!");
      }
    });
  }
});
//dashboard

const user = localStorage.getItem("userName");
    if (user) {
      document.getElementById("userName").innerText = user;
    } else {
      // Agar user directly dashboard pe aaye bina login ke
      window.location.href = "index.html";
    }
    // /////////IFFFF LOGIN
   
    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById("displayName").innerText = user;
    }
// /////////DATA feact by API
const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        showProducts(data.products);
        fillCategories(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("productsContainer").innerHTML = "<p>Error loading products.</p>";
      }
    };
    // /////DISPLAY PRODUCT IN CARD
    const showProducts = (products) => {
      // console.log(products);
      const container = document.getElementById("productsContainer");
      container.innerHTML = ""; // clear old products
      products.forEach(p => {
        container.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">$${p.price}</p>
              <p class="text-muted">${p.category}</p>
              <button class="btn btn-outline-primary w-100">View Details</button>
            </div>
          </div>
        `;
      });
    };

    // ✅ 4. Filter categories in dropdown
    const fillCategories = (products) => {
      const categories = [...new Set(products.map(p => p.category))];
      const select = document.getElementById("categoryFilter");
      categories.forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    };
    // ✅ 5. Search functionality
    document.getElementById("searchInput").addEventListener("input", async (e) => {
      const term = e.target.value.toLowerCase();
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      const filtered = data.products.filter(p => p.title.toLowerCase().includes(term));
      showProducts(filtered);
    });

    // ✅ 6. Category filter functionality
    document.getElementById("categoryFilter").addEventListener("change", async (e) => {
      const category = e.target.value;
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      const filtered = category
        ? data.products.filter(p => p.category === category)
        : data.products;

      showProducts(filtered);
    });

    // ✅ 7. Run fetch when page loads
    fetchProducts();



  
