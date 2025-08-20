document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".add-to-wishlist-wrapper").forEach((form) => {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const productId = form.dataset.productId;

            try {
                const res = await fetch("/wishlist/toggle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId }),
                });

                const data = await res.json();

                if (res.status === 401) {
                    window.location.href = "/user/login";
                    return;
                }

                if (data.in_wishlist) {
                    form.classList.add("active");
                } else {
                    form.classList.remove("active");
                }
            } catch (err) {
                console.error("Error updating wishlist:", err);
            }
        });
    });

    document.querySelectorAll(".remove-icon").forEach((button) => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            const productId = e.target.dataset.productId;

            if (!confirm("Remove this product from your wishlist?")) return;

            try {
                const res = await fetch(`/wishlist/${productId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await res.json();
                if (data.success) {
                    // Remove the row from the table
                    e.target.closest("tr").remove();
                    location.reload();
                } else {
                    alert(data.message || "Failed to remove product");
                }
            } catch (err) {
                console.error(err);
                alert("Error removing product");
            }
        });
    });

    document
        .querySelectorAll(".action-bar .remove-all.button")
        .forEach((button) => {
            button.addEventListener("click", async (e) => {
                if (!confirm("Remove all items from your wishlist?")) return;

                try {
                    console.log("Sending DELETE /wishlist/remove/all");
                    const res = await fetch("wishlist/remove/all", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await res.json();
                    console.log("Response from server:", data);
                    if (data.success) {
                        location.reload();
                    } else {
                        alert(data.message || "Failed to clear wishlist");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error clearing wishlist");
                }
            });
        });

    document.querySelectorAll(".action-bar .add.button").forEach((button) => {
        button.addEventListener("click", async (e) => {
            try {
                const items = await JSON.parse(e.currentTarget.dataset.items);

                const res = await fetch("wishlist/add/all", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }), // 👈 send items array
                });

                const data = await res.json();
                console.log("Response from server:", data);

                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || "Failed to add all items to cart");
                }
            } catch (err) {
                alert("Error adding items");
            }
        });
    });
});
