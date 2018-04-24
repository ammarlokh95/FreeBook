import { statusConstants } from '../_constants';
import { Reducer } from 'redux';
import { ApplicationState } from 'ClientApp/store';
export function status(state = {}, action: any): any {
    switch (action.type) {
        case statusConstants.CLEAR:
            return { };
        case statusConstants.SUCCESS:
            return {
                success: true,
                message: action.message
            };
        case statusConstants.ERROR:
            return {
                success: false,
                message: action.message
            };
        default:
            return state;
    }
}