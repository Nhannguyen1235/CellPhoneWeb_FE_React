import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductSlider.css';
import { fetchProducts } from '../redux/productSlice';

export default function ProductSlider() {
  const dispatch = useDispatch();
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const { products, status, error } = useSelector((state) => state.products);

  const handleProductSlideChange = (swiper) => {
    setCurrentProductSlide(swiper.activeIndex);
  };

  const handleNext = () => {
    setCurrentProductSlide((prevSlide) => prevSlide + 1);
  };

  const handlePrev = () => {
    setCurrentProductSlide((prevSlide) => prevSlide - 1);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const swiper = document.querySelector('.product-slider .swiper')?.swiper;
    if (swiper) {
      swiper.slideTo(currentProductSlide);
    }
  }, [currentProductSlide]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-slider container mt-4">
      <Swiper
        onSlideChange={handleProductSlideChange}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          992: { slidesPerView: 4, spaceBetween: 10 },
          1200: { slidesPerView: 4, spaceBetween: 10 },
        }}
      >
        {products.map((product, index) => {
          const productImage = require(`../../imgs/${product.image}.jpg`);

          return (
            <SwiperSlide key={index}>
              <img src={productImage} className="img-fluid" alt={product.name} />
              <div className="product-info">
                <h5>{product.name}</h5>
                <p>${product.price}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="button justify-content-between mt-3">
        <button className="prev-button" onClick={handlePrev}>{"<"}</button>
        <button className="next-button" onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
}