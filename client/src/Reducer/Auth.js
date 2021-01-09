import { Register_Fail, Register_Success, User_load, User_loadFail, Login_Success, Login_Fail, LogOut, deleteAccount } from '../Actions/types'
const initialstate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}
const Auth = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case Login_Success:
        case Register_Success:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload, //Inserting Payload
                isAuthenticated: true,
                loading: false,
            }
        case User_loadFail:
        case Register_Fail:
        case Login_Fail:
        case LogOut:
        case deleteAccount:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: payload
            }
        case User_load:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state
    }
}
export default Auth