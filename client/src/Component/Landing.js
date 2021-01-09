import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import LandingImg from '../LandingImg-removebg-preview.png'
const Landing = (props) => {
    if (props.isAuthenticated) {
        <Redirect to="/dashboard" />
    }
    else {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 devcontainer">
                            <h1 className="devheading">Developer's Hub</h1><br />
                            <p className="dev-para">A Platform to create developer profile/portfolio where we can share posts and connect with other developer's.</p><br />
                            <Link to="/register">
                                <button className="sign-btn">SignUp</button>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <img src={LandingImg} className="devImg" alt="Not found" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <Redirect to="/dashboard" />
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated
})
export default connect(mapstate)(Landing)
