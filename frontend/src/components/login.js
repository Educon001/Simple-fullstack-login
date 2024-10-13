import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../index";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            usernameError: false,
            passwordError: false
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, [`${name}Error`]: false });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.setState({ usernameError: username === '', passwordError: password === '' });

        if (username === '' || password === '') {
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            localStorage.setItem('access_token', data.access_token);
            this.setState({ errorMessage: '' });
            this.props.navigate('/user');
        } else if (response.status === 401) {
            this.setState({ errorMessage: data.detail });
            console.log(data);
        } else {
            console.error(data);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Log in</h3>

                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className={`form-control ${this.state.usernameError ? 'is-invalid' : ''}`}
                        placeholder="Enter username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`}
                        placeholder="Enter password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </div>
                {this.state.errorMessage && (
                    <div className="mb-3">
                        <span style={{ color: 'red' }}>{this.state.errorMessage}</span>
                    </div>
                )}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </form>
        );
    }
}

export default function LoginWithNavigate(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
}