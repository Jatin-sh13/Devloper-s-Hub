import React, { useState, useEffect } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProfile, GetProfile } from '../Actions/Profile'
const EditProfile = ({ createProfile, history, GetProfile, loading, profile, edit }) => {
    const [formdata, setFormdata] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })
    const { company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = formdata
    const onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        GetProfile()
        setFormdata({
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: profile.skills.join(','),
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.social.twitter,
            facebook: profile.social.facebook,
            linkedin: profile.social.linkedin,
            youtube: profile.social.youtube,
            instagram: profile.social.instagram,
        })
    }, [loading])
    const newprofile = {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createProfile(newprofile, history, true)
        return <Redirect to="/dashboard" />
    }
    return (
        <div>
            <div className="container">
                <h1 className="Profile_header">Create Profile</h1>
                <h4 className="Profile_header">Let's get some information to make your profile standout</h4>
                <p className="Profile_para">(*) required field</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="dash_input" placeholder="Company" name="company" value={company} onChange={onchange} /><br />
                    <input type="text" className="dash_input" placeholder="status(ex:Web developer)" name="status" value={status} onChange={onchange} />
                    <input type="text" className="dash_input" placeholder="Website" name="website" value={website} onChange={onchange} /><br />
                    <input type="text" className="dash_input" placeholder="Location" name="location" value={location} onChange={onchange} /><br />
                    <input type="text" className="dash_input" placeholder="Skills" name="skills" value={skills} onChange={onchange} /><br />
                    <input type="text" className="dash_input" placeholder="Github username" name="githubusername" value={githubusername} onChange={onchange} /><br />
                    <textarea className="dash_input" placeholder="Add Bio" value={bio} name="bio" onChange={onchange} /><br /><br />
                    <div class="socialMedia">
                        <span class="iconspan">
                            <i class="fab fa-twitter-square"></i>
                        </span>
                        <input type="text" class="Media_input" value={twitter} name="twitter" onChange={onchange} placeholder="url" />
                    </div>
                    <div class="socialMedia">
                        <span class="iconspan">
                            <i class="fab fa-facebook-square"></i>
                        </span>
                        <input type="text" class="Media_input" value={facebook} name="facebook" onChange={onchange} placeholder="url" />
                    </div>
                    <div class="socialMedia">
                        <span class="iconspan">
                            <i class="fab fa-instagram-square"></i>
                        </span>
                        <input type="text" class="Media_input" value={instagram} name="instagram" onChange={onchange} placeholder="url" />
                    </div>
                    <div class="socialMedia">
                        <span class="iconspan">
                            <i class="fab fa-linkedin"></i>
                        </span>
                        <input type="text" class="Media_input" value={linkedin} name="linkedin" onChange={onchange} placeholder="url" />
                    </div>
                    <div class="socialMedia">
                        <span class="iconspan">
                            <i class="fab fa-youtube-square"></i>
                        </span>
                        <input type="text" class="Media_input" value={youtube} name="youtube" onChange={onchange} placeholder="url" />
                    </div><br />
                    <button className="Profile_btn" type="submit">Submit</button>
                    <Link to="/dashboard" className="Profile_btn">Go back</Link>
                </form><br />
            </div>
        </div>
    )
}
const mapstate = state => ({
    profile: state.Profile.profile,
    loading: state.Profile.loading,
})
export default connect(mapstate, { createProfile, GetProfile })(withRouter(EditProfile))
