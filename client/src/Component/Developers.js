import React, { useEffect, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { GetProfilesdev, GetProfilebyId } from '../Actions/Profile'
const Developers = ({ GetProfilesdev, AllProfiles, GetProfilebyId,profile }) => {
    useEffect(() => {
        GetProfilesdev()
    }, [])
    if(profile!==null){
        return <Redirect to="/MainProfile" />
    }
    return (
        <div>
            {AllProfiles.map((current, index) => (
                <Fragment>
                    <div className="container">
                        <div class="card dev_card">
                            <div class="card-body dev_body">
                                <div class="dev_con">
                                    <img src={AllProfiles[index].user.avatar} alt='' class="rounded-circle Dev_img" />
                                    <div class="dev_con2">
                                        <h2 class="dev_name">{AllProfiles[index].company}</h2>
                                        <p>{AllProfiles[index].bio}</p>
                                        <p>{AllProfiles[index].company}</p><br />
                                        <button onClick={() => GetProfilebyId(AllProfiles[index].user._id)}>Visit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div><br /><br />
                    </div>
                </Fragment>
            ))}
        </div>
    )
}
const mapstate = state => ({
    profile: state.Profile.profile,
    AllProfiles: state.Profile.profiles,
    loading: state.Profile.loading,
    user: state.Auth.user

})
export default connect(mapstate, { GetProfilesdev, GetProfilebyId })(Developers)
