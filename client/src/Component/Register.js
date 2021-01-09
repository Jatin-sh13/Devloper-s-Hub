import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { connect } from 'react-redux'
import { setAlert } from '../Actions/Alert'
import { Registeration } from '../Actions/Auth'
import { Redirect } from 'react-router-dom'
const Register = (props) => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formdata
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            return props.setAlert('Password Not Matched !', 'danger')
        }
        else {
            const newUser = {
                name,
                email,
                password
            }
            props.Registeration(newUser)
        }
    }
    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <div>
            <div className="container">
                <div className="SignUp-Container1">
                    <form onSubmit={handleSubmit}>
                        <div className="SignUp-Container2">
                            <h2 className="SignUp-Heading">Here you can Sign Up</h2>
                            <p className="SignUp-para">Create your account</p>
                            <label for="name" className="Global-label">Name</label>
                            <input type="text" placeholder="Enter Name" name="name" className="Global-Input" required value={name} onChange={Onchange} />
                            <label for="email" className="Global-label">Email</label>
                            <input type="email" placeholder="Enter EmailId" name="email" className="Global-Input" required value={email} onChange={Onchange} />
                            <label for="password" className="Global-label">Password</label>
                            <input type="password" placeholder="Enter Password" name="password" className="Global-Input" required value={password} onChange={Onchange} minLength="6" />
                            <label for="confirm-pass" className="Global-label">Confirm Passwod</label>
                            <input type="text" placeholder="Enter Confirm Password" name="password2" className="Global-Input" required value={password2} onChange={Onchange} minLength="6" />
                            <button className="SignUp-btn" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapstate, { setAlert, Registeration })(Register)
//whenever we have to call an action and connecting
// a state we have to connect componet to redux
