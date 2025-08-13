document.addEventListener("DOMContentLoaded", function () {
    let rows = document.querySelectorAll("tbody tr.row");
    let sum = 0;

    function updateCartTotal() {
        rows = document.querySelectorAll("tbody tr.row");
        let subtotalCell = document.querySelector("#cart-subtotal span");
        let totalCell = document.querySelector("#cart-total span");
        let total = 0;

        rows.forEach((row) => {
            let subtotalCell = row.querySelector("tr.row td:last-child");

            if (subtotalCell) {
                total += parseFloat(
                    subtotalCell.textContent.replace(/[$,]/g, "")
                );
            } else {
                console.log("Invalid subtotal");
            }
        });

        sum++;

        // Update the subtotal and total in .cart-totals table
        if (subtotalCell) subtotalCell.textContent = total.toFixed(2);
        if (totalCell) totalCell.textContent = total.toFixed(2);
    }

    // Add functionality for + and - buttons
    rows.forEach((row) => {
        const minusBtn = row.querySelector(
            "td:nth-child(4) button:first-child"
        );
        const plusBtn = row.querySelector("td:nth-child(4) button:last-child");
        const qtyInput = row.querySelector(".qty-input");
        const priceText = row.querySelector("td:nth-child(3)")?.textContent;

        const price = parseFloat(priceText.replace(/[$,]/g, "")) || 0;
        const subtotalCell = row.querySelector("td:last-child");

        if (minusBtn && plusBtn && qtyInput && subtotalCell) {
            minusBtn.addEventListener("click", () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qty--;
                    qtyInput.value = qty;
                    subtotalCell.textContent = `$${(qty * price).toFixed(2)}`;
                    updateCartTotal();
                }
            });

            plusBtn.addEventListener("click", () => {
                let qty = parseInt(qtyInput.value) || 1;
                qty++;
                qtyInput.value = qty;
                subtotalCell.textContent = `$${(qty * price).toFixed(2)}`;
                updateCartTotal();
            });

            // If user manually changes quantity input
            qtyInput.addEventListener("change", () => {
                let qty = parseInt(qtyInput.value);
                if (!qty || qty < 1) qty = 1;
                qtyInput.value = qty;
                subtotalCell.textContent = `$${(qty * price).toFixed(2)}`;
                updateCartTotal();
            });
        }
    });

    // Add to cart button
    document.querySelectorAll(".atc-button.button").forEach(btn => {
        btn.addEventListener('click', async(e) => {
            e.preventDefault();

            const productId = btn.dataset.productId;
            const isLoggedIn = btn.dataset.isLoggedIn === 'true';
            const isInCart = btn.dataset.isInCart === 'true';
            const price = btn.dataset.price;
            const quantity = 1;

            if (isInCart) {
                window.location.href = "/cart";
                return;
            } 

            if (isLoggedIn) {
                try {
                    const res = await fetch(`/cart/add/${productId}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity }) 
                    });

                    const data = await res.json();
                    const updatedItems = Number(data.totalItems) + Number(quantity);
                    const updatedSubtotal = Number(data.subTotal) + (Number(price) * Number(quantity));

                    if (data.success) {
                        const dialog = createAddToCartPopup(updatedItems, updatedSubtotal.toFixed(2));
                        if(!dialog) {
                            location.reload();
                        } 
                    } else {
                        alert(data.message || "Failed to add to cart");
                    }
                } catch (err) {
                    console.log(err.message);
                    alert("Error adding to cart");
                }
            } else {
                alert('You must be logged in');
            }
        });
    });

    // Remove item from cart
    document.querySelectorAll(".cart.remove-btn").forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); 

            const productId = e.currentTarget.dataset.productId;

            if (!confirm('Remove this item from your cart?')) return;

            try {
                const res = await fetch(`/cart/remove/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || 'Failed to remove item');
                }
            } catch (err) {
                console.error(err);
                alert('Error removing item');
            }
        });
    });

    // Increase quantity button
    document.querySelectorAll(".add-quantity-btn").forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); 
            
            const itemId = btn.dataset.itemId;
            const quantity = btn.previousElementSibling.value;

            try {
                const res = await fetch(`/cart/update/${itemId}/${quantity}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || 'Failed to update item');
                }
            } catch (err) {
                console.error(err);
                alert('Error updating item');
            }
        });
    });

    // Increase quantity button
    document.querySelectorAll(".subtract-quantity-btn").forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); 
            
            const itemId = btn.dataset.itemId;
            const quantity = btn.nextElementSibling.value;

            try {
                const res = await fetch(`/cart/update/${itemId}/${quantity}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || 'Failed to update item');
                }
            } catch (err) {
                console.error(err);
                alert('Error updating item');
            }
        });
    });

    updateCartTotal();
});
