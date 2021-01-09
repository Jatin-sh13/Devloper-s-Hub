import { set_Alert, remove_Alert } from './types'
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: set_Alert,
        payload: { msg, alertType, id }
    })
    setTimeout(() => {
        dispatch({
            type: remove_Alert,
            payload: id
        })
    }, 3000);
}
export const direct=()=>{
    return (
        <button></button>
    )
}