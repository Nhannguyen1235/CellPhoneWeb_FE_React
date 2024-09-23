import Header from "../../ShopWeb/header/Header";
import Footer from "../../ShopWeb/footer/Footer";
import "../Home/HomePage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FiWatch } from "react-icons/fi";
import { MdOutlineHeadphones } from "react-icons/md";
import SBC_men from "../../imgs/SBC_men.png";
import SBC_women from "../../imgs/SBC_women.png";
import Free_shiping from "../../imgs/free-deliver-icon.webp";
import Offer from "../../imgs/offers-icon.webp";
import Support from "../../imgs/support-icon.webp";
import Camera from "../../imgs/camera.webp";
import { GiPoloShirt } from "react-icons/gi";
import Slider from "../../ShopWeb/slider/BannerSlider";
import BrandSlider from "../../ShopWeb/slider/BrandSlider";
import ProductSlider from "../../ShopWeb/slider/ProductSlider";
import { NavLink } from "reactstrap";
import ScrollUp from "../../ShopWeb/scrollUp/ScrollUp";
import { Link } from "react-router-dom";

export default function HomePage() {
  AOS.init();
  return (
    <div>
      <Header />
      <main className="main">
        <Slider />
      </main>
      <section className="provider-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="box-provider">
                <div className="icon-provider p-3">
                  <img src={Free_shiping}></img>
                </div>
                <div className="text-provider p-3">
                <div className="text-provider-title">
                <h3>Free Shipping</h3>
                </div>
                <p>For orders over $50</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-provider">
                <div className="icon-provider p-3">
                  <img src={Offer}></img>
                </div>
                <div className="text-provider p-3">
                <div className="text-provider-title">
                <h3>Official Discounts</h3>
                </div>
                <p>Save Big on next product</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-provider">
                <div className="icon-provider p-3">
                  <img src={Support}></img>
                </div>
                <div className="text-provider p-3">
                  <div className="text-provider-title">
                <h3>24/7 Helpline</h3>
                  </div>
                <p>Care till the end</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-funfact position-relative">
            <div className="bg-overlay"></div>
            <div className="container position-relative text-center">
                <div className="section-title p-5">
                    <h3 className="text-white">JENNIFER F., CASPER CUSTOMER</h3>
                    <h1 className="text-white">"Unbeatable price, and it’s super comfortable"</h1>
                </div>
                <div className="section-btn pb-5">
                <a href="/#" className="btn btn-secondary">View More</a>
                </div>
                
            </div>
      </section>
      <section className="product-features p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>RAISE YOUR EXPECTATIONS</h2>
              <h3>REFINED VIEWING EXPERIENCE</h3>
              <hr />
              <h2>42MP FRONT CAMERA FOR PERFECT SHOT</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
              <p>Diam vulputate ut pharetra sit. Elit ut aliquam purus sit amet luctus venenatis lectus. Lorem dolor sed viverra ipsum nunc aliquet. Ut consequat semper viverra nam libero. Velit ut tortor aremn.</p>
            </div>
            <div className="col-md-6">
              <img className="img-fluid" alt="Product image" src={Camera} />
            </div>
          </div>
        </div>
      </section>
      <section className="productSlider text-center">
        <h1>New Arrival</h1>
        <ProductSlider />
      </section>
      <section className="colection text-center">
        <h1>Colections</h1>
        <div className="colections row text-center">
          <div
            className="men_colection col-lg-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="box__men_colection p-3">
              <Link to={"/products/men"}>
                <img src={SBC_men}></img>
                <button className="btn-filter btn btn-outline-secondary">
                  Men's
                </button>
              </Link>
            </div>
          </div>
          <div
            className="women_colection col-lg-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="box_women_colection p-3">
              <Link to={"/products/women"}>
                <img src={SBC_women}></img>
                <button className="btn-filter btn btn-outline-secondary">
                  Women's
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="brandSlider text-center">
        <h1>Our Brands</h1>
        <BrandSlider />
      </section>
      <section className="category container text-center mt-3">
        <h1>Trending Category</h1>
        <div className="row " id="row">
          <div className="box col-md-4">
            <NavLink
              className="icon"
              data-aos="flip-left"
              data-aos-delay="300"
              href="/products/vest"
            >
              <IoPhonePortraitOutline />
            </NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink
              className="icon"
              data-aos="flip-left"
              data-aos-delay="500"
              href="/products/hoodie"
            >
              <MdOutlineHeadphones />
            </NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink
              className="icon"
              data-aos="flip-left"
              data-aos-delay="700"
              href="/products/hat"
            >
              <FiWatch />
            </NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink
              className="icon"
              data-aos="flip-left"
              data-aos-delay="900"
              href="/products/men"
            >
              <GiPoloShirt />
            </NavLink>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollUp />
    </div>
  );
}
