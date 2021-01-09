import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { connect } from 'react-redux'
import { LoginUser } from '../Actions/Auth'
import { Redirect } from 'react-router-dom'
const Login = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        props.LoginUser(user)
    }
    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    //redirect if it is authenticated
    else {
        return (
            <div>
                <div className="container">
                    <div className="SignUp-Container1">
                        <form onSubmit={handleSubmit}>
                            <div className="SignUp-Container2">
                                <h2 className="SignUp-Heading">Here you can Log In</h2>
                                <p className="SignUp-para">Enter in your account</p>
                                <label for="email" class="Global-label">Email</label>
                                <input type="email" placeholder="Enter EmailId" className="Global-Input" name="email" required value={email} onChange={onchange} />
                                <label for="password" class="Global-label">Password</label>
                                <input type="password" placeholder="Enter Password" className="Global-Input" name="password" required value={password} onChange={onchange} minLength="6" />
                                <button className="SignUp-btn" type="submit">Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
})
export default connect(mapstate, { LoginUser })(Login)
