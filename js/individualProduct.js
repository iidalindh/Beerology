$(function () {
  renderProduct();
});
// Creates product html
function renderProduct() {
  let productItem = JSON.parse(sessionStorage.getItem("productItem")) || [];

  if (productItem !== 0) {
    $("title").html(productItem.name);
    let productImage = $("#productImageContainer");
    $("<img>").attr("src", productItem.image).appendTo(productImage);
    $("<h3>").html(productItem.name).appendTo($("#productInfo"));
    $("<p>").html(productItem.type).appendTo($("#productInfo"));
    $("<p>")
      .html("$" + productItem.price)
      .appendTo($("#productInfo"));

    renderAddToCartBtn(productItem);
    createTable(productItem);
    descriptionPart(productItem);
  }
}

// Creates quanity and add to cart button
function renderAddToCartBtn(productItem) {
  let addToCartDiv = $("#addToCartDiv");
  $("<label>")
    .attr("for", "amountOfBeer")
    .html("Quantity: ")
    .appendTo(addToCartDiv);
  let amount = $("<div>");
  $("<button>")
    .attr("type", "button")
    .html("-")
    .addClass("increaseAndDecrease")
    .on("click", function () {
      decreaseQuantity();
    })
    .appendTo(amount);
  $("<input>")
    .attr("type", "text")
    .attr("value", "1")
    .attr("id", "amountOfBeer")
    .attr("name", "amountOfBeer")
    .on("keypress", function (e) {
      if (e.keyCode === 13 || e.key === 13) {
        quanitityToCart(productItem);
      }
    })
    .appendTo(amount);
  $("<button>")
    .attr("type", "button")
    .addClass("increaseAndDecrease")
    .html("+")
    .on("click", function () {
      increaseQuantity();
    })
    .appendTo(amount);
  amount.appendTo(addToCartDiv);
  $("<button>")
    .addClass("addToCartButton")
    .attr("type", "button")
    .html("Add to cart")
    .on("click", { b: productItem }, function (e) {
      quanitityToCart(e.data.b);
    })
    .appendTo(addToCartDiv);
}
//Change product total in cart or adds the product to cart.
function quanitityToCart(product) {
  let value = parseInt($("#amountOfBeer").val());
  let isProductInCart = 0;
  for (let i = 0; i < cart.length; i++) {
    if (product.id === cart[i].id) {
      cart[i].inCart += value;
      isProductInCart++;
    }
  }
  if (isProductInCart == 0) {
    product.inCart = value;
    cart.push(product);
  }
  saveToLS();
  renderCart();
}

function createTable(productItem) {
  let infoDiv = $("#infoTable");
  let table = $("<table>");
  let tableRow1 = $("<tr>");
  $("<th>").html("SIZE").appendTo(tableRow1);
  $("<th>").html("ABV").appendTo(tableRow1);
  $("<th>").html("RATING").appendTo(tableRow1);
  let tableRow2 = $("<tr>");
  $("<td>").html(productItem.size).appendTo(tableRow2);
  $("<td>").html(productItem.alc).appendTo(tableRow2);
  $("<td>").html(productItem.rating).appendTo(tableRow2);
  tableRow1.appendTo(table);
  tableRow2.appendTo(table);
  table.appendTo(infoDiv);
}
function descriptionPart(productItem) {
  let about = $("#aboutBeer");
  $("<h1>")
    .html("About " + productItem.name)
    .appendTo(about);
  $("<p>").html(productItem.description).appendTo(about);
}
function increaseQuantity() {
  let add = parseInt($("#amountOfBeer").val());
  add++;
  $("#amountOfBeer").val(add);
}
function decreaseQuantity() {
  let sub = parseInt($("#amountOfBeer").val());
  sub--;
  $("#amountOfBeer").val(sub);
  if (parseInt($("#amountOfBeer").val()) < 1) {
    parseInt($("#amountOfBeer").val(1));
  }
}
