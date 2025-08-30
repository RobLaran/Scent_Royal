document.addEventListener("DOMContentLoaded", () => {
    function updateCheckoutTotal() {
        let rows = document.querySelectorAll(".checkout-table-body tr.row");
        let subtotalCell = document.querySelector(
            "table.checkout-table tfoot .subtotal span"
        );
        let totalCell = document.querySelector(
            "table.checkout-table tfoot .main-total span"
        );
        let inputTotal = document.querySelector(
            "table.checkout-table tfoot .main-total .input-total"
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

        if(inputTotal) inputTotal.value = total.toFixed(2);
    }

    updateCheckoutTotal();
});
