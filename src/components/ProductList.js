import React, { useState } from "react";
import { Range } from "react-range"; // Install react-range for the slider
import products from "../data/products";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const [filter, setFilter] = useState({
    categories: [], // Array to store selected categories
    colors: [], // Array to store selected colors
    price: [0, 1000],
    discount: "All", // Radio button selection for discount
  });
  const [sort, setSort] = useState("price-low-to-high");

  const categories = ["Electronics", "Clothing", "Shoes"];
  const colors = ["Black", "Blue", "Silver", "Gray", "White", "Red"];
  const discounts = ["All", "10% or more", "15% or more", "20% or more", "25% or more", "30% or more"];

  // Filter products
  const filteredProducts = products.filter((product) => {
    return (
      (filter.categories.length === 0 || filter.categories.includes(product.category)) && // Check selected categories
      (filter.colors.length === 0 || filter.colors.includes(product.color)) && // Check selected colors
      product.price >= filter.price[0] &&
      product.price <= filter.price[1] &&
      (filter.discount === "All" ||
        (filter.discount === "10% or more" && product.discount >= 10) ||
        (filter.discount === "15% or more" && product.discount >= 15) ||
        (filter.discount === "20% or more" && product.discount >= 20) ||
        (filter.discount === "25% or more" && product.discount >= 25) ||
        (filter.discount === "30% or more" && product.discount >= 30))
    );
  });

  // Sort products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "price-low-to-high") return a.price - b.price;
    if (sort === "price-high-to-low") return b.price - a.price;
    if (sort === "rating-high-to-low") return b.rating - a.rating;
    if (sort === "discount-high-to-low") return b.discount - a.discount;
    return 0;
  });

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    if (filter.categories.includes(category)) {
      setFilter({ ...filter, categories: filter.categories.filter((c) => c !== category) });
    } else {
      setFilter({ ...filter, categories: [...filter.categories, category] });
    }
  };

  // Handle color checkbox changes
  const handleColorChange = (color) => {
    if (filter.colors.includes(color)) {
      setFilter({ ...filter, colors: filter.colors.filter((c) => c !== color) });
    } else {
      setFilter({ ...filter, colors: [...filter.colors, color] });
    }
  };

  return (
    <div className="container-fluid mt-4 p-4" style={{ padding: "20px" }}>
      {/* Page Heading */}
      <h1 className="text-center mb-4">Ecommerce Product Catalog</h1>

      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Filters</h5>

            {/* Category Checkboxes */}
            <div className="mb-4">
              <label>Category:</label>
              {categories.map((category) => (
                <div key={category} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={category}
                    checked={filter.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="form-check-label" htmlFor={category}>
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {/* Color Checkboxes with Color Boxes */}
            <div className="mb-4">
              <label>Color:</label>
              {colors.map((color) => (
                <div key={color} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={color}
                    checked={filter.colors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  <label className="form-check-label" htmlFor={color} style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: color.toLowerCase(),
                        marginRight: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "3px",
                      }}
                    ></div>
                    {color}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Range Slider */}
            <div className="mb-4">
              <label>Price Range: ${filter.price[0]} - ${filter.price[1]}</label>
              <Range
                step={10}
                min={0}
                max={1000}
                values={filter.price}
                onChange={(values) => setFilter({ ...filter, price: values })}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ddd",
                      borderRadius: "3px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#007bff",
                      borderRadius: "50%",
                    }}
                  />
                )}
              />
            </div>

            {/* Discount Radio Buttons */}
            <div className="mb-3">
              <label>Discount:</label>
              {discounts.map((discount) => (
                <div key={discount} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={discount}
                    name="discount"
                    value={discount}
                    checked={filter.discount === discount}
                    onChange={(e) => setFilter({ ...filter, discount: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor={discount}>
                    {discount}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div className="col-md-9">
          <div className="d-flex justify-content-end mb-4">
            <label>Sort by:</label>
            <select
              className="form-control ml-2"
              style={{ width: "200px" }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price-low-to-high">Price (Low to High)</option>
              <option value="price-high-to-low">Price (High to Low)</option>
              <option value="rating-high-to-low">Rating (High to Low)</option>
              <option value="discount-high-to-low">Discount (High to Low)</option>
            </select>
          </div>
          <div className="row">
            {sortedProducts.slice(0, 9).map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "400px", objectFit: "cover" }} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Discount: {product.discount}%</p>
                    <p className="card-text">Rating: {product.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;