import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { status } from './status.reducer';
export const rootReducer = {
    authentication,
    registration,
    users,
    alert,
    status
};

export default rootReducer;