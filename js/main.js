$(function () {
  // Hambuger toggle
  $(".menu-btn").on("click", function () {
    $(".menu-btn").toggleClass("active");
    $(".menu-panel").toggleClass("expand");
  });

  // Shopping cart toggle
  $(".fa-shopping-cart").on("click", function () {
    $("#cart").toggle("drop right");
  });
  $(".headerText").hide().fadeIn(2000);
  $(".btn-container").hide().fadeIn(2000);

  renderCart();
});

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

// Adds a product to the shopping cart
function addToCart(product) {
  let isProductInCart = 0;

  for (let i = 0; i < cart.length; i++) {
    if (product.id === cart[i].id) {
      cart[i].inCart++;
      isProductInCart++;
    }
  }
  if (isProductInCart == 0) {
    product.inCart++;
    cart.push(product);
  }
  saveToLS();
  renderCart();
}

// Creates shopping cart html
function renderCart() {
  $("#cart").html(" ");

  $("<h3>").html("My Shopping Cart:").appendTo($("#cart"));

  for (let i = 0; i < cart.length; i++) {
    let currentProduct = cart[i];
    cartCard = $("<div>");
    cartCard.addClass("cartCard");

    if (window.location.href.indexOf("index.html") > -1) {
      $("<img>").attr("src", currentProduct.imageForStart).appendTo(cartCard);
    } else {
      $("<img>").attr("src", currentProduct.image).appendTo(cartCard);
    }

    $("<span>")
      .attr("id", "cartProductName")
      .html(currentProduct.name + " ")
      .appendTo(cartCard);

    $("<button>")
      .attr("type", "button")
      .html("-")
      .on("click", function () {
        decreaseProducts(currentProduct);
      })
      .appendTo(cartCard);

    $("<input>")
      .attr("type", "text")
      .attr("value", currentProduct.inCart)
      .on("keypress", function (e) {
        if (e.keyCode === 13 || e.key === 13) {
          changeInCartValue($(this).val(), currentProduct);
        }
      })
      .appendTo(cartCard);

    $("<button>")
      .attr("type", "button")
      .html("+")
      .on("click", function () {
        increaseProducts(currentProduct);
      })
      .appendTo(cartCard);

    $("<span>")
      .html("$" + currentProduct.price)
      .appendTo(cartCard);

    $("<span>")
      .html("<i class='fas fa-trash'></i>")
      .on("click", function (e) {
        remove(currentProduct);
        $(e.target).parent().remove();
      })
      .appendTo(cartCard);
    cartCard.appendTo($("#cart"));
  }
  showTotalPrice();
  calcProducts();
}
// creates total price html in shopping cart
function showTotalPrice() {
  let totalPrice = $("<div>");
  totalPrice.addClass("totalprice");

  $("<p>").html("Total: ").appendTo(totalPrice);
  totalPrice.appendTo("#cart");

  $("<span>")
    .html("$" + calcTotal())
    .appendTo(totalPrice);

  $("<button>")
    .attr("type", "button")
    .attr("id", "checkoutBtn")
    .html("Checkout")
    .on("click", function () {
      if (window.location.href.indexOf("index.html") > -1) {
        window.location.assign("HTML/checkoutPage.html");
      } else {
        window.location.assign("../HTML/checkoutPage.html");
      }
    })
    .appendTo("#cart");
}

// Calculate the total cost
function calcTotal() {
  let totalCost = 0;

  for (let i = 0; i < cart.length; i++) {
    totalCost += cart[i].price * cart[i].inCart;
  }
  return totalCost;
}
// Calculates the total quanity of products in the shopping cart.
function calcProducts() {
  let totalProducts = 0;

  for (let i = 0; i < cart.length; i++) {
    totalProducts += cart[i].inCart;
  }
  $("#cartCounter").html(totalProducts);
  return totalProducts;
}
function remove(product) {
  for (let i = 0; i < cart.length; i++) {
    if (product.id === cart[i].id) {
      cart.splice(i, 1);
    }
  }
  calcTotal();
  calcProducts();
  renderCart();
  checkoutRender();
  saveToLS();
}
function saveToLS() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}
// Decrease product totals in shopping cart.
function decreaseProducts(currentProduct) {
  currentProduct.inCart--;
  saveToLS();
  renderCart();
  checkoutRender();
  if (currentProduct.inCart === 0) {
    remove(currentProduct);
    renderCart();
    checkoutRender();
  }
}
// Increase product totals in shopping cart.
function increaseProducts(currentProduct) {
  currentProduct.inCart++;
  saveToLS();
  renderCart();
  checkoutRender();
}
// Change manual input of product totals.
function changeInCartValue(inputValue, currentProduct) {
  currentProduct.inCart = parseInt(inputValue);
  saveToLS();
  renderCart();
  checkoutRender();
}
