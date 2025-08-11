document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.qty-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			const input = this.parentElement.querySelector('input');
			let value = parseInt(input.value);
			if (this.textContent === '-' && value > 0) value--;
			if (this.textContent === '+') value++;
			input.value = value;
		});
	});

	document.querySelectorAll('.cart-section .wishlist.button').forEach(button => {
        button.addEventListener('click', async () => {
			const productId = button.dataset.productId;

			try {
				const res = await fetch('/wishlist/toggle', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ productId })
				});

				const data = await res.json();
				
				if (res.ok) {
					window.location.reload();
				} else {
                    window.location.href = '/user/login';
                    return;
				}
			} catch (err) {
				console.error(err);
				alert('Error updating wishlist');
			}
		});
    });
});

