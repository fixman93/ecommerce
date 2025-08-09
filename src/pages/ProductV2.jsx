import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { Spinner } from "react-bootstrap";
import { setProducts } from "../redux/action/productsActions";

const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const ProductV2 = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error retrieving product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // Filtriraj proizvode po kategoriji
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Our Products</h2>

      {/* Filter dugmad */}
      <div className="mb-4 d-flex justify-content-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-outline-primary ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
            style={{ borderRadius: "8px" }}
          >
            {cat === "jewelery" ? "Jewelry" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Proizvodi */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: "15px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h6
                  className="card-title fw-semibold"
                  style={{ minHeight: "56px", fontSize: "1rem", color: "#212529" }}
                  title={product.title}
                >
                  {product.title.length > 55
                    ? product.title.slice(0, 55) + "..."
                    : product.title}
                </h6>

                <p className="fw-bold text-primary fs-5 mb-3">${product.price.toFixed(2)}</p>

                <select className="form-select form-select-sm mb-3" aria-label="Product variants">
                  <option>Default</option>
                  <option>Variant 1</option>
                  <option>Variant 2</option>
                </select>

                {product.rating.count > 0 ? (
                  <button
                    className="btn btn-primary mt-auto shadow-sm"
                    onClick={() => addProduct(product)}
                    style={{ borderRadius: "10px", fontWeight: "600" }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary mt-auto"
                    disabled
                    style={{ borderRadius: "10px", fontWeight: "600" }}
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductV2;
