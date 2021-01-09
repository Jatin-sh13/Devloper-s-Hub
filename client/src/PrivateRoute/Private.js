import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
const Private = ({ component: Component, isAuthenticated, loading, ...rest }) => {
    return (
        <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/dashboard" />) : (<Component {...rest} />)} />
    )
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    loading: state.Auth.loading
})
export default connect(mapstate)(Private)
