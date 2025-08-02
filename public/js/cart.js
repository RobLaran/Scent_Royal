// document.addEventListener("DOMContentLoaded", function () {
//   const cartSubtotalCell = document.getElementById("cart-subtotal");
//   const totalRow = document.getElementById("cart-total");

//   function updateCartTotal() {
//     let total = 0;
//     totalRow.forEach((row) => {
//       const subtotal = parseFloat(
//         row.querySelector("td:last-child").textContent.replace("$", "")
//       );
//       total += subtotal;
//     });
//     cartSubtotalCell.textContent = `$${total.toFixed(2)}`;
//     // Update final total
//     const total_Row = document.querySelector(".cart-totals tr:last-child td");
//     total_Row.textContent = `$${total.toFixed(2)}`;
//   }

//   if(cartSubtotalCell) {
//     cartSubtotalCell.forEach((row) => {
//     const minusBtn = row.querySelector("td:nth-child(4) button:first-child");
//     const plusBtn = row.querySelector("td:nth-child(4) button:last-child");
//     const qtyInput = row.querySelector(".qty-input");
//     const price = parseFloat(row.querySelector("td:nth-child(3)")?.textContent.replace("$", ""));
//     const subtotalCell = row.querySelector("td:last-child");

//     if(minusBtn && plusBtn) {
//       minusBtn.addEventListener("click", () => {
//       let qty = parseInt(qtyInput.value);
//       if (qty > 1) {
//         qty--;
//         qtyInput.value = qty;
//         subtotalCell.textContent = `$${(qty * price).toFixed(2)}`;
//         updateCartTotal();
//       }
//     });

//     plusBtn.addEventListener("click", () => {
//           let qty = parseInt(qtyInput.value);
//           qty++;
//           qtyInput.value = qty;
//           subtotalCell.textContent = `$${(qty * price).toFixed(2)}`;
//           updateCartTotal();
//         });
//     }

    
//   });
//   }
// });
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
          total += parseFloat(subtotalCell.textContent.replace(/[$,]/g, ""));
        } else {
            console.log("Invalid subtotal");
          }
      });
      
      sum++;

      // Update the subtotal and total in .cart-totals table
      if (subtotalCell) subtotalCell.textContent = total;
      if (totalCell) totalCell.textContent = total;
  }

  // Add functionality for + and - buttons
  rows.forEach((row) => {
    const minusBtn = row.querySelector("td:nth-child(4) button:first-child");
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

  // Initial calculation
  updateCartTotal();
});

