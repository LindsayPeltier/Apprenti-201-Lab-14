/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
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
  var tableBody = document.getElementsByTagName('tbody');
  // Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++) {
     // Create a TR
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);

    // Create a TD for the delete link, quantity,  and the item
    // Add the TR to the TBODY and each of the TD's to the TR
    var productTd = document.createElement('td');
    productTd.textContent = cart.items[i].product;
    tr.appendChild(productTd);
    
    var amountTd = document.createElement('td');
    amountTd.textContent = cart.items[i].quantity;
    tr.appendChild(amountTd);

    var td = document.createElement('td');
    td.textContent = 'X';
    tr.appendChild(td);
  }
 

}

function removeItemFromCart(event) {

  // When a delete link is clicked, use cart.removeItem to remove the correct item
  if(event.target.textContent === 'X'){
    cart.removeItem(event.target.parentElement);
  }
  // Save the cart back to local storage
  localStorage.setItem('cart items', JSON.stringify(cart.items));
  // Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
