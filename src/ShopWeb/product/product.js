import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchNameImagesProduct, fetchImagesProduct } from "../redux/productSlice";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import "swiper/css";
import "./product.css";
import { addCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { Button, Rate, Space, Tag, Tabs, Form, Input } from "antd";
import { Col, Container, Row } from "reactstrap";
import avatar from "../../imgs/avatar.png";

export default function Product() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const carts = useSelector((state) => state.cart.carts);
  const [mainImage, setMainImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const swiperRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();


  const { currentProduct, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById({ productId }));
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

  const handleAddToCart = (product, quantity) => {
    const cartItem = {
      product: product,
      quantity: quantity
    };
    dispatch(addCart(cartItem));
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
      <div className="row">
        <div className="col-md-6">
          <img
            src={mainImage}
            alt={currentProduct.name}
            className="img-fluid main-image d-none d-md-block"
          />
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
          <p className='brand-link'>{currentProduct.category.name}</p>
          <h1 className='name-product'>{currentProduct.name}</h1>
          <div className='rate-product'>
            <Rate disabled defaultValue={5} />
            <Space size={'middle'}><span>{`(${5})`}</span></Space>
            <Tag color="green">{`${currentProduct.quantityInStock} IN STOCK`}</Tag>
          </div>
          <h1 className='price-product'>${currentProduct.price}</h1>
          <div className='thong-tin'>
            <ul>
              <li>RAM: 16GB</li>
              <li>Hard Drive: 1TB</li>
              <li>Screen Size: 6.9 inches 120 Hz</li>
              <li>Battery capacity:4.676 mAh</li>
            </ul>
          </div>
          <div className='gift'>
            <ul>
              <li>Estimated delivery time 14-30 days</li>
              <li>24 months warranty at Genuine Warranty Center</li>
            </ul>
          </div>
          <div className='so-luong'>
            <p>Quantity:</p>
            <Button.Group className='btn-quantity'>
              <Button icon={<MinusOutlined />} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
              <Button>{quantity}</Button>
              <Button icon={<PlusOutlined />} onClick={() => setQuantity(quantity + 1)} />
            </Button.Group>
          </div>
          <Button className='button-add-cart' onClick={() => handleAddToCart(currentProduct, quantity)}>Add to cart</Button>
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
      <div>
        <Tabs defaultActiveKey="1" size='large'>
          <Tabs.TabPane tab="Mô tả sản phẩm" key="1">
            <Container className='product-description'>
              <h2 className="text-center pb-5 pt-5">{currentProduct.name} có gì mới ?</h2>
              <Row>
                <Col md={12} lg={6}>
                  <h4>Vẻ đẹp sang trọng của khung vỏ Titan</h4>
                  <p>Gây ấn tượng bởi kiểu dáng thanh lịch, iPhone 16 Pro Max có cấu trúc khung vỏ được chế tác kỳ công từ chất liệu Titan Cấp 5
                    siêu bền và siêu nhẹ. Ngoài ra, Apple cũng cải tiến cấu trúc tản nhiệt bên trong thân máy để duy trì hiệu suất tốt hơn
                    20% so với thế hệ cũ, đem đến cho người dùng một thiết bị vừa sang trọng, vừa mạnh mẽ.
                  </p>
                  <p>Ngoài khả năng chống nước và chống bụi đáng kinh ngạc, iPhone 16 Pro Max còn đạt đến chuẩn mực mới về
                    độ bền khi sử dụng chất liệu Ceramic Shield bảo vệ cực tốt cho màn hình.
                    Sản phẩm lên kệ với các tùy chọn màu sang trọng gồm: Titan Đen, Titan Trắng, Titan Tự Nhiên và Titan Sa Mạc.</p>
                </Col>
                {
                  productImages && productImages[0] && (
                    <Col md={12} lg={6} className="img-fluid">
                      <img src={productImages[0]} alt='img1' className="img-fluid" />
                    </Col>)
                }
                {
                  productImages && productImages[1] && (
                    <Col md={12} lg={6} className="img-fluid">
                      <img src={productImages[1]} alt='img1' className="img-fluid" />
                    </Col>)
                }
                <Col md={12} lg={6} >
                  <h4>Nhiếp ảnh linh hoạt với nút Điều Khiển Camera</h4>
                  <p>Nút Điều Khiển Camera ở cạnh phải iPhone 16 Pro Max là tính năng hoàn toàn mới,
                    cho phép chúng ta dễ dàng kích hoạt tác vụ chụp ảnh hoặc quay phim.
                    Bạn chỉ cần vuốt nhẹ ngón tay trên nút bấm này là có thể tinh chỉnh các chức năng nhiếp ảnh như:
                    phơi sáng, độ sâu trường ảnh, chuyển đổi giữa các ống kính hoặc thu phóng kỹ thuật số...
                  </p>
                  <p>Đây là yếu tố thể hiện sự tinh tế của Apple trong việc nâng cao trải nghiệm quay chụp.
                    Mặt ngoài của Nút Điều Khiển Camera được hoàn thiện bằng tinh thể sapphire, cho trải
                    nghiệm vuốt chạm mịn màng. Cảm biến bên trong nút bấm sẽ nhận diện lực nhấn mạnh/nhẹ
                    từ ngón tay nhằm mô phỏng cơ chế phản hồi, tạo cảm giác như đang chụp ảnh bằng camera DSLR.
                  </p>
                </Col>
                <Col md={12} lg={6}>
                  <h4>Thể hiện đẳng cấp quay video chuyên nghiệp</h4>
                  <p>Cầm iPhone 16 Pro Max trên tay, trải nghiệm quay phim của bạn sẽ được đưa lên tầm cao mới.
                    Sự kết hợp linh hoạt giữa camera Fusion 48MP, chip A18 Pro cùng cảm biến quad-pixel tạo
                    điều kiện để người dùng quay video chất lượng 4K Dolby Vision ở tốc độ 120 fps.
                  </p>
                  <p>Hệ thống bốn micro chuẩn studio sẽ lọc tạp âm hiệu quả để đạt chất lượng thu âm tốt nhất cho video của bạn. Đặc biệt,
                    iPhone 16 Pro Max còn cung cấp thêm chức năng quay video với Âm Thanh Không Gian,
                    khiến cho thanh âm được diễn đạt đã tai hơn khi bạn thưởng thức bằng tai nghe AirPods.
                  </p>
                </Col>
                {
                  productImages && productImages[2] && (
                    <Col md={12} lg={6} className="img-fluid">
                      <img src={productImages[2]} alt='img1' className="img-fluid" />
                    </Col>)
                }
                {
                  productImages && productImages[3] && (
                    <Col md={12} lg={6} className="img-fluid">
                      <img src={productImages[3]} alt='img1' className="img-fluid" />
                    </Col>)
                }
                <Col md={12} lg={6}>
                  <h4>Nhiếp ảnh đỉnh cao với camera Ultra Wide 48MP</h4>
                  <p>Ngoài camera Fusion 48MP, iPhone 16 Pro Max giờ đây có thêm camera Ultra Wide 48MP với cảm biến quad-pixel
                    thế hệ mới, cho phép chủ nhân chiếc điện thoại thỏa sức chụp ảnh HEIF hoặc thực hiện các khuôn hình ProRAW với chất lượng siêu cao.
                  </p>
                  <p>Ngoài ra, camera Telephoto 5x cũng hỗ trợ chụp ảnh với tiêu cự 120mm, hỗ trợ chụp ảnh rõ nét từ khoảng cách xa hơn. Bạn sẽ có nhiều mức khung
                    hình khác nhau để thỏa sức sáng tạo với niềm đam mê nhiếp ảnh của mình, bao gồm từ Macro, 13 mm, 24 mm, 28 mm, 35 mm, 48 mm và 120 mm.
                  </p>
                </Col>
              </Row>
            </Container>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đánh giá sản phẩm" key="2">
            <Container className='product-reviews'>
              <div className='rate'>
                <h4>Đánh giá của khách hàng</h4>
                <div className='rate-product'>
                  <Rate disabled defaultValue={5} />
                  <Space size={'middle'}><span>{`(1)`}</span></Space>
                </div>
              </div>
              <Row className='customer-reviews'>
                <Col md={24} lg={4} className='customer-avatar'>
                  <img src={avatar} alt='avatar' />
                </Col>
                <Col md={24} lg={20} className='content-review'>
                  <div>
                    <p>Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat sed diam voluptua at vero eos et accusam et justo duo dolores et ea rebum stet clita kasd gubergren no sea takimata sanctus est lorem ipsum dolor sit amet.</p>
                    <div className='info-review'>
                      <span className='name-customer'>Ivan.</span>
                      <span className='review-date'> Ngày 4 tháng 3 năm 2024. </span>
                      <Rate disabled defaultValue={5} />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className='rate'>
                <h4>Thêm đánh giá</h4>
                <p className='rate-product'>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *</p>
              </div>
              <div className='review-form'>
                <Form form={form}>
                  <Form.Item name='name'>
                    <Input placeholder='Tên*' />
                  </Form.Item>
                  <Form.Item name='email'>
                    <Input placeholder='Địa chỉ email*' />
                  </Form.Item>
                  <Form.Item name='content'>
                    <Input.TextArea rows={4} placeholder='Nội dung đánh giá*' />
                  </Form.Item>
                  <Form.Item name='rating' label='Đánh giá của bạn:'>
                    <Rate defaultValue={5} />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>Gửi đánh giá</Button>
                  </Form.Item>
                </Form>
              </div>
            </Container>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}