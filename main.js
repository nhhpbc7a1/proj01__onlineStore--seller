var productApi = 'http://localhost:3000/products';

fetch(productApi)
  .then(response => response.json())
  .then(data => {
    const products = data;
    console.log(products);
  });