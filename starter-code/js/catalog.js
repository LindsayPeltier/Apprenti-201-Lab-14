/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  var selectElement = document.getElementById('items');

  for (var i = 0; i < Product.allProducts.length; i++) {
    var createOption = document.createElement('option');
    createOption.textContent = Product.allProducts[i].name;
    selectElement.appendChild(createOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  event.preventDefault();
  addSelectedItemToCart();   
  //cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

function addSelectedItemToCart() {
  var dropdown = document.getElementById('items');
  var selectItem = dropdown.options[dropdown.selectedIndex].text;

  var selectQuantity = document.getElementById('quantity').value;
  cart = [selectItem, selectQuantity];
}

var itemCounter = 0;
function updateCounter() {
  var itemCount = document.getElementById('itemCount');
    itemCounter ++;
    itemCount.textContent = `  (${itemCounter})`;
}

function updateCartPreview() {
  var cartItemName = cart[0];
  var cartQuantity = cart[1];
  var cartContents = document.getElementById('cartContents');
  var newCartList = document.createElement('div');
  cartContents.appendChild(newCartList);
  newCartList.textContent = `${cartItemName} x ${cartQuantity}`;
 }

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
