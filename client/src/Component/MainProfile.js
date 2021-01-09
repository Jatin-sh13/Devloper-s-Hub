import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { GetProfilebyId } from '../Actions/Profile'
const MainProfile = ({ GetProfilebyId, profile, }) => {
    console.log(profile)
    useEffect(() => {
        GetProfilebyId(profile.user._id)
    }, [])
    return (
        <div>
            <div class="container">
                <div class="card Pro_card">
                    <div class="card-body Pro_body">
                        <div class="Pro_con">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" class="rounded-circle pro_img" /><br />
                            <h1>{profile.user.name}</h1>
                            <h6>{profile.company}</h6>
                            <p>{profile.location}</p>
                        </div>
                        <div class="icon_con">
                            <span class="Pro_icon">
                                <a href="" class="pro_link"><i class="fab fa-instagram Pro_icon_in"></i></a>
                            </span>
                            <span class="Pro_icon">
                                <a href="" class="pro_link"><i class="fab fa-twitter  Pro_icon_in"></i></a>
                            </span>
                            <span class="Pro_icon">
                                <a href="" class="pro_link"><i class="fab fa-facebook-f  Pro_icon_in"></i></a>
                            </span>
                            <span class="Pro_icon">
                                <a href="" class="pro_link"><i class="fab fa-youtube  Pro_icon_in"></i></a>
                            </span>
                            <span class="Pro_icon">
                                <a href="" class="pro_link"><i class="fab fa-github  Pro_icon_in"></i></a>
                            </span>
                        </div>
                    </div>
                </div><br />
                <div class="card Pro_card">
                    <div class="card-body Pro_body">
                        <center>
                            <h3>{profile.user.name} Bio</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's. </p>
                        </center>
                    </div>
                </div><br />
                <div class="card Pro_card">
                    <div class="card-body Pro_body">
                        <center>
                            <h3>Skill Set</h3>
                            {profile.skills.map((currentElement, index) => (
                                <div>
                                    <span class="Skill_Set">{currentElement}</span>
                                </div>
                            ))}
                        </center>
                    </div>
                </div><br /><br />
            </div>
        </div>
    )
}
const mapstate = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    profile: state.Profile.profile,
    loading: state.Profile.loading,

})
export default connect(mapstate, { GetProfilebyId })(MainProfile)
