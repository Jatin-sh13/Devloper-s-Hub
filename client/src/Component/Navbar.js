import React, { Fragment } from 'react'
import '../App.css'
import Logo from '../logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Logout } from '../Actions/Auth'
const Navbar = (props) => {
    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark fixed">
                    <div class="container">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} class="devlogo" alt="Not Found" />
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                {props.isAuthenticated ? (
                                    <Fragment>
                                    <li class="nav-item active">
                                        <a href="/dashboard" className="nav-link">Dashboard</a>
                                    </li>
                                    <li class="nav-item active">
                                        <a href="/developers"  className="nav-link">Developers</a>
                                    </li>
                                    <li class="nav-item active">
                                        <a href="/" onClick={props.Logout} className="nav-link">LogOut</a>
                                    </li>
                                    </Fragment>
                                ) : (
                                        <Fragment><li class="nav-item active">
                                            <Link to="#" className="nav-link">
                                                Developer
                                    </Link>
                                        </li>
                                            <li class="nav-item active">
                                                <Link to="/register" className="nav-link">
                                                    Register
                                    </Link>
                                            </li>
                                            <li class="nav-item active">
                                                <Link to="/LogIn" className="nav-link">
                                                    LogIn
                                    </Link>
                                            </li>
                                            <li class="nav-item active">
                                                <Link to="/About" className="nav-link">
                                                    About Us
                                    </Link>
                                            </li>
                                        </Fragment>
                                    )}
                            </ul>
                        </div>
                    </div>
                </nav><br />
            </div>
        </div>
    )
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    loading: state.Auth.loading
})
export default connect(mapstate, { Logout })(Navbar)
