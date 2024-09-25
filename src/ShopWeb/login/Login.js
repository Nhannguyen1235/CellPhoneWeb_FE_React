import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
export default function Login() {
  const BaseUrl = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(`${BaseUrl}/login/test`, { username, password })
      .then((response) => {
        console.log(response);
        // Sử dụng đúng đường dẫn đến token
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        const user = response.data.data.userEntity;

        // Lưu accessToken và refreshToken vào cookie
        document.cookie = `accessToken=${accessToken}; path=/; SameSite=Strict; Secure`;
        document.cookie = `user=${JSON.stringify(user)}; path=/; SameSite=Strict; Secure`;
        if(response.data.data.refreshToken){
          document.cookie = `refreshToken=${refreshToken}; path=/; SameSite=Strict`;
        }else{
          setError('refreshToken không tồn tại. Vui lòng thử lại.');
        }
        
        // console.log(accessToken);
        // console.log(refreshToken);
        if(response.status === 200){
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập:', error);
        setError('Đăng nhập không thành công. Vui lòng thử lại.');
      });
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    axios.post(`${BaseUrl}/user/register`, { username, password, email, role })
      .then((response) => {
        console.log(response);
        // Chuyển hướng người dùng hoặc cập nhật trạng thái đăng nhập
        // Ví dụ: history.push('/dashboard');
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        setError('Đăng ký không thành công. Vui lòng thử lại.');
      });
  };

  return (
    <div className="login-page d-flex flex-column">
      <div className={`container ${isSignIn ? "" : "right-panel-active"}`}>
        <div className={`form-container ${isSignIn ? "sign-in-container" : "sign-up-container"}`}>
          {isSignIn ? (
            <form onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="User Name" value={username} onChange={(event) => setUsername(event.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setIsSignIn(true)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsSignIn(false)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}