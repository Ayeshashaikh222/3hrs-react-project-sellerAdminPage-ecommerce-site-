import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [productId, setProductId] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load existing products from localStorage on initial render
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    // Update localStorage whenever products change
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new product object
    const newProduct = {
      id: productId,
      name: productName,
      price: parseFloat(sellingPrice),
    };

    // Add the new product to the products list
    setProducts([...products, newProduct]);

    // Reset form fields
    setProductId('');
    setSellingPrice('');
    setProductName('');
  };

  const handleDelete = (id) => {
    // Filter out the product to be deleted
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // Calculate total amount
  const totalAmount = products.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <label>Selling Price:</label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>

      <ul>
        <h4>Products:</h4>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h4>Total Amount:${totalAmount}</h4>

    </div>
  );
};

export default ProductForm;