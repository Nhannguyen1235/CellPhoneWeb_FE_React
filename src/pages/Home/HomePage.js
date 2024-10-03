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
import centerImg from "../../imgs/center-img.webp";
import Support from "../../imgs/support-icon.webp";
import Camera from "../../imgs/camera.webp";
import gal1 from "../../imgs/gal1.webp";
import gal2 from "../../imgs/gal2.webp";
import gal3 from "../../imgs/gal3.webp";
import gal4 from "../../imgs/gal4.webp";
import gal5 from "../../imgs/gal5.webp";
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
        <div className="container bg-conten position-relative text-center">
          <div className="section-title">
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
      <section className="entertainment-section">
        <div className="container">
          <h2 className="section-title">LOSE YOURSELF IN ENTERTAINMENT</h2>
          <p className="section-subtitle">SPEND LESS ENJOY MORE</p>
          
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-number">1</div>
                <h3>TRIPLE CAMERA</h3>
                <p>Duis at tellus at urna condimentum mattis pellentesque id nibh. Elit scelerisque mauris pellentesque pulvinar. Nunc aliquet bibendum enim facilisis gravida.</p>
                <button className="btn btn-dark">View More</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-number">2</div>
                <h3>ULTRA GAME MODE</h3>
                <p>Urna et pharetra pharetra massa massa ultricies mi. Scelerisque varius morbi enim nunc faucibus a pellentesque. Purus sit amet volutpat consequat mauris.</p>
                <button className="btn btn-dark">View More</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-number">3</div>
                <h3>SUPER AMOLED DISPLAY</h3>
                <p>Urna neque viverra justo nec ultrices dui sapien eget mi. Sed elementum tempus egestas sed sed risus pretium quam vulputate. Neque sodales ut etiam.</p>
                <button className="btn btn-dark">View More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="innovative-features">
        <div className="container">
          <h2 className="section-title">INNOVATIVE QUALITIES & FEATURES</h2>
          <p className="section-subtitle">SHOW YOURS TO THE WORLD</p>
          
          <div className="features-container">
            <div className="feature-column left-features">
              <div className="feature">
                <h3>INTELLIGENT PROCESSOR</h3>
                <p>Tellus in hac habitasse platea dictumst vestibulum rhoncus srd mana erti geueri</p>
              </div>
              <div className="feature">
                <h3>HD SURROUND AUDIO</h3>
                <p>Sagittis eu volutpat odio ante ut diam quam metus dictfacilisis mauris sit am.</p>
              </div>
              <div className="feature">
                <h3>STYLISH BEVEL EDGES</h3>
                <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid</p>
              </div>
            </div>
            
            <div className="center-image">
              <img src={centerImg} alt="Delta Magnum X" />
            </div>
            
            <div className="feature-column right-features">
              <div className="feature">
                <h3>4.0 WIFI SPECS</h3>
                <p>Commodo nulla facilisi nullam vehicula ipsum a arcu sagitis ipsum sed iacus.</p>
              </div>
              <div className="feature">
                <h3>MULIT TASKING & THREADING</h3>
                <p>Amet consectetur adipiscing velit laoreet nega id elit pellentesque habitant morbi .</p>
              </div>
              <div className="feature">
                <h3>CLOUD STORAGE</h3>
                <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-gallery">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 p-0">
        <div className="gallery-item main-item">
          <img src={gal1} alt="Product 1" />
          <div className="overlay">
            <div className="overlay-content">
              <h3>CURVED CERAMIC BODY</h3>
              <h2>EXTREMELY THIN AND LIGHT</h2>
              <Link to="/products" className="btn btn-view">View More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 p-0">
        <div className="row m-0">
          <div className="col-6 p-0">
            <div className="gallery-item">
              <img src={gal2} alt="Product 2" />
              <div className="overlay">
            <div className="overlay-content">
              <h3>CRYSTAL POLYCARBONATE</h3>
              <h2>PRECISE CUT-OUTS</h2>
              <Link to="/products" className="btn btn-view">View More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 p-0">
            <div className="gallery-item">
              <img src={gal3} alt="Product 3" />
              <div className="overlay">
            <div className="overlay-content">
              <h3>BEAUTIFUL FINISH</h3>
              <h2>SEVEN LAYER COLOR</h2>
              <Link to="/products" className="btn btn-view">View More</Link>
            </div>
          </div>
            </div>
          </div>
          <div className="col-6 p-0">
            <div className="gallery-item">
              <img src={gal4} alt="Product 4" />
              <div className="overlay">
            <div className="overlay-content">
              <h3>HIGH SPEED</h3>
              <h2>POWER OF ANDROID</h2>
              <Link to="/products" className="btn btn-view">View More</Link>
            </div>
          </div>
            </div>
          </div>
          <div className="col-6 p-0">
            <div className="gallery-item">
              <img src={gal5} alt="Product 5" />
              <div className="overlay">
            <div className="overlay-content">
              <h3>CURVED CERAMIC BODY</h3>
              <h2>EXTREMELY THIN AND LIGHT</h2>
              <Link to="/products" className="btn btn-view">View More</Link>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <section className="productSlider text-center">
        <h1>New Arrival</h1>
        <ProductSlider />
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
