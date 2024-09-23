import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { nextSlide, prevSlide, setSlide } from '../redux/sliderSlice';
import img_slider from '../../imgs/phono-slider-1.webp';
import img_slider2 from '../../imgs/phono-slider-2.webp';
import img_slider3 from '../../imgs/phono-slider-3.webp';
import img_slider4 from '../../imgs/1931319.jpg';
import './Slider.css';

export default function Slider() {
    const dispatch = useDispatch();
    const { currentSlide } = useSelector((state) => state.slider);
    const totalSlides = 4; 
  
    const handleSlideChange = (swiper) => {
      dispatch(setSlide(swiper.activeIndex));
    };
  
    const handleNext = () => {
      dispatch(nextSlide(totalSlides));
    };
  
    const handlePrev = () => {
      dispatch(prevSlide(totalSlides));
    };
  
    useEffect(() => {
      const swiper = document.querySelector('.events-slider .swiper').swiper;
      swiper.slideTo(currentSlide);
    }, [currentSlide]);

    return (
      <main>
        <div className="events-slider">
          <Swiper
            onSlideChange={handleSlideChange}
            initialSlide={currentSlide}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {[img_slider, img_slider2, img_slider3, img_slider4].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <img src={img} alt={`event-${index}`} />
                  <div className={`content ${currentSlide === index ? 'runleft' : ''}`}>
                    <h1 className="title">OnePlus 11 5G</h1>
                    <p className="description">OnePlus 11 5G is a high-end smartphone with a 6.7-inch AMOLED display, Qualcomm Snapdragon 8 Gen 2 processor, 12GB of RAM, and 256GB of storage.It has a 50MP main camera, 16MP ultrawide camera, and 2MP macro camera. It also has a 5000mAh battery with 80W fast charging and 50W wireless charging.</p>
                    <button href="" className='btn btn-secondary btn-outline-dark'>Read More</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="buttons">
            <button onClick={handlePrev} id="prev">{"<"}</button>
            <button onClick={handleNext} id="next">{">"}</button>
          </div>
          <ul className="dots">
            {[...Array(totalSlides)].map((_, index) => (
              <li
                key={index}
                className={index === currentSlide ? 'active' : ''}
                onClick={() => dispatch(setSlide(index))}
              ></li>
            ))}
          </ul>
        </div>
      </main>
    );
}
