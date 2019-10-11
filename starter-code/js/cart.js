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
    var button = document.createElement('button');
    button.textContent = 'Delete this item';
    tr.appendChild(td);
    td.appendChild(button);

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

// Create function to render order form
function renderInputs() {
  var fieldNames = ['name', 'street', 'city', 'state', 'zip'];
  console.log(fieldNames);
  var section2 = document.getElementsByClassName('deck')[1];
  var fieldSet = document.createElement('fieldset');
  section2.appendChild(fieldSet);
  
  for(var i = 0; i < fieldNames.length; i++){
    var label = document.createElement('label');
    label.setAttribute('for', `${fieldNames[i]}`);
    label.textContent = `${fieldNames[i]}: `;
    fieldSet.appendChild(label);
    var input = document.createElement('input');
    input.setAttribute('class', `input`);
    fieldSet.appendChild(input);
  }
  var phoneLabel = document.createElement('label');
  phoneLabel.setAttribute('for', `phoneNumber`);
  phoneLabel.textContent = 'phone number';
  fieldSet.appendChild(phoneLabel);
  var phoneNumber = document.createElement('input');
  phoneNumber.setAttribute('class', `input`);
  phoneNumber.setAttribute('type', 'tel');
  fieldSet.appendChild(phoneNumber);

  var creditCardLabel = document.createElement('label');
  creditCardLabel.setAttribute('for', `creditCard`);
  creditCardLabel.textContent = 'credit card';
  fieldSet.appendChild(creditCardLabel);
  var creditCard = document.createElement('input');
  creditCard.setAttribute('class', `input`);
  creditCard.setAttribute('type', 'number');
  fieldSet.appendChild(creditCard);
  

  var submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submitButton');
  submitButton.textContent = 'process order';
  fieldSet.appendChild(submitButton);
  

}

function removeItemFromCart(event) {

  // When a delete link is clicked, use cart.removeItem to remove the correct item
  if(event.target.textContent === 'Delete this item'){
    cart.removeItem(event.target.parentElement);
  }
  // Save the cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart.items));
  // Re-draw the cart table
  renderCart();
}

function orderMessage() {
  var body = document.querySelector('body');
  var div = document.createElement('div')
  div.setAttribute('id', 'orderMessage');
  div.textContent = 'Thank you for your order!';
  body.appendChild(div);
}

// This will initialize the page and draw the cart on screen
renderInputs();
renderCart();

var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', clearCart);
submitButton.addEventListener('click', orderMessage);



