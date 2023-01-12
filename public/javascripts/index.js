function showProducts() {
  const Div = document.getElementById("products");
  Div.style.display = "flex";
  let isduplicate = false;
  fetch("/products").then((res) => {
    res.json().then((data) => {
      console.log(data);
      const products = data.data;
      Div.innerHTML = "";
      if (products.length == 0) {
        Div.innerHTML = `<h1 class="text-5xl text-center text-primary">No Products Found</h1>`;
      }
      products.forEach((product) => {
        const div = this.document.createElement("div");

        console.log(product.product_image);
        div.className = "product";
        div.innerHTML = `
             <div class="card card-compact w-96 bg-base-100 shadow-xl" >
  <figure><img src="/images/${product.product_image}" alt="${product.product_name}" /></figure>
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
      });
    });
  });
}
