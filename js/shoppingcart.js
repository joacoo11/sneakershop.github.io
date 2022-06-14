if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready(){
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(let i = 0; i < removeCartItemButtons.length; i+=1){
    let button = removeCartItemButtons[i]
    button.addEventListener ('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity- input')
    for(let i = 0; i < quantityInputs.length; i+=1){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }
    let addToCartBtn = document.getElementsByClassName('add-cart')
    for(let i = 0; i < addToCartBtn.length; i+=1){
        let button = addToCartBtn[i]
        button.addEventListener('click', addToCart)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(evt){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you for your purchase!',
        showConfirmButton: false,
        timer: 1500
      })
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(evt){
        let btnClicked = evt.target
        btnClicked.parentElement.parentElement.remove()
        updateCartTotal()
}

function quantityChange(evt){
    let input = evt.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCart(evt){
    let button = evt.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName('title__shoes')[0].innerText
    let price = shopItem.getElementsByClassName('p__shoes')[0].innerText
    let imgSrc = shopItem.getElementsByClassName('img-shoes')[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imgSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i+=1){
        if(cartItemNames[i].innerText == title){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'This item is already in your cart!',
                showConfirmButton: false,
                timer: 1500
              })
            return
        }
    }
    let cartRowContent = `
    <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
    </div>
    `
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

function updateCartTotal (){
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for(let i = 0; i < removeCartItemButtons.length; i+=1){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}