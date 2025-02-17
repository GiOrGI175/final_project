const btn = document.querySelector('.menu_btn');

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  document.querySelector('.menu_container').classList.toggle('visibility');
  document.querySelector('.menu').classList.toggle('show_menu');
  document.querySelector('.overlay').classList.toggle('active');
  document.body.classList.toggle('no_scroll');
});

let shoppingCartIcon = document.querySelector('.cart');

shoppingCartIcon.addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('show');
  document.querySelector('.overlay').classList.toggle('active');
  document.body.classList.toggle('no_scroll');

  updateCartPopup();
});

let overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
  document.querySelector('.menu').classList.remove('show_menu');
  document.querySelector('.popup').classList.toggle('show');
  document.querySelector('.overlay').classList.toggle('active');
  document.body.classList.toggle('no_scroll');
});

let popupcart = JSON.parse(localStorage.getItem('cart'));

console.log(popupcart);

function calculateTotalPrice(cart) {
  return cart.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);
}

function calculateTotalQuantity(cart) {
  return cart.reduce((sum, p) => sum + Number(p.quantity), 0);
}

function updateCartPopup() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = calculateTotalPrice(cart);

  let items = calculateTotalQuantity(cart);

  const popup = document.querySelector('.popup');

  console.log(popup);

  popup.textContent = '';

  const productBoxContainer = document.createElement('div');
  productBoxContainer.className = 'productBox_Container';

  cart.forEach((product, index) => {
    console.log(product);
    const productBox = document.createElement('div');
    productBox.className = 'product_Box';

    const textContainer = document.createElement('div');
    textContainer.className = 'text_container';

    const NamePriceBox = document.createElement('div');
    NamePriceBox.className = 'Name_price_container';

    const quantityREmoveBox = document.createElement('div');
    quantityREmoveBox.className = 'quantity_remove_container';

    const imgBox = document.createElement('div');

    const img = document.createElement('img');
    img.src = `essets/webp/main/products_page/${product.img}`;
    imgBox.appendChild(img);
    imgBox.className = 'imgbox';
    productBox.appendChild(imgBox);

    const name = document.createElement('h2');
    name.textContent = product.name;
    NamePriceBox.appendChild(name);

    const price = document.createElement('span');
    price.textContent = product.price;
    price.className = 'price';
    NamePriceBox.appendChild(price);

    textContainer.appendChild(NamePriceBox);

    const quantity = document.createElement('span');
    quantity.textContent = product.quantity;
    quantity.className = 'quantity';
    quantityREmoveBox.appendChild(quantity);

    const button = document.createElement('button');
    button.className = 'removebtn';
    button.textContent = 'Remove';

    button.addEventListener('click', function () {
      cart.splice(index, 1);

      localStorage.setItem('cart', JSON.stringify(cart));

      updateCartPopup();
    });

    quantityREmoveBox.appendChild(button);
    productBox.appendChild(textContainer);
    productBox.appendChild(quantityREmoveBox);

    productBoxContainer.appendChild(productBox);

    popup.appendChild(productBoxContainer);
  });

  const popupHead = document.createElement('div');
  popupHead.className = 'popupHead';

  const totalElemnts = document.createElement('div');
  totalElemnts.textContent = `CART (${items})`;
  popupHead.appendChild(totalElemnts);

  const removeAllElemnt = document.createElement('button');
  removeAllElemnt.textContent = 'Remove all';

  popupHead.appendChild(removeAllElemnt);

  popup.appendChild(popupHead);

  const totalpPrice = document.createElement('div');
  totalpPrice.className = 'price_container';

  const priceBox = document.createElement('p');
  priceBox.textContent = 'TOTAL';
  totalpPrice.appendChild(priceBox);

  const totalpriceBox = document.createElement('span');
  totalpriceBox.textContent = `$${total}`;
  totalpPrice.appendChild(totalpriceBox);

  popup.appendChild(totalpPrice);

  const link = document.createElement('a');
  link.href = 'checkout.html';

  const checkBtn = document.createElement('button');
  checkBtn.textContent = 'CHECKOUT';
  checkBtn.className = 'check';

  link.appendChild(checkBtn);
  popup.appendChild(link);

  removeAllElemnt.addEventListener('click', function removeremoveAllElemnts() {
    localStorage.removeItem('cart');

    cart = [];

    if ((cart = [])) {
      productBoxContainer.textContent = '';

      totalpriceBox.textContent = `$${(total = 0)}`;

      totalElemnts.textContent = `CART (${(items = 0)})`;
    }
  });
}
