import { combineReducers } from 'redux'
import Alert from '../Reducer/Alert'
import Auth from '../Reducer/Auth'
import Profile from '../Reducer/Profile'
export default combineReducers({
    Alert,
    Auth,
    Profile
})