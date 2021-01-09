import React from 'react'
import { Link } from 'react-router-dom'
const DashboardActions = () => {
    return (
        <div>
            <Link to="/editprofile" className="dash_btn2">Edit Profile</Link>
            <Link to="/AddEdu" className="dash_btn2" >Add Education</Link>
            <Link to="/AddExp" className="dash_btn2">Add Experience</Link>
        </div>
    )
}

export default DashboardActions
