import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategory, setPrice, setSearchTerm } from "../redux/productSlice";
import AOS from "aos";
import Swal from 'sweetalert2';
import { addCart, overwriteCarts } from "../redux/cartSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch(); // Sử dụng hook useDispatch để dispatch các action
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng URL
  const carts = useSelector((state) => state.carts.carts); // Lấy thông tin giỏ hàng từ Redux store
  const { category, price, search, brand } = useParams(); // Lấy thông tin từ URL params
  const products = useSelector((state) => state.products.filteredProducts); // Lấy danh sách sản phẩm đã lọc từ Redux store
  const status = useSelector((state) => state.products.status); // Lấy trạng thái của fetch sản phẩm
  const error = useSelector((state) => state.products.error); // Lấy thông tin lỗi nếu có
  const selectedCategory = useSelector((state) => state.products.selectedCategory); // Lấy danh mục đã chọn
  const selectedPrice = useSelector((state) => state.products.selectedPrice); // Lấy mức giá đã chọn
  const selectedBrand = useSelector((state) => state.products.selectedBrand); // Lấy mức giá đã chọn
  const searchTerm = useSelector((state) => state.products.searchTerm); // Lấy từ khóa tìm kiếm

  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại của phân trang
  const itemsPerPage = 9; // Số sản phẩm hiển thị mỗi trang

  useEffect(() => {
    AOS.init(); // Khởi tạo AOS cho hiệu ứng cuộn
  }, []);

  useEffect(() => {
    const storedCarts = localStorage.getItem("carts"); // Lấy giỏ hàng từ localStorage
    if (storedCarts) {
      dispatch(overwriteCarts(JSON.parse(storedCarts))); // Cập nhật giỏ hàng từ localStorage vào Redux store
    }
  }, [dispatch]);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts)); // Lưu giỏ hàng vào localStorage khi giỏ hàng thay đổi
    }
  }, [carts]);

  const handleAddToCart = (product) => {
    dispatch(addCart(product)); // Dispatch action thêm sản phẩm vào giỏ hàng
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success"
    }); // Hiển thị thông báo thành công
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // Fetch danh sách sản phẩm nếu trạng thái là "idle"
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category.toLowerCase())); // Cập nhật danh mục đã chọn
    }
    if (price) {
      dispatch(setPrice(price.toLowerCase())); // Cập nhật mức giá đã chọn
    }
    if (search) {
      dispatch(setSearchTerm(search.toLowerCase())); // Cập nhật từ khóa tìm kiếm
    }
    if (brand) {
      dispatch(setCategory(brand.toLowerCase())); // Cập nhật danh mục đã chọn
    }
  }, [category, price, search, brand, dispatch]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value.toLowerCase(); // Lấy giá trị danh mục đã chọn
    dispatch(setCategory(selectedCategory)); // Dispatch action cập nhật danh mục
    updateURL(selectedCategory, selectedPrice, searchTerm); // Cập nhật URL
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value.toLowerCase(); // Lấy giá trị danh mục đã chọn
    dispatch(setCategory(selectedBrand)); // Dispatch action cập nhật danh mục
    updateURL(selectedCategory, selectedPrice, searchTerm); // Cập nhật URL
  };

  const handlePriceChange = (event) => {
    const selectedPrice = event.target.value.toLowerCase(); // Lấy giá trị mức giá đã chọn
    dispatch(setPrice(selectedPrice)); // Dispatch action cập nhật mức giá
    updateURL(selectedCategory, selectedPrice, searchTerm); // Cập nhật URL
  };

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase(); // Lấy giá trị từ khóa tìm kiếm
    dispatch(setSearchTerm(newSearchText)); // Dispatch action cập nhật từ khóa tìm kiếm
    updateURL(selectedCategory, selectedPrice, newSearchText); // Cập nhật URL
  };

  const updateURL = (category, price, search) => {
    const basePath = `/products`;
    const categoryPath = category && category !== "all" ? `/${category}` : "/all";
    const pricePath = price && price !== "all" ? `/${price}` : "/all";
    const searchPath = search ? `/${search}` : "";

    navigate(`${basePath}${categoryPath}${pricePath}${searchPath}`); // Điều hướng tới URL mới
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại khi phân trang thay đổi
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // Tính chỉ mục bắt đầu của sản phẩm trên trang hiện tại
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage); // Lấy danh sách sản phẩm trên trang hiện tại

  if (status === "loading") {
    return <div className="text-center">Loading...</div>; // Hiển thị trạng thái loading khi đang fetch sản phẩm
  }

  if (status === "failed") {
    return <div className="text-center text-danger">Error: {error}</div>; // Hiển thị lỗi nếu fetch sản phẩm thất bại
  }

  const categories = ["All", "Men", "Women", "Hoodie", "Hat", "Vest", "Bag"]; // Danh sách các danh mục
  const priceRanges = ["All", "Under $50", "$50 - $100", "Above $100"];
  const brands = ["All", "Nike", "Adidas", "Puma", "Reebok", "Converse", "Vans"]; // Danh sách các mức giá

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
            {currentProducts.map((product) => {
              const productImage = require(`../../imgs/${product.image}.jpg`); // Lấy hình ảnh sản phẩm
              return (
                <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100" data-aos="zoom-in-up">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={productImage}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body">
                      <div className="card-content">
                        <h5 className="card-name">{product.name}</h5>
                        <p className="card-text">Price: ${product.price}</p>
                        <p className="card-text">
                          Category:{" "}
                          {product.category.map((cat, index) => (
                            <span key={index}>
                              <Link
                                to={`/products/${cat.toLowerCase()}`}
                                className="category-link"
                              >
                                {cat}
                              </Link>
                              {index < product.category.length - 1 && ", "}
                            </span>
                          ))}
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
              );
            })}
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
