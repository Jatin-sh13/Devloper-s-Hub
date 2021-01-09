import { Get_Profile, ProfileError, UpdateProfile, clearProfile, Get_Profiles } from '../Actions/types'
const initialstate = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}
const Profile = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case Get_Profile:
        case UpdateProfile:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case ProfileError: {
            return {
                ...state,
                error: payload,
                loading: false
            }
        }
        case clearProfile: {
            return {
                ...state,
                profile: null,
                loading: false,
            }
        }
        case Get_Profiles: {
            return {
                ...state,
                profiles: payload,
                loading:false
            }
        }
        default:
            return state
    }
}
export default Profile