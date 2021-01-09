import React from 'react'
import axios from 'axios'
import { Get_Profile, ProfileError, UpdateProfile, clearProfile, deleteAccount, Get_Profiles } from '../Actions/types'
import { setAlert } from './Alert'
import { Redirect } from 'react-router-dom'
export const GetProfile = () => async dispatch => {
    //Get current profile
    try {
        const res = await axios.get('/api/profile/me')
        console.log(res.data)
        dispatch({
            type: Get_Profile,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//getprofile by id
export const GetProfilebyId = (_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${_id}`)
        console.log(res.data)
        dispatch({
            type: Get_Profile,
            payload: res.data
        });
        return <Redirect to="/" />
    } catch (error) {
        dispatch({
            type: ProfileError,
            payload: error
        })
    }
}
//create profile
export const createProfile = (newprofile, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newprofile)
        const res = await axios.post('/api/profile', body, config)
        console.log(res.data)
        dispatch({
            type: Get_Profile,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//add experience
export const AddExperience = (newExp, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newExp)
        const res = await axios.put('/api/profile/experience', body, config)
        console.log(res.data)
        dispatch({
            type: UpdateProfile,
            payload: res.data
        });
        dispatch(setAlert('Experience Added'))
        history.push('/dashboard')
    } catch (error) {
        console.log(error)
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        dispatch(setAlert('Server Error'))
    }
}
//add education
export const AddEducation = (newEdu, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newEdu)
        const res = await axios.put('/api/profile/education', body, config)
        console.log(res.data)
        dispatch({
            type: UpdateProfile,
            payload: res.data
        });
        dispatch(setAlert('Education Added'))
        history.push('/dashboard')
    } catch (error) {
        console.log(error)
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        dispatch(setAlert('Server Error'))
    }
}
//delete exp
export const deleteExp = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`api/profile/experience/${id}`)
        dispatch({
            type: UpdateProfile,
            payload: res.data
        })
        dispatch(setAlert('Experience Removed'))
    } catch (error) {
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        dispatch(setAlert('Server Error'))
    }
}
//delete edu
export const deleteEdu = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`api/profile/education/${id}`)
        dispatch({
            type: UpdateProfile,
            payload: res.data
        })
        dispatch(setAlert('Education Removed'))
    } catch (error) {
        dispatch(setAlert('Server Error'))
    }
}
// Delete Account
export const deleteAcc = () => async dispatch => {
    if (window.confirm('Are you sure ??')) {
        try {
            const res = await axios.delete('/api/profile')
            dispatch({
                type: clearProfile,
            })
            dispatch({
                type: deleteAccount,
            })
            dispatch(setAlert('Your Account has permanently deleted'))
        } catch (error) {
            dispatch({
                type: ProfileError,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
            dispatch(setAlert('Server Error'))
        }
    }
}
//get all profiles
export const GetProfilesdev = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/')
        dispatch({
            type: Get_Profiles,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ProfileError,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


