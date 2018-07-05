import { userConstants } from '../_constants';
import { Reducer } from 'redux';
import { ApplicationState } from 'ClientApp/store';
export function registration(state = {}, action: any): any{
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return { success:true };
        case userConstants.REGISTER_FAILURE:
            return { success:false };
        default:
            return state;
    }
}