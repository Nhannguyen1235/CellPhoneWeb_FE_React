import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.cart.carts); // Fix: state.carts.carts -> state.cart.carts
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            to_name: email,
            from_name: 'Your Store',
            message: `Order Details:\n\n${carts.map(product => 
                `Product: ${product.name}\nPrice: $${product.price}\nQuantity: ${product.quantity}\nTotal: $${(product.price * product.quantity).toFixed(2)}\n\n`
            ).join('')}`,
            address: address,
            phone: phone
        };

        emailjs.send('service_cfrivnw', 'template_9mozwui', templateParams, '03TGyG4-RZ6xKjMKy')
            .then((response) => {
                console.log('Email sent successfully!', response);
                // Xoá giỏ hàng sau khi gửi email
                dispatch(clearCart());
                Swal.fire({
                    title: "Great!",
                    text: "Check Out successfully!",
                    icon: "success"
                  }); // Hiển thị thông báo thành công
            }, (error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Place Order</button>
            </form>
            <div className="mt-4">
                <Link to="/cart">
                    <button className="btn btn-secondary">Back to Cart</button>
                </Link>
            </div>
        </div>
    );
};

export default CheckoutPage;