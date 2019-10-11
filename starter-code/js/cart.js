/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
  console.log(cart);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  while(table.rows.length > 0){
    table.deleteRow(0);
  }
}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // Find the table body
  var tableBody = document.querySelector('tbody');
  // Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++) {
     // Create a TR
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);

    // Create a TD for the delete link, quantity,  and the item
    // Add the TR to the TBODY and each of the TD's to the TR
    var td = document.createElement('td');
    td.textContent = 'X';
    tr.appendChild(td);

    var image = document.createElement('img');
    //TODO: add images into cart
    for(var j = 0; j < Product.allProducts.length; j++){
      if(cart.items[i].product === Product.allProducts[j].name){
        image.src = Product.allProducts[j].filePath;
      }
    }
   
    
    var imageTd = document.createElement('td');
    imageTd.setAttribute('id', 'image')
    tr.appendChild(imageTd);
    imageTd.appendChild(image);
    
   
    var productTd = document.createElement('td');
    productTd.textContent = `Product: ${cart.items[i].product}`;
    tr.appendChild(productTd);
    
    var amountTd = document.createElement('td');
    amountTd.textContent = `Quantity: ${cart.items[i].quantity}`;
    tr.appendChild(amountTd);

    
  }
 

}

function removeItemFromCart(event) {

  // When a delete link is clicked, use cart.removeItem to remove the correct item
  if(event.target.textContent === 'X'){
    cart.removeItem(event.target.parentElement);
  }
  // Save the cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart.items));
  // Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
