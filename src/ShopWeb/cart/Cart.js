import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, clearCart, toggleCheckAll, toggleCheck, overwriteCarts, fetchProductImages } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { getVoucherByCode } from '../redux/voucherSlice';
import { Button, FormGroup, Input } from 'reactstrap';

export default function Cart() {
    const dispatch = useDispatch();
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

    const [voucherCode, setVoucherCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [voucherMessage, setVoucherMessage] = useState("");

    const handleSearchByCode = () => {
        if (voucherCode.trim()) {
            dispatch(getVoucherByCode(voucherCode));
            console.log(vouchers);
        }
    };

    useEffect(() => {
        if (status === 200 && vouchers && vouchers.length > 0) {
            const voucher = vouchers[0]; // Lấy voucher đầu tiên từ mảng
            console.log("Voucher:", voucher);
            const currentDate = new Date();
            const expirationDate = new Date(voucher.expirationDate);
            console.log("Ngày hết hạn:", expirationDate);
    
            // Reset discount và messages
            setDiscountAmount(0);
            setVoucherMessage("");
    
            // Kiểm tra tính hợp lệ của voucher
            if (expirationDate < currentDate) {
                setVoucherMessage("Voucher đã hết hạn sử dụng.");
            } else if (!voucher.isActive) {
                setVoucherMessage("Voucher không hợp lệ.");
            } else if (totalAmount < voucher.minOrderValue) {
                setVoucherMessage(`Đơn hàng chưa đạt giá trị tối thiểu: ${voucher.minOrderValue.toFixed(2)} USD.`);
            } else {
                setDiscountAmount(voucher.discountAmount);
                setVoucherMessage(`Áp dụng thành công! Bạn được giảm ${voucher.discountAmount.toFixed(2)} USD.`);
            }
        } else if (status !== "" && status !== 200) {
            setVoucherMessage("Voucher không tồn tại hoặc không hợp lệ.");
        }
    }, [vouchers, status, totalAmount]);

    return (
        <div className="container">
            <h2 className="text-center my-4">Shopping Cart</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-danger" onClick={handleClearCart}>
                    Clear Cart
                </button>
                <button className="btn btn-primary" onClick={handleToggleCheckAll}>
                    {checkAll ? 'Uncheck All' : 'Check All'}
                </button>
            </div>
            <div className="row">
                <div className="col-12">
                    {carts.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={product.checked}
                                                    onChange={() => handleToggleCheck(product.id)}
                                                />
                                            </td>
                                            <td>
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
                                            <td>
                                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                                            </td>
                                            <td>{product.category.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>${(product.price * product.quantity).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteFromCart(product.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center">Your cart is empty.</p>
                    )}
                </div>
            </div>
            <FormGroup className="d-flex align-items-center mb-3">
                <Input 
                    type="text" 
                    placeholder="Nhập mã voucher cần tìm..." 
                    value={voucherCode} 
                    onChange={(e) => setVoucherCode(e.target.value)} 
                />
                <Button color="primary" onClick={handleSearchByCode} className="ml-2">
                    Tìm kiếm
                </Button>
            </FormGroup>
            {voucherMessage && <p className="text-danger text-center">{voucherMessage}</p>}
            <div className="text-end mt-4">
                <h4>Total Amount: ${(totalAmount - discountAmount).toFixed(2)}</h4>
                {discountAmount > 0 && <h5 className="text-success">Discount Applied: -${discountAmount.toFixed(2)}</h5>}
                <Link to={"/checkouts"}>
                    <button className='btn btn-primary'>Check out</button>
                </Link>
            </div>
        </div>
    );
}