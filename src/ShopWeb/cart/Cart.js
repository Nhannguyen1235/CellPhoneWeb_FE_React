import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { deleteCart, clearCart, toggleCheckAll, toggleCheck, fetchProductImages, changeQuantity } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { Space, Button, Input, Alert} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getVoucherByCode, resetVoucher } from '../redux/voucherSlice';
import { Col, Container, Row, Table } from 'reactstrap';
import imgCart from '../../imgs/cart-empty.png';
import './Cart.css';


export default function Cart() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { carts, checkAll, productImages } = useSelector((state) => state.cart);
    const { vouchers, status, message } = useSelector((state) => state.voucher);

    useEffect(() => {
        carts.forEach(product => {
            if (!productImages[product.id]) {
                dispatch(fetchProductImages(product.id));
            }
        });
    }, [carts, dispatch, productImages]);

    const handleDeleteFromCart = (productId) => {
        dispatch(deleteCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleToggleCheckAll = () => {
        dispatch(toggleCheckAll(!checkAll));
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleCheck(productId));
    };

    const totalAmount = carts.reduce((total, product) => {
        if (product.checked) {
            return total + product.price * product.quantity;
        }
        return total;
    }, 0);

    const totalMoney = carts.reduce((total, product) => {
        if (product.checked) {
            return total + product.price * product.quantity;
        }
        return total;
    }, 0);

    const [voucherCode, setVoucherCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [voucherMessage, setVoucherMessage] = useState("");

    const handleSearchByCode = () => {
        if (voucherCode.trim()) {
            dispatch(getVoucherByCode(voucherCode));
        }
    };

    useEffect(() => {
        setVoucherCode("");
        setDiscountAmount(0);
        setVoucherMessage("");
        dispatch(resetVoucher());
    }, [location, dispatch]);
    
    useEffect(() => {
        if (status === 200) {
            const voucher = vouchers[0];
            const currentDate = new Date();
            const expirationDate = new Date(voucher.expirationDate);
    
            setDiscountAmount(0);
            setVoucherMessage("");
    
            if (expirationDate < currentDate) {
                setVoucherMessage("Voucher đã hết hạn sử dụng.");
                setDiscountAmount(0);
            } else if (!voucher.isActive) {
                setVoucherMessage("Voucher không hợp lệ.");
                setDiscountAmount(0);
            } else if (totalAmount < voucher.minOrderValue) {
                setVoucherMessage(`Đơn hàng chưa đạt giá trị tối thiểu: ${voucher.minOrderValue} USD.`);
                setDiscountAmount(0);
            } else {
                setDiscountAmount(voucher.discountAmount);
                setVoucherMessage('Áp dụng thành công!');
            }
        } else if (status === 404) {
            setVoucherMessage(message);
            setDiscountAmount(0);
        } else if (status !== "" && status !== 200) {
            setVoucherMessage(vouchers.data);
            setDiscountAmount(0);
        } else {
            setVoucherCode("");
            setDiscountAmount(0);
            setVoucherMessage("");
        }
    }, [vouchers, status, totalAmount]);
    

    return (
        <Container>
            {
                carts.length === 0 && (
                    <div className='cart-empty'>
                        <img src={imgCart} alt='Cart empty' />
                        <p>Giỏ hàng của bạn đang trống</p>
                        <Link to="/product"><Button type='primary' size='large'>Quay lại mua sắm</Button></Link>
                    </div>
                )
            }
            {
                carts.length > 0 && (
                    <div>
                        <Row className="row">
                            <Col lg={8} md={12}>
                                <div className="d-flex justify-content-between mb-3">
                                    <button className="btn btn-danger" onClick={handleClearCart}>
                                        Clear Cart
                                    </button>
                                    <button className="btn btn-primary" onClick={handleToggleCheckAll}>
                                        {checkAll ? 'Uncheck All' : 'Check All'}
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table table-striped table-hover">
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col">Select</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carts.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className='table-cart'>
                                                            <input
                                                                type="checkbox"
                                                                checked={product.checked}
                                                                onChange={() => handleToggleCheck(product.id)}
                                                            />
                                                        </td>
                                                        <td className='table-cart'>
                                                            {productImages[product.id] && productImages[product.id].length > 0 ? (
                                                                <img
                                                                    src={productImages[product.id][0]}
                                                                    alt={product.name}
                                                                    className="img-thumbnail"
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="img-thumbnail"
                                                                    style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0' }}
                                                                ></div>
                                                            )}
                                                        </td>
                                                        <td className='table-cart '>
                                                            <Link className='product-name' to={`/product/${product.id}`}>{product.name}</Link>
                                                        </td>
                                                        <td className='table-cart'>${product.price}</td>
                                                        <td className='table-cart'><Button.Group className='btn-quantity'>
                                                                <Button icon={<MinusOutlined />} onClick={() => dispatch(changeQuantity({ id: product.id, changeQ: -1 }))} />
                                                                <Button>{product.quantity}</Button>
                                                                <Button icon={<PlusOutlined />} onClick={() => dispatch(changeQuantity({ id: product.id, changeQ: 1 }))} />
                                                            </Button.Group></td>
                                                        <td className='table-cart'>${(product.price * product.quantity).toFixed(2)}</td>
                                                        <td className='table-cart'>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFromCart(product.id)}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col lg={4} md={12}  className=" col-thanh-toan" >
                                <div className='p-3 btn-cart-totals'>
                                    <h2>Cart totals</h2>
                                    <hr />
                                    <div className='display-money'>
                                        <h6>Tổng cộng:</h6>
                                        <p className='tien-sanpham1'>${totalMoney}</p>
                                    </div>
                                    <hr />
                                    <h6>Mã giảm giá:</h6>
                                    <Space.Compact style={{width: '100%'}}>
                                        <Input placeholder="Nhập mã giảm giá" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)}/>
                                        <Button type="primary" onClick={handleSearchByCode}>Áp dụng</Button>
                                    </Space.Compact>
                                    {
                                        status !== 200 && voucherMessage && <Alert message={voucherMessage} type="error" showIcon />
                                    }
                                    {
                                        status === 200 && voucherMessage && <Alert message={voucherMessage} type="success" showIcon />
                                    }
                                    <hr/>
                                    <h6>Chi tiết thanh toán:</h6>
                                    <div className='thanh-toan'>
                                        <div className='display-money'>
                                            <p>Tổng tiền hàng:</p>
                                            <p>${totalMoney}</p>
                                        </div>
                                        <div className='display-money'>
                                            <p>Mã giảm giá:</p>
                                            <p>- <span>${discountAmount}</span></p>
                                        </div>
                                        <div className='display-money'>
                                            <p>Phí vận chuyển:</p>
                                            <p><span>Miễn phí</span></p>
                                        </div>
                                    </div>
                                    <div className='display-money'>
                                        <h6>Tổng thanh toán:</h6>
                                        <p className='final-total'>${totalMoney - discountAmount}</p>
                                    </div>
                                    <Link to="/checkouts"><Button className='btn-thanh-toan' type="primary">Tiến hành thanh toán</Button></Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </Container>
    );
}