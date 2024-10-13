import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../index";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            errorMessage: ''
        };
    }

    async componentDidMount() {
        const token = localStorage.getItem('access_token'); // Assuming the token is stored in localStorage
        if (!token) {
            this.setState({ errorMessage: '401 - Unauthorized' });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({ user: data });
            } else {
                const errorData = await response.json();
                this.setState({ errorMessage: errorData.detail });
            }
        } catch (error) {
            this.setState({ errorMessage: 'An error occurred while fetching user data' });
        }
    }

    handleSignOut = () => {
        localStorage.removeItem('access_token');
        this.props.navigate('/login');
    }

    render() {
        const { user, errorMessage } = this.state;

        return (
            <div className="app-format">
                {errorMessage && <h3>{errorMessage}</h3>}
                {user ? (
                    <>
                        <h1>Welcome {user.full_name}!</h1>
                        <button onClick={this.handleSignOut} className="btn btn-primary">Sign out</button>
                    </>
                ) : (
                    <p>Sign in to access this webpage</p>
                )}
            </div>
        );
    }
}

export default function UserWithNavigate(props) {
    const navigate = useNavigate();
    return <User {...props} navigate={navigate} />;
}