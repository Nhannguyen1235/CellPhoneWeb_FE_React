import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setPrice,
  setSearchTerm,
  setBrand,
  fetchNameImagesProduct,
  fetchImagesProduct,
} from "../redux/productSlice";
import AOS from "aos";
import Swal from "sweetalert2";
import { addCart, overwriteCarts } from "../redux/cartSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const [productImageMap, setProductImageMap] = useState({});
  const { category, price, search, brand } = useParams();
  const products = useSelector((state) => state.products.filteredProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const selectedPrice = useSelector((state) => state.products.selectedPrice);
  const selectedBrand = useSelector((state) => state.products.selectedBrand);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const storedCarts = localStorage.getItem("carts");
    if (storedCarts) {
      dispatch(overwriteCarts(JSON.parse(storedCarts)));
    }
  }, [dispatch]);

  useEffect(() => {
    products.forEach((product) => {
      if (!productImageMap[product.id]) {
        handleFetchImages(product.id);
      }
    });
  }, [products, productImageMap]);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem("carts", JSON.stringify(carts));
    }
  }, [carts]);

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success",
    });
  };

  useEffect(() => {
    dispatch(handleFetchImages());
  }, [dispatch]);

  const handleFetchImages = async (productId) => {
    try {
      const imageNames = await dispatch(
        fetchNameImagesProduct({ productId })
      ).unwrap();
      const imageUrls = await Promise.all(
        imageNames.map(async (image) => {
          const response = await dispatch(
            fetchImagesProduct({
              imageName: image.imageUrl,
              options: { responseType: "blob" },
            })
          ).unwrap();

          if (response instanceof Blob) {
            return URL.createObjectURL(response);
          } else {
            console.error("Phản hồi không phải là Blob:", response);
            return null;
          }
        })
      );

      const validImageUrls = imageUrls.filter((url) => url !== null);
      setProductImageMap((prevState) => ({
        ...prevState,
        [productId]: validImageUrls,
      }));
    } catch (error) {
      console.error("Lỗi khi tải ảnh cho sản phẩm:", productId, error);
    }
  };

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category.toLowerCase()));
    }
    if (price) {
      dispatch(setPrice(price.toLowerCase()));
    }
    if (search) {
      dispatch(setSearchTerm(search.toLowerCase()));
    }
    if (brand) {
      dispatch(setBrand(brand.toLowerCase()));
    }
  }, [category, price, search, brand, dispatch]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value.toLowerCase();
    dispatch(setCategory(selectedCategory));
    updateURL(selectedCategory, selectedPrice, selectedBrand, searchTerm);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value.toLowerCase();
    dispatch(setBrand(selectedBrand));
    updateURL(selectedCategory, selectedPrice, selectedBrand, searchTerm);
  };

  const handlePriceChange = (event) => {
    const selectedPrice = event.target.value.toLowerCase();
    dispatch(setPrice(selectedPrice));
    updateURL(selectedCategory, selectedPrice, selectedBrand, searchTerm);
  };

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    dispatch(setSearchTerm(newSearchText));
    updateURL(selectedCategory, selectedPrice, selectedBrand, newSearchText);
  };

  const updateURL = (category, price, brand, search) => {
    const basePath = `/products`;
    const categoryPath =
      category && category !== "all" ? `/${category}` : "/all";
    const pricePath = price && price !== "all" ? `/${price}` : "/all";
    const brandPath = brand && brand !== "all" ? `/${brand}` : "/all";
    const searchPath = search ? `/${search}` : "";

    navigate(`${basePath}${categoryPath}${pricePath}${brandPath}${searchPath}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const categories = ["All", "Men", "Women", "Hoodie", "Hat", "Vest", "Bag"];
  const priceRanges = ["All", "Under $50", "$50 - $100", "Above $100"];
  const brands = [
    "All",
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Converse",
    "Vans",
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="sidebar-content">
            <h4 className="my-4">Filters</h4>
            <div className="mb-4">
              <h5>Category</h5>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h5>Brands</h5>
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                className="form-select"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h5>Price Range</h5>
              <select
                value={selectedPrice}
                onChange={handlePriceChange}
                className="form-select"
              >
                {priceRanges.map((priceRange) => (
                  <option key={priceRange} value={priceRange.toLowerCase()}>
                    {priceRange}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h5>Search</h5>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
                placeholder="Search products name..."
              />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center my-4">Product List</h2>
          <div className="row">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100" data-aos="zoom-in-up">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={
                        productImageMap[product.id] &&
                        productImageMap[product.id].length > 0
                          ? productImageMap[product.id][0]
                          : "placeholder-image-url"
                      } // Thay 'placeholder-image-url' bằng URL của ảnh mặc định
                      className="card-img-top"
                      alt={product.name}
                    />
                  </Link>
                  <div className="card-body">
                    <div className="card-content">
                      <h5 className="card-name">{product.name}</h5>
                      <p className="card-text">Price: ${product.price}</p>
                      <p className="card-text">
                        Category: {product.category.name}
                      </p>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-view btn-outline-dark"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-view btn-outline-dark"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(products.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
