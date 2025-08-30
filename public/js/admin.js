function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document
                .querySelector("#imagePreview")
                .setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Remove product from product list
    document.querySelectorAll(".admin-products.remove-btn").forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault(); 

            const productId = e.currentTarget.dataset.productId;

            if (!confirm('Remove this product?')) return;

            try {
                const res = await fetch(`/admin/products/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || 'Failed to remove product');
                }
            } catch (err) {
                console.error(err);
                alert('Error removing product');
            }
        });
    });

    // Get total
    
});

