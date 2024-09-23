import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import brand1 from '../../imgs/logo_apple.png';
import brand2 from '../../imgs/logo_huawei.jpg';
import brand3 from '../../imgs/logo_samsung.jpg';
import brand4 from '../../imgs/logo_xiaomi.jpg';
import brand5 from '../../imgs/logo_oppo.png';
import './BrandSlider.css';

export default function BrandSlider() {
    const [currentBrandSlide, setCurrentBrandSlide] = useState(0);

    const handleBrandSlideChange = (swiper) => {
        setCurrentBrandSlide(swiper.activeIndex);
    };

    useEffect(() => {
        const swiper = document.querySelector('.brand-slider .swiper').swiper;
        swiper.slideTo(currentBrandSlide);
    }, [currentBrandSlide]);

    return (
        <div className="brand-slider p-3 container mt-4">

        <Swiper
            onSlideChange={handleBrandSlideChange}
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                576: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                992: { slidesPerView: 4, spaceBetween: 10 },
                1200: { slidesPerView:4, spaceBetween: 10 },
            }}
        >
            <SwiperSlide>
                <img src={brand1} className="img-fluid" alt="Brand 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={brand2} className="img-fluid" alt="Brand 2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={brand3} className="img-fluid" alt="Brand 3" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={brand4} className="img-fluid" alt="Brand 4" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={brand5} className="img-fluid" alt="Brand 5" />
            </SwiperSlide>
        </Swiper>
    </div>
);
}