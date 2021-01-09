import { set_Alert, remove_Alert } from '../Actions/types'
const initialstate = [];
const Alert = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case set_Alert:
            return [...state, payload];
        case remove_Alert:
            return state.filter(alert => alert.id !== payload)
        default:
            return state
    }
}
export default Alert

