var productApi = 'http://localhost:3000/products';
var listProductsBlock = document.querySelector('#listProducts');

class Product {
  constructor(images, name, quantity, price, discountPercent, describe) {
    this.images = images;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.discountPercent = discountPercent;
    this.describe = describe;
  }
  static from(json) {
    return Object.assign(new Product(), json);
  };
  applyData(json) {
    Object.assign(this, json);
  }
 }

function renderProducts(products) {
  var htmls = products.map(function(product) {
    const productData = new Product();
    productData.applyData(product);
    const images = Object.values(productData.images);

    return     `
    <li class="product-item  ${productData.discountPercent > 0 ? "product-item--discount" : ""} ">
        <div class="discount-tag">
            <p>-${productData.discountPercent}%</p>
        </div>
        <img src="${images[0]}" alt="" class="picture">
        <div class="info">
            <p>${productData.name}</p>
            <div class="price">
                <p class="orginal-price">
                    ${productData.discountPercent > 0 ? productData.price * productData.discountPercent / 100 : productData.price}
                </p>
                <p class="discount-price">
                    ${productData.price}
                </p>
            </div>
        </div>
    </li>`;
  });
  listProductsBlock.innerHTML = htmls.join('');
}

function start() {
  getProducts(renderProducts);
  handleCreateForm();
}

start();

function getProducts() {
  fetch(productApi) 
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    products = data;
    renderProducts(products);
  });
}

function createProduct(data, callback) {
  var options = {
    method: 'POST',
    body: JSON.stringify(data)
  };
  fetch(productApi, options)
   .then(function(response) {
      response.json();
      console.log(response);
    })
    .then(callback);
}

function handleCreateForm() {
  var createBtn = document.querySelector("#saveShow");
  createBtn.addEventListener('click', function() {
    var images = [
      document.querySelector('#productImage1').value,
      document.querySelector('#productImage2').value,
      document.querySelector('#productImage3').value,
      document.querySelector('#productImage4').value,
    ];
    var name = document.querySelector('#productName').value;
    var quantity = document.querySelector('#productQuantity').value;
    var price = document.querySelector('#productPrice').value;
    // var discountPercent = document.querySelector('#productDiscountPercent').value;
    var describe = document.querySelector('#productDescribe').value;
    
    var data = {
      images: images,
      name: name,
      quantity: quantity,
      price: price,
      // discountPercent: discountPercent,
      describe: describe
    };
    createProduct(data, function () {
      getProducts(renderProducts);
    });
  });
}