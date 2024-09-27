import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from './authSlice';
import { useEffect } from 'react';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa các cookie cụ thể
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');

    // Xóa tất cả các cookie khác (nếu cần)
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });

    // Dispatch action logout để cập nhật state trong Redux
    dispatch(logout());

    // Xóa dữ liệu từ localStorage (nếu có)
    localStorage.removeItem('user');
    localStorage.removeItem('carts'); // Nếu bạn lưu giỏ hàng trong localStorage

    // Chuyển hướng người dùng về trang đăng nhập
    navigate('/login');
  };

  return handleLogout;
};

const Logout = () => {
  const handleLogout = useLogout();
  useEffect(() => {
    handleLogout();
  }, []);
  return null;
};

export default Logout;