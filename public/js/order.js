document.addEventListener("DOMContentLoaded", () => {
    const orderCards = document.querySelectorAll(".orders-list .order-card");

    function updateOrderTotal() {
        let rows = document.querySelectorAll(".order-table-body tr.row");
        let subtotalCell = document.querySelector(
            "table.order-table tfoot .subtotal span"
        );
        let totalUpper = document.querySelector(
            ".order-container .order-mini .main-total strong span"
        );
        let totalLower = document.querySelector(
            "table.order-table tfoot .main-total strong span"
        );
        let total = 0;

        rows.forEach((row) => {
            let itemTotal = row.querySelector("tr.row td.item-subtotal span");

            if (itemTotal) {
                total += parseFloat(itemTotal.textContent.replace(/[₱,]/g, ""));
            } else {
                console.log("Invalid subtotal");
            }
        });

        // Update the subtotal and total in .cart-totals table
        if (subtotalCell) subtotalCell.textContent = total.toFixed(2);
        if (totalUpper) totalUpper.textContent = total.toFixed(2);
        if (totalLower) totalLower.textContent = total.toFixed(2);
    }

    function updateMainTotal() {
        let orderCards = document.querySelectorAll(".orders-list .order-card");

        orderCards.forEach((card) => {
            let rows = card.querySelectorAll(".order-card tbody tr.row");
            
            let orderTotal = card.querySelector(".order-card .order-total p span");

            let total = 0;

            rows.forEach(row => {
                const itemTotal = row.querySelector('tr.row td.item-subtotal span');

                if (itemTotal) {
                    total += parseFloat(itemTotal.textContent.replace(/[₱,]/g, ""));
                } else {
                    console.log("Invalid subtotal");
                }
            });

            if (orderTotal) orderTotal.textContent = total.toFixed(2);
        });
    }

    orderCards.forEach((card) => {
        card.addEventListener('click', () => {
            const orderId = card.dataset.orderId;
            window.location.href = `/orders/${orderId}`;
        });
    });

    document
        .querySelectorAll(".order-card .heading .remove-btn")
        .forEach((button) => {
            button.addEventListener("click", async (e) => {
                const orderId = button.dataset.orderId;

                try {
                    const res = await fetch(`orders/remove/${orderId}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await res.json();
                    console.log("Response from server:", data);
                    if (data.success) {
                        location.reload();
                    } else {
                        alert(data.message || "Failed to delete order");
                    }
                } catch (err) {
                    alert("Error deleting order: " + err);
                }
            });
        });

    updateOrderTotal();
    updateMainTotal();
});
