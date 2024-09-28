import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

export default function LoginForm() {
    const BaseUrl = "http://localhost:8080";
    const [isActive, setIsActive] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loginError, setLoginError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError(null);
        axios.post(`${BaseUrl}/login/test`, { username, password })
            .then((response) => {
                console.log(response);
                const accessToken = response.data.data.accessToken;
                const refreshToken = response.data.data.refreshToken;
                const user = response.data.data.userEntity;

                document.cookie = `accessToken=${accessToken}; path=/; SameSite=Strict; Secure`;
                document.cookie = `user=${JSON.stringify(user)}; path=/; SameSite=Strict; Secure`;
                if(response.data.data.refreshToken){
                    document.cookie = `refreshToken=${refreshToken}; path=/; SameSite=Strict`;
                } else {
                    setLoginError('refreshToken không tồn tại. Vui lòng thử lại.');
                }

                if(response.status === 200){
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                console.error('Lỗi đăng nhập:', error);
                setLoginError('Đăng nhập không thành công. Vui lòng thử lại.');
            });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        setSignUpError(null);
        axios.post(`${BaseUrl}/user/register`, { username, password, email, role: "ROLE_USER" })
            .then((response) => {
                console.log(response);
                setIsActive(false); // Chuyển về form đăng nhập sau khi đăng ký thành công
                setLoginError('Đăng ký thành công. Vui lòng đăng nhập.');
            })
            .catch((error) => {
                console.error('Lỗi đăng ký:', error);
                setSignUpError('Đăng ký không thành công. Vui lòng thử lại.');
            });
    };

    return (
        <div className='loginform'>
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <span>Use your email for registration</span>
                        <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Sign Up</button>
                        {signUpError && <p className="error-message">{signUpError}</p>}
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>
                        <span>Use your email and password</span>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                        {loginError && <p className="error-message">{loginError}</p>}
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}