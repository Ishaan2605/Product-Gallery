document.addEventListener("DOMContentLoaded", function () {
    const productGallery = document.getElementById("productGallery");
    const addProductBtn = document.getElementById("addProduct");
    const searchBox = document.getElementById("searchBox");
    const modal = document.getElementById("productModal");
    const closeModal = document.querySelector(".close");
    const saveProductBtn = document.getElementById("saveProduct");
    
    let products = [];
    let editingIndex = null;

    function renderProducts() {
        productGallery.innerHTML = "";
        products.forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" data-index="${index}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p><strong>$${product.price}</strong></p>
                <button onclick="deleteProduct(${index})">Delete</button>
            `;
            productGallery.appendChild(productElement);
        });
    }
    
    addProductBtn.addEventListener("click", function () {
        editingIndex = null;
        document.getElementById("productImage").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productPrice").value = "";
        modal.style.display = "flex";
    });
    
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
    
    saveProductBtn.addEventListener("click", function () {
        const image = document.getElementById("productImage").files[0] ? URL.createObjectURL(document.getElementById("productImage").files[0]) : "images/default.jpg";
        const name = document.getElementById("productName").value;
        const description = document.getElementById("productDescription").value;
        const price = document.getElementById("productPrice").value;
        
        if (editingIndex !== null) {
            products[editingIndex] = { image, name, description, price };
        } else {
            products.push({ image, name, description, price });
        }
        modal.style.display = "none";
        renderProducts();
    });

    searchBox.addEventListener("input", function () {
        const query = searchBox.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            const name = product.querySelector("h4").textContent.toLowerCase();
            product.style.display = name.includes(query) ? "block" : "none";
        });
    });
    
    window.deleteProduct = function (index) {
        products.splice(index, 1);
        renderProducts();
    };

    productGallery.addEventListener("click", function (e) {
        if (e.target.tagName === "IMG") {
            editingIndex = e.target.dataset.index;
            const product = products[editingIndex];
            document.getElementById("productImage").value = "";
            document.getElementById("productName").value = product.name;
            document.getElementById("productDescription").value = product.description;
            document.getElementById("productPrice").value = product.price;
            modal.style.display = "flex";
        }
    });

    renderProducts();
});
