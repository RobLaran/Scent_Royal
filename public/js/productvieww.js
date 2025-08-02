 document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      let value = parseInt(input.value);
      if (this.textContent === '-' && value > 0) value--;
      if (this.textContent === '+') value++;
      input.value = value;
    });
});

