
function createAddToCartPopup(totalItems, subTotal) {
    const body = document.body;
    const dialog = document.createElement("dialog");
    dialog.id = "add-to-cart-popup";
    dialog.className = "popup-container";

    // Popup content
    const content = document.createElement("div");
    content.className = "popup-content";

    // Checkmark wrapper
    const checkmarkWrapper = document.createElement("div");
    checkmarkWrapper.className = "checkmark-wrapper";

    const checkmark = document.createElement("div");
    checkmark.className = "checkmark";

    const checkmarkIcon = document.createElement("i");
    checkmarkIcon.className = "fa-solid fa-check";

    checkmark.appendChild(checkmarkIcon);
    checkmarkWrapper.appendChild(checkmark);

    // Text content wrapper
    const textWrapper = document.createElement("div");
    textWrapper.className = "popup-textcontent-wrapper";

    const title = document.createElement("h3");
    title.className = "popup-title";
    title.textContent = "Item added to your cart";

    const textContent = document.createElement("p");
    textContent.className = "popup-textcontent";

    const spanItems = document.createElement("span");
    spanItems.className = "items-in-cart";
    spanItems.textContent = totalItems;

    const spanCartTotal = document.createElement("span");
    spanCartTotal.className = "cart-total";
    spanCartTotal.textContent = `₱${(subTotal)}`;

    // Format: "<items> items in the cart (<total>)"
    textContent.appendChild(spanItems);
    textContent.append(" items in the cart (");
    textContent.appendChild(spanCartTotal);
    textContent.append(")");

    textWrapper.appendChild(title);
    textWrapper.appendChild(textContent);

    // Buttons wrapper
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "popup-buttons-wrapper";

    const continueBtn = document.createElement("button");
    continueBtn.className = "button popup-button-continue-shopping";
    continueBtn.addEventListener('click', () => {
        closePopup(dialog);
        location.reload();
    });

    const continueSpan = document.createElement("span");
    continueSpan.className = "btn_text";
    continueSpan.textContent = "CONTINUE SHOPPING";
    continueBtn.appendChild(continueSpan);

    const cartLink = document.createElement("a");
    cartLink.href = "/cart";

    const goToCartBtn = document.createElement("button");
    goToCartBtn.className = "button popup-button-go-to-cart";
    goToCartBtn.id = "popup-button-go-to-cart";
    
    const goToCartSpan = document.createElement("span");
    goToCartSpan.className = "btn_text";
    goToCartSpan.textContent = "GO TO THE CART";
    goToCartBtn.appendChild(goToCartSpan);

    cartLink.appendChild(goToCartBtn);

    buttonsWrapper.appendChild(continueBtn);
    buttonsWrapper.appendChild(cartLink);

    // Assemble content
    content.appendChild(checkmarkWrapper);
    content.appendChild(textWrapper);
    content.appendChild(buttonsWrapper);

    // Add to dialog
    dialog.appendChild(content);

    body.append(dialog);

    // setTimeout(() => location.reload(), 3500);

    return dialog;
}

function closePopup(dialog) {
    if (dialog) {
        dialog.remove();
    }
}

