const taxRate = 0.18;
const shippingPrice = 20;
const freeShippingLimit = 300;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("freeShippingLimit", freeShippingLimit);

  calcCardPrice();
});

const container = document.querySelector(".container");

container.addEventListener("click", (event) => {
  if (event.target.className === "fas fa-minus") {
    if (event.target.parentElement.children[1].innerText > 1) {
      event.target.parentElement.children[1].innerText--;
    }
  } else if (event.target.className === "fas fa-plus") {
    event.target.parentElement.children[1].innerText++;
  } else if (event.target.className === "remove-btn") {
    if (
      confirm(
        `${
          event.target.parentElement.parentElement.querySelector("h2").innerText
        } will be deleted , are u sure ?`
      )
    ) {
      event.target.closest(".item").remove();
    }
  }

  itemTotalPriceCalc(event.target);
  calcCardPrice();
});

const itemTotalPriceCalc = (e) => {
  const info = e.closest(".info");
  const price = Number(info.children[1].innerText);
  const quantity = Number(info.querySelector(".quantity").innerText);
  let totalPriceItem = info.children[3].children[0];
  totalPriceItem.innerText = (price * quantity).toFixed(2);
};

const calcCardPrice = () => {
  const itemPrice = document.querySelectorAll(".total-item-price-value")
  const subTotal = Number([...itemPrice]
    .reduce((acc, price) => acc + Number(price.innerText), 0)
    .toFixed(2))
  const taxPrice = +(subTotal * localStorage.getItem("taxRate")).toFixed(2);
  const shippingPrice =
    Number(subTotal > 0 && subTotal < localStorage.getItem("freeShippingLimit")
      ? localStorage.getItem("shippingPrice")
      : 0)
  const total = parseFloat(subTotal + taxPrice + shippingPrice).toFixed(2)
  document.querySelector(".sub-total").children[0].innerText = subTotal;
  document.querySelector(".tax-price").children[0].innerText = taxPrice;
  document.querySelector(".shipping-price").children[0].innerText =
    shippingPrice;
  document.querySelector(".total").children[0].innerText = total;
};
