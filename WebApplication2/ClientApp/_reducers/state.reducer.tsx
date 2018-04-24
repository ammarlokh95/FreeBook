import { userConstants } from '../_constants';
import { Reducer } from 'redux';
import { ApplicationState } from '../store';
export const stateChanger: Reducer<ApplicationState> = (state: ApplicationState, action: any) => {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                user: action.user
            };
        case userConstants.LOGOUT:
            return {
                user: {}
            }
    }
    return state;
}
