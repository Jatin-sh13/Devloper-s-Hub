import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddExperience } from '../Actions/Profile'
const AddExp = ({ AddExperience, history }) => {
    const [toDateDisable, toggleDisable] = useState(false)
    const [formdata, setFormdata] = useState({
        title: '',
        current: '',
        company: '',
        from: '',
        to: '',
        location: '',
        description: ''
    })
    const { title, company, from, to, location, description, current } = formdata
    const onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newExp = { title, company, from, to, location, description }
        AddExperience(newExp, history)
    }
    return (
        <div>
            <div class="container">
                <h1 className="Profile_header">Add Experience</h1>
                <h4 className="Profile_header">Let's get some information to make your profile standout</h4>
                <p className="Profile_para">(*) required field</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" class="dash_input" placeholder="Job Title" name="title" value={title} onChange={onchange} /><br />
                    <input type="text" class="dash_input" placeholder="Company" name="company" value={company} onChange={onchange} /><br />
                    <label class="labo">Form Date</label>
                    <input type="date" class="dash_input" name="from" value={from} onChange={onchange} /><br /><br />
                    <input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormdata({ ...formdata, current: !current });
                        toggleDisable(!toDateDisable);
                    }} /><span style={{ marginLeft: '5px', color: 'grey' }}>current job</span><br />
                    <label class="labo">To Date</label>
                    <input type="date" class="dash_input" name="to" value={to} onChange={onchange} disabled={toDateDisable ? 'disabled' : ''} /><br />
                    <input type="text" class="dash_input" placeholder="Location" name="location" value={location} onChange={onchange} /><br />
                    <textarea class="dash_input" placeholder="Add Description" name="description" value={description} onChange={onchange} ></textarea><br /><br />
                    <button className="Profile_btn" type="submit">Submit</button>
                    <Link to="/dashboard" className="Profile_btn">Go back</Link>
                </form><br /><br />
            </div>
        </div>
    )
}

export default connect(null, { AddExperience })(withRouter(AddExp))
