import React, { Component } from "react";

export default class User extends Component {
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
            const response = await fetch('http://localhost:8000/users/me', {
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

    render() {
        const { user, errorMessage } = this.state;

        return (
            <div className="app-format">
                {errorMessage && <h3>{errorMessage}</h3>}
                {user ? (
                    <h1>Welcome {user.full_name}!</h1>
                ) : (
                    <p>Sign in to access this webpage</p>
                )}
            </div>
        );
    }
}