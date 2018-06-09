import React from 'react';

import { URL_API } from '../share/UrlAPI';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.onRegister = this.onRegister.bind(this);
    }

    onRegister(event) {
        let username = this.username.value;
        let email = this.email.value;
        let password = this.password.value;
        let passwordConfirm = this.passwordConfirm.value;

        let data = {
            username, email, password
        };

        if (password === passwordConfirm) {
            fetch(URL_API.UserRegister, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    localStorage.setItem('x-auth', data.accessToken);
                    window.location.href = "/";
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <div className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-32">
                                Đăng ký
                            </span>

                            <span className="txt1 p-b-11">
                                Username
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
                                <input className="input100" type="text" name="username" ref={username => this.username = username} />
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Email
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
                                <input className="input100" type="text" name="username" ref={email => this.email = email} />
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Mật khẩu
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
                                <span className="btn-show-pass">
                                    <i className="fa fa-eye"></i>
                                </span>
                                <input className="input100" type="password" name="pass" ref={password => this.password = password} />
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Xác nhận mật khẩu
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
                                <span className="btn-show-pass">
                                    <i className="fa fa-eye"></i>
                                </span>
                                <input className="input100" type="password" name="pass" ref={passwordConfirm => this.passwordConfirm = passwordConfirm} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="flex-sb-m w-full p-b-48">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100">
                                        Remember me
                                </label>
                                </div>

                                <div>
                                    <a href="#" className="txt3">
                                        Forgot Password?
                                </a>
                                </div>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.onRegister} >
                                    Đăng ký
                                </button>
                                <button className="login100-form-btn" onClick={this.props.openLogin} >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;