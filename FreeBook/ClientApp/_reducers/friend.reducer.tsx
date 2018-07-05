import { friendConstants } from '../_constants';

export function friend(state = {}, action: any) {
    switch (action.type) {
        case friendConstants.REQUEST_SUCCESS:
            return {
                type: 'request-success',
                
            };
        case friendConstants.REQUEST_FAILED:
            return {
                type: 'request-failed',
                message: action.message
            };
        case friendConstants.DELETE:
            return {
                message: ''
            };
        default:
            return state
    }
}