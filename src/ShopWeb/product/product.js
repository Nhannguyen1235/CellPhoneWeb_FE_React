import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/productSlice";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./product.css";
import { addCart } from "../redux/cartSlice";
import Swal from "sweetalert2";

export default function Product() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const carts = useSelector((state) => state.carts.carts);
  const [mainImage, setMainImage] = useState("");
  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

   // Lưu carts vào localStorage khi có thay đổi
   useEffect(() => {
    // Chỉ lưu vào localStorage khi carts thay đổi
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }, [carts]);

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success"
    });
  };

  const product = useSelector((state) =>
    state.products.products.find((product) => product.id === productId)
  );

  useEffect(() => {
    if (product) {
      setMainImage(require(`../../imgs/${product.image}.jpg`));
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const allImages = [product.image, ...product.imageSub];

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

  return (
    <div className="container product-details">
      <div className="row text-center">
        <div className="col-md-6">
          {/* Hiển thị hình ảnh chính trên màn hình lớn */}
          <img
            src={mainImage}
            alt={product.name}
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
              {allImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={require(`../../imgs/${image}.jpg`)}
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
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category.join(", ")}</p>
          <p>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam non urna sit amet tortor sollicitudin pharetra.
          </p>
          <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
      <div className="row mt-4 d-none d-md-flex">
        {product.imageSub && product.imageSub.length > 0 && (
          <div className="col-md-12">
            <h3>Additional Images</h3>
            <div className="image-thumbnails">
              {allImages.map((image, index) => (
                <img
                  key={index}
                  src={require(`../../imgs/${image}.jpg`)}
                  alt={`sub-${index}`}
                  className="img-thumbnail"
                  onClick={() =>
                    setMainImage(require(`../../imgs/${image}.jpg`))
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
