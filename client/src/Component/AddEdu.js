import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddEducation } from '../Actions/Profile'
const AddEdu = ({ AddEducation, history }) => {
    const [formdata, setFormdata] = useState({
        school: '',
        degree: '',
        from: '',
        to: '',
        fieldofstudy: '',
        description: ''
    })
    const { school, degree, from, to, fieldofstudy, description } = formdata
    const onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newExp = { school, degree, from, to, fieldofstudy, description }
        AddEducation(newExp, history)
    }
    return (
        <div>
            <div class="container">
                <h1 className="Profile_header">Add Education</h1>
                <h4 className="Profile_header">Let's get some information to make your profile standout</h4>
                <p className="Profile_para">(*) required field</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" class="dash_input" placeholder="School Name" name="school" value={school} onChange={onchange} /><br />
                    <input type="text" class="dash_input" placeholder="Degree" name="degree" value={degree} onChange={onchange} /><br />
                    <label class="labo">Form Date</label>
                    <input type="date" class="dash_input" name="from" value={from} onChange={onchange} /><br /><br />
                    <label class="labo">To Date</label>
                    <input type="date" class="dash_input" name="to" value={to} onChange={onchange} /><br />
                    <input type="text" class="dash_input" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onchange} /><br />
                    <textarea class="dash_input" placeholder="Add Description" name="description" value={description} onChange={onchange} ></textarea><br /><br />
                    <button className="Profile_btn" type="submit">Submit</button>
                    <Link to="/dashboard" className="Profile_btn">Go back</Link>
                </form><br /><br />
            </div>
        </div>
    )
}

export default connect(null, { AddEducation })(withRouter(AddEdu))
