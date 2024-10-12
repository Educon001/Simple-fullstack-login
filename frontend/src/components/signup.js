import React, {Component} from "react";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            full_nameError: false,
            usernameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            errorMessage: ''
        };
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value, [`${name}Error`]: false});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const {full_name, username, email, password} = this.state;

        this.setState({
            full_nameError: full_name === '',
            usernameError: username === '',
            emailError: email === '',
            passwordError: password === '',
            confirmPasswordError: this.state.confirmPassword === ''
        });

        if (full_name === '' || username === '' || email === '' || password === '') {
            return;
        }

        const response = await fetch(`http://localhost:8000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({full_name, username, email, password})
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            this.setState({errorMessage: ''});
        } else if (response.status === 409) {
            this.setState({errorMessage: data.detail});
            console.log(data);
        } else {
            console.error(data);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>Full name</label>
                    <input
                        type="text"
                        className={`form-control ${this.state.full_nameError ? 'is-invalid' : ''}`}
                        placeholder="Enter full name"
                        name="full_name"
                        value={this.state.fullName}
                        onChange={this.handleInputChange}
                    />
                </div>
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
                    <label>Email address</label>
                    <input
                        type="email"
                        className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`}
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
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
                <div className="mb-3">
                    <label>Confirm password</label>
                    <input
                        type="password"
                        className={`form-control ${this.state.confirmPasswordError ? 'is-invalid' : ''}`}
                        placeholder="Re-enter password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChange}
                    />
                </div>
                {this.state.errorMessage && (
                    <div className="mb-3">
                        <span style={{ color: 'red' }}>{this.state.errorMessage}</span>
                    </div>
                )}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
                <p className="forgot-password text-right">
                    Already registered? <a href="/login">Sign in</a>
                </p>
            </form>
        );
    }
}