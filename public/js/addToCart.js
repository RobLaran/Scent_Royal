 const popup = document.querySelector('#add-to-cart-popup');

function addToCart(button) {
    if(popup) {
        popup.classList.add('show');
    }

}

function closePopup() {
    if(popup) {
        popup.classList.remove('show');
    }
}