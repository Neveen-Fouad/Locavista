
const cartItems = document.querySelectorAll("#cart-items tr");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function updateCart() {
  let subtotal = 0;
  cartItems.forEach(row => {
    const qty = parseInt(row.querySelector(".qty").textContent);
    const price = parseInt(row.querySelector("td:nth-child(3)").textContent.replace('$',''));
    const itemTotal = qty * price;
    row.querySelector(".item-total").textContent = `$${itemTotal}`;
    subtotal += itemTotal;
  });
  subtotalEl.textContent = `$${subtotal}`;
  totalEl.textContent = `$${subtotal}`;
}

cartItems.forEach(row => {
  const decreaseBtn = row.querySelector(".decrease");
  const increaseBtn = row.querySelector(".increase");
  const qtyEl = row.querySelector(".qty");

  decreaseBtn.addEventListener("click", () => {
    let qty = parseInt(qtyEl.textContent);
    if (qty > 1) qty--;
    qtyEl.textContent = qty;
    updateCart();
  });

  increaseBtn.addEventListener("click", () => {
    let qty = parseInt(qtyEl.textContent);
    qty++;
    qtyEl.textContent = qty;
    updateCart();
  });

  row.querySelector(".remove-btn").addEventListener("click", () => {
    row.remove();
    updateCart();
  });
});

updateCart();
