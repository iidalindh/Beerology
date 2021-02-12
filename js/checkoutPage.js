$(function () {
  $("<h2>").html("Checkout").appendTo($(".checkoutPage"));
  checkoutRender();
  customerForm();
});

// Creates the chcekout html with products.
function checkoutRender() {
  let checkoutContainer = $(".checkoutContainer");
  checkoutContainer.html("");
  let productContainer = $("<div>").addClass("productContainer");

  for (let i = 0; i < cart.length; i++) {
    let productCard = $("<div>").addClass("productCard");
    $("<img>")
      .attr("src", cart[i].image)
      .addClass("productCardImg")
      .appendTo(productCard);

    $("<p>").html(cart[i].name).appendTo(productCard);

    $("<button>")
      .attr("type", "button")
      .html("-")
      .on("click", function () {
        decreaseProducts(cart[i]);
      })
      .appendTo(productCard);

    $("<input>")
      .attr("type", "text")
      .attr("value", cart[i].inCart)
      .appendTo(productCard);

    $("<button>")
      .attr("type", "button")
      .html("+")
      .on("click", function () {
        increaseProducts(cart[i]);
      })
      .appendTo(productCard);

    $("<span>")
      .html("$" + cart[i].price)
      .appendTo(productCard);
    $("<span>")
      .html("<i class='fas fa-trash'></i>")
      .on("click", function (e) {
        remove(cart[i]);
        $(e.target).parent().parent().remove();
      })
      .appendTo(productCard);

    productCard.appendTo(productContainer);
    productContainer.appendTo(checkoutContainer);
  }
  $("<hr>").appendTo(productContainer);

  checkoutTotal();
  saveToLS();
}
// Creates the checkout totals section html.
function checkoutTotal() {
  let checkoutTotal = $("<div>").addClass("checkoutTotal");

  let table = $("<table>");
  let tableRow1 = $("<tr>");
  $("<th>").html("").appendTo(tableRow1);
  $("<th>").html("Quantity").appendTo(tableRow1);
  $("<th>").html("Price").appendTo(tableRow1);
  let tableRow2 = $("<tr>");
  $("<td>").html("Total:").appendTo(tableRow2);
  $("<td>").html(calcProducts()).appendTo(tableRow2);
  $("<td>")
    .html("$" + calcTotal())
    .appendTo(tableRow2);
  tableRow1.appendTo(table);
  tableRow2.appendTo(table);
  table.appendTo(checkoutTotal);

  checkoutTotal.appendTo($(".checkoutContainer"));
  saveToLS();
}

// Sends customer payment information.
function customerForm() {
  let form = $("form");
  form.on("submit", function (e) {
    e.preventDefault();
    customerToSS($("#fName").val());
    window.location.assign("../HTML/thankYouPage.html");
  });
}

function customerToSS(firstName) {
  localStorage.clear();
  sessionStorage.setItem("customerInfo", JSON.stringify(firstName));
}
