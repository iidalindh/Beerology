$(function () {
  orderConfirmation();
});

function orderConfirmation() {
  let firstname = JSON.parse(sessionStorage.getItem("customerInfo")) || [];

  let orderNumb = Math.round(Math.random() * 100000);
  $("<p>").html(firstname + ", your order is on the way!").appendTo(".orderPayedText");
  $("<p>")
    .html("Order number: " + orderNumb)
    .appendTo(".orderPayedText");
}
