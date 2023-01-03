window.addEventListener("popstate", function (e) {
  const location = this.window.location.href.split("#");
  const rootelement = document.getElementById("app");
  const path = location[1];
  if (path == "addproduct") {
    rootelement.style.display = "none";
    this.document.getElementById("products").style.display = "none";
    const addproduct = document.getElementById("addproduct");
    addproduct.style.display = "flex";
  }
});

window.addEventListener("DOMContentLoaded", function (e) {
  const location = this.window.location.href.split("#");
  if (location[1]) {
    this.window.location.href = location[0];
  }
});
function showProducts() {
  const Div = document.getElementById("products");
  Div.style.display = "flex";
  let isduplicate = false;
  fetch("/products").then((res) => {
    res.json().then((data) => {
      console.log(data);
      const products = data.data;
      Div.innerHTML = "";
      products.forEach((product) => {
        const div = this.document.createElement("div");
      
        document.querySelectorAll(".product").forEach((p) => {
          if (
            String(p.children[0].children[1].children[0].innerText) ==
            String(product.product_name)
          ) {
            console.log("duplicate");
            isduplicate = true;
            console.log(isduplicate);
            return;
          }
          console.log(
            p.children[0].children[1].children[0].innerText,
            product.product_name
          );
        });
        if (isduplicate) return;
        else {
          console.log(isduplicate);
          div.className = "product";
          div.innerHTML = `
             <div class="card card-compact w-96 bg-base-100 shadow-xl" >
  <figure><img src="/${product.product_image}" alt="${product.product_name}" /></figure>
  <div class="card-body">
    <h2 class="card-title text-4xl text-extrabold">${product.product_name}</h2>
    <p>${product.product_description}</p>
    <div class="card-actions justify-end">
      <p class="text-primary text-2xl">Quantity: ${product.product_quantity}</p>
      <p class="text-primary text-2xl">Price :${product.product_price}</p>
    </div>
  </div>
</div>
          `;
          Div.appendChild(div);
          Div.style.display = "flex";
        }
      });
    });
  });
}
