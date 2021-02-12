class Beers {
  constructor(
    id,
    image,
    imageForStart,
    name,
    type,
    size,
    alc,
    rating,
    description,
    price
  ) {
    this.id = id;
    this.image = image;
    this.imageForStart = imageForStart;
    this.name = name;
    this.type = type;
    this.size = size;
    this.alc = alc;
    this.rating = rating;
    this.price = price;
    this.inCart = 0;
    this.description = description;
  }
}
let lager = new Beers(
  1,
  "../Pictures/peroni.png",
  "Pictures/peroni.png",
  "Peroni",
  "Lager",
  "33cl",
  "5%",
  "4/5",
  "Elegant malt and fresh hops are synonymous with Italian brewer Peroni. With Peroni Nastro Azzuro (literally 'Blue Ribbon') these qualities bubble up gently to the fore with unmistakable style and grace.",
  2
);
let ipa = new Beers(
  2,
  "../Pictures/punkIPA.png",
  "Pictures/punkIPA.png",
  "Brewdog",
  "Punk IPA",
  "33cl",
  "6,5%",
  "3/5",
  "One of the key players that helped kick-start the Craft Beer revolution, BrewDog are the original Punk Brewers, and this go-ahead attitude is never clearer than in Punk IPA, the original British Craft IPA. This sparkling bright gold IPA is bursting with light, bright malts, with fresh, crisp, melon, passionfruit citrus and pine hops, and a deliciously light body that together make this one hell of a drinkable IPA.",
  4
);
let paleAle = new Beers(
  3,
  "../Pictures/oberonale.png",
  "Pictures/oberonale.png",
  "Camden",
  "Pale Ale",
  "33cl",
  "5,6%",
  "5/5",
  "Camden Pale Ale by the redoubtable Camden Town Brewery is a light, refreshing Pale Ale with a sparkling pale yellow body, and a fine white head, harbouring light malts and zesty grapefruit and lemon hops, with a delicious herbal backnote. The tasting experience closes on a bright citrus note with soft, clean malts.",
  3
);
let sour = new Beers(
  4,
  "../Pictures/sourMonkey.png",
  "Pictures/sourMonkey.png",
  "Sour Monkey",
  "Sour Beer",
  "33cl",
  "3,5%",
  "4/5",
  "Sour Monkey puts a tastefully tart twist on our Golden Monkey's sweet, fruity essence. A sharp, citrus-laden tang makes this brew a Monkey all its own! This Sour Ale style beer is best paired with salads or peppery style cheeses such as Monterey / Pepper Jack and pungent style cheese such as Gorgonzola and Limburger.",
  5
);

let wheat = new Beers(
  5,
  "../Pictures/swedishsummer.png",
  "Pictures/swedishsummer.png",
  "Swedish Summer",
  "Wheat",
  "33cl",
  "5,8%",
  "4,2/5",
  "Slightly spicy taste with hints of banana, light bread, mandarin and coriander seeds. Served at 8-10 degrees as a companion drink, or with tasty, preferably spicy dishes of fish and light meat",
  3
);

let porter = new Beers(
  6,
  "../Pictures/carnegie.png",
  "Pictures/carnegie.png",
  "Carnegie Porter",
  "Porter",
  "33cl",
  "5,5%",
  "3.5/5",
  "In 1836, it was taken over by David Carnegie. The Carnegie Porter has since then been the dominating porter in Sweden. This brew has a slightly roasted aroma with hint of brown sugar and coffee. The taste is round and complex with hints of chocolate and coffee and a slight bitterness in the aftertaste.",
  3
);

let fruitBeer = new Beers(
  7,
  "../Pictures/muremyrtille.png",
  "Pictures/muremyrtille.png",
  "Mure Myrtille",
  "Fruit Beer",
  "33cl",
  "4,5%",
  "4.3/5",
  "1664 Mûre Myrtille is a refreshing and fruity wheat beer. This beer offers a perfect balance between the fruity flavours of blackberry and blueberry and floral notes, along with subtle notes of malt. Ideal for all moments of conviviality.",
  3
);

let stout = new Beers(
  8,
  "../Pictures/aldaris.png",
  "Pictures/aldaris.png",
  "Aldaris Porteris",
  "Stout",
  "50cl",
  "6,8%",
  "4/5",
  "Mežpils Porter is a special variety of a traditional strong beer with a wonderful taste of caramel and a slight tone of wine, which may also come through in the aroma.",
  6
);

let darkLager = new Beers(
  9,
  "../Pictures/panonska.png",
  "Pictures/panonska.png",
  "Panonska",
  "Dark lager",
  "33cl",
  "4,8%",
  "3.9/5",
  "We don’t like bitter people and it’s the same when it comes to our beer. This extra smooth Dark Lager may look like it has a bite, but its rich caramel taste is as soft-hearted as a good chocolate soufflé. We don’t know you or your friends but a few of these might be perfect for when you are out with them and feel like something a little tastier.",
  3
);

let seasonalBrew = new Beers(
  10,
  "../Pictures/julbrygd.png",
  "Pictures/julbrygd.png",
  "Falcon Julbrygd",
  "Seasonal Brew",
  "50cl",
  "5,2%",
  "4.8/5",
  "A tasty strong brew with a soft and delicate sweetness that combines the full-bodied taste of roasted malt and the bitterness of aroma hops. Falcon Julöl (Christmass Beer) is Sweden's most popular Christmas beer, designed as a perfect compliment to all the traditional Swedish delicacies. It’s a full malt beer, brewed with a special blend of malts to give the right golden brown colour and full-bodied aroma.",
  2
);

let allBeers = [
  lager,
  ipa,
  paleAle,
  sour,
  wheat,
  porter,
  fruitBeer,
  stout,
  darkLager,
  seasonalBrew,
];

$(function () {
  printBeer();
});

function printBeer() {
  $.each(allBeers, (i, beer) => {
    let container = $("<div>");
    container.addClass("individualBeerContainer");
    $("<img>")
      .attr("src", beer.image)
      .attr("alt", beer.name + " bottle")
      .on("click", { b: beer }, function (e) {
        saveToSS(e.data.b);
        window.location.assign("../HTML/singleProductPage.html");
      })
      .appendTo(container);
    $("<h3>").html(beer.name).appendTo(container);
    $("<p>").html(beer.type).appendTo(container);
    $("<p>")
      .html("$" + beer.price)
      .appendTo(container);
    $("<button>")
      .attr("type", "button")
      .attr("id", "addToCartBtn")
      .html("Add to cart")
      .on("click", { b: beer }, function (e) {
        addToCart(e.data.b);
      })
      .appendTo(container);
    container.appendTo($("#allBeersContainer"));
  });
}
function saveToSS(theClickedProduct) {
  sessionStorage.setItem("productItem", JSON.stringify(theClickedProduct));
}
