import { Register_Fail, Register_Success, User_load, User_loadFail, Login_Fail, Login_Success, LogOut_Fail, LogOut } from './types'
import { setAlert } from '../Actions/Alert'
import axios from 'axios'
import setToken from '../setGlobalAuth'
//load user
export const loaduser = () => async dispatch => {
    if (localStorage.token) {
        setToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: User_load,
            payload: res.data
        })
    } catch (error) {
        if (error) {
            dispatch({
                type: User_loadFail
            })
        }
    }
}
export const Registeration = (Resdata) => async dispatch => {
    const newUser = Resdata
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newUser)
        console.log(body)
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: Register_Success,
            payload: res.data
        })
        dispatch(loaduser())
    } catch (error) {
        const err = error.response.data.errors
        if (err) {
            dispatch(setAlert('Enter a Valid Input'))
        }
        dispatch({
            type: Register_Fail,
        })
        dispatch(setAlert('User Already Exist'))
    }
}
//Login user
export const LoginUser = (Resdata) => async dispatch => {
    const newUser = Resdata
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newUser)
        console.log(body)
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type: Login_Success,
            payload: res.data
        })
        dispatch(loaduser())
    } catch (error) {
        const err = error.response.data.errors
        if (err) {
            dispatch(setAlert('Enter a Valid Input'))
        }
        dispatch({
            type: Login_Fail,
        })
        dispatch(setAlert('Server Error Invalid Credentials'))
    }
}
export const Logout = () => dispatch => {
    dispatch({
        type: LogOut
    })
}