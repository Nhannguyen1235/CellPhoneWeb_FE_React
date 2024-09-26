import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchNameImagesProduct, fetchImagesProduct } from "../redux/productSlice";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./product.css";
import { addCart } from "../redux/cartSlice";
import Swal from "sweetalert2";

export default function Product() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const carts = useSelector((state) => state.cart.carts);
  const [mainImage, setMainImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const swiperRef = useRef(null);

  const { currentProduct, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById({productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }, [carts]);

  useEffect(() => {
    if (currentProduct) {
      handleFetchImages(currentProduct.id);
    }
  }, [currentProduct]);

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success"
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
      setProductImages(validImageUrls);
      if (validImageUrls.length > 0) {
        setMainImage(validImageUrls[0]);
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh cho sản phẩm:", productId, error);
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  if (status === 'loading') {
    return <div>Đang tải...</div>;
  }

  if (status === 'failed') {
    return <div>Lỗi: {error}</div>;
  }

  if (!currentProduct) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="container product-details">
      <div className="row text-center">
        <div className="col-md-6">
          {/* Hiển thị hình ảnh chính trên màn hình lớn */}
          <img
            src={mainImage}
            alt={currentProduct.name}
            className="img-fluid main-image d-none d-md-block"
          />
          {/* Hiển thị slider trên màn hình nhỏ */}
          <div className="d-md-none">
            <Swiper
              ref={swiperRef}
              pagination={{ clickable: true }}
              navigation={false}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {productImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`sub-${index}`}
                    className="img-fluid"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="button justify-content-between mt-3">
              <button className="prev-button" onClick={handlePrev}>
                {"<"}
              </button>
              <button className="next-button" onClick={handleNext}>
                {">"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{currentProduct.name}</h2>
          <p>Giá: ${currentProduct.price}</p>
          <p>Danh mục: {currentProduct.category.name}</p>
          <p>Mô tả: {currentProduct.description}</p>
          <button className="btn btn-primary" onClick={() => handleAddToCart(currentProduct)}>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div className="row mt-4 d-none d-md-flex">
        {productImages.length > 0 && (
          <div className="col-md-12">
            <h3>Hình ảnh bổ sung</h3>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`sub-${index}`}
                  className="img-thumbnail"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}