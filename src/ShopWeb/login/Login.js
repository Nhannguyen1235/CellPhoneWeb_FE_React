import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    // Handle sign up logic here
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
                type="email"
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
              <input type="text" placeholder="User Name" />
              <input type="password" placeholder="Password" />
              <input type="email" placeholder="Email" />
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