import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {API_URL} from "../index";

class Signup extends Component {
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
            errorMessage: '',
            showModal: false
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

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({full_name, username, email, password})
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            this.setState({showModal: true, errorMessage: ''});
        } else if (response.status === 409) {
            this.setState({errorMessage: data.detail});
            console.log(data);
        } else {
            console.error(data);
        }
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
        this.props.navigate('/login');
    }

    render() {
        return (
            <>
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
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Example pattern: at least one number, one lowercase and one uppercase letter, and at least 8 characters
                            title="Must contain at least one number, one lowercase and one uppercase letter, and at least 8 or more characters"
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
                            <span style={{color: 'red'}}>{this.state.errorMessage}</span>
                        </div>
                    )}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/login">Sign in</a>
                    </p>
                </form>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default function SignupWithNavigate(props) {
    const navigate = useNavigate();
    return <Signup {...props} navigate={navigate}/>;
}