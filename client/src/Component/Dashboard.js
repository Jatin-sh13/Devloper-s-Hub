import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { deleteAcc, GetProfile } from '../Actions/Profile'
import DashboardActions from './DashboardActions'
import Edu from './Dashdata/Edu'
import Exp from './Dashdata/Exp'
import Loading from './Loading'
const Dashboard = (props) => {
    useEffect(() => {
        props.GetProfile()
    }, []);
    if (props.isAuthenticated) {
        return props.loading && props.profile === null ? (<Loading />) :
            (<Fragment>
                <div className="container">
                    <h1 className="Dash_header">Dashboard</h1>
                    <p className="dash_para">Welcome {props.user && props.user.name}</p><br />
                    {props.profile === null ? (
                        <Fragment>
                            <p className="dash_para">You have not setup a profile please add some info.</p>
                            <br></br>
                            <Link to="/createprofile" className="dash_btn">Create Profile</Link>
                        </Fragment>
                    ) :
                        (<Fragment>
                            <DashboardActions /><br /><br />
                            <Exp experience={props.profile.experience} /><br />
                            <Edu education={props.profile.education} /><br /><br />
                            <button className='btn btn-danger' onClick={()=>props.deleteAcc()}>Delete Account</button>
                        </Fragment>)}
                </div>
            </Fragment>)
    }
    return <Redirect to="/" />
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    profile: state.Profile.profile,
    loading: state.Profile.loading,
    user: state.Auth.user

})
export default connect(mapstate, { GetProfile,deleteAcc })(Dashboard)