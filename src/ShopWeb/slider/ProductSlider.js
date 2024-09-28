import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductSlider.css";
import {
  fetchProducts,
  fetchNameImagesProduct,
  fetchImagesProduct,
  fetchCategories,
} from "../redux/productSlice";
import { Link } from "react-router-dom";
import { addCart } from "../redux/cartSlice";
import Swal from "sweetalert2";

export default function ProductSlider() {
  const dispatch = useDispatch();
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const { products, status, error } = useSelector((state) => state.products);
  const [productImageMap, setProductImageMap] = useState({});

  const handleProductSlideChange = (swiper) => {
    setCurrentProductSlide(swiper.activeIndex);
  };

  const handleNext = () => {
    setCurrentProductSlide((prevSlide) => prevSlide + 1);
  };

  const handlePrev = () => {
    setCurrentProductSlide((prevSlide) => prevSlide - 1);
  };

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success",
    });
  };

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
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    products.forEach((product) => {
      handleFetchImages(product.id);
    });
  }, [products]);

  useEffect(() => {
    const swiper = document.querySelector(".product-slider .swiper")?.swiper;
    if (swiper) {
      swiper.slideTo(currentProductSlide);
    }
  }, [currentProductSlide]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const firstFiveProducts = products.slice(0, 5);

  return (
    <div className="product-slider container mt-4">
      <Swiper
        onSlideChange={handleProductSlideChange}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          992: { slidesPerView: 4, spaceBetween: 10 },
          1200: { slidesPerView: 4, spaceBetween: 10 },
        }}
      >
         {firstFiveProducts.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-card">
            <div className="product-image">
              <Link to={`/product/${product.id}`}>
                {Array.isArray(productImageMap[product.id]) &&
                productImageMap[product.id].length > 0 ? (
                  <img
                    src={productImageMap[product.id][0]}
                    alt={product.name}
                    onError={(e) => {
                      console.error(
                        `Lỗi khi tải ảnh: ${productImageMap[product.id][0]}`
                      );
                      e.target.src = "đường_dẫn_đến_ảnh_mặc_định";
                    }}
                  />
                ) : (
                  <img
                    src="đường_dẫn_đến_ảnh_mặc_định"
                    alt={product.name}
                  />
                )}
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
                Thêm vào giỏ
              </button>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-category">
                {product.category ? (
                  <Link
                    to={`/products/${product.category.name.toLowerCase()}`}
                    className="category-link"
                  >
                    {product.category.name}
                  </Link>
                ) : (
                  "Không có danh mục"
                )}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="view-details-btn"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="slider-navigation">
      <button className="prev-button" onClick={handlePrev}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="next-button" onClick={handleNext}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
  );
}
