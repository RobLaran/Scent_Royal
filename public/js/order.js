document.addEventListener("DOMContentLoaded", () => {
    function updateOrderTotal() {
        let rows = document.querySelectorAll(".order-table-body tr.row");
        let subtotalCell = document.querySelector(
            "table.order-table tfoot .subtotal span"
        );
        let totalCell = document.querySelector(
            "table.order-table tfoot .main-total strong span"
        );
        let total = 0;

        rows.forEach((row) => {
            console.log(row);
            

            let itemTotal = row.querySelector("tr.row td.item-subtotal span");

            if (itemTotal) {
                total += parseFloat(itemTotal.textContent.replace(/[₱,]/g, ""));
            } else {
                console.log("Invalid subtotal");
            }
        });

        // Update the subtotal and total in .cart-totals table
        if (subtotalCell) subtotalCell.textContent = total.toFixed(2);
        if (totalCell) totalCell.textContent = total.toFixed(2);
    }

    updateOrderTotal();
});
