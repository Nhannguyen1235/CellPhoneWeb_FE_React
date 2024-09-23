import { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import "./Header.css";
import { BsCart, BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import logo from "../../imgs/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { overwriteCarts } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook để điều hướng

  // Lấy giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    const storedCarts = localStorage.getItem("carts");
    if (storedCarts) {
      dispatch(overwriteCarts(JSON.parse(storedCarts)));
    }
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(true);
  const cartCount = useSelector((state) => state.carts.carts.length);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const handleSearch = () => {
    // Điều hướng đến trang tìm kiếm với từ khóa tìm kiếm
    navigate(`/products/search/${text}`);
  };

  return (
    <header className="custom-header container">
      <div>
        <Navbar
          className="navbar fixed-top sticky navbar-expand-md navbar-light"
          color="white"
        >
          <NavbarBrand href="/" className="me-auto">
            <img id="logo" src={logo} alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar className="me-auto">
              <NavItem>
                <NavLink
                  className="nav-link-custom"
                  color="black"
                  href="/myproject/#/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-custom"
                  href="/myproject/#/products"
                >
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-custom"
                  href="/myproject/#/contact"
                >
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-custom" href="/myproject/#/login">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
            <div className="nav-item-right d-flex">
              <NavItem className="me-3">
                <InputGroup>
                  <Input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tìm kiếm"
                  />
                  <Button onClick={handleSearch}>
                    <BsSearch />
                  </Button>
                </InputGroup>
              </NavItem>
              <NavItem>
                <NavLink className="cart fs-3" href="/myproject/#/cart">
                  <BsCart />
                  <div className="cartQuantity text-center">
                    <p className="number">{cartCount}</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="user fs-3" href="/myproject/#/login">
                  <CiUser />
                </NavLink>
              </NavItem>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
}
