import { userConstants } from '../_constants';
import { ApplicationState } from 'ClientApp/store';

let user: any;
try {
    user = JSON.parse((window as any).localStorage.getItem('user'));
}
catch (err) {
    user = null;
}
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = {}, action: any) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn:false,
                user: {}
            };
        case userConstants.LOGOUT:
            return {
                loggedOut: true,
                user: {}
            };
        default:
            return state;
    }
}