import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import NotFound from "./components/notfound";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Login/>
                        </div>
                    </div>
                }/>
                <Route path="/signup" element={
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Signup/>
                        </div>
                    </div>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
