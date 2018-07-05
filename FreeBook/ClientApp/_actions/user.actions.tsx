import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { Dispatch } from 'react-redux';
import { authHeader } from '../_helpers';
//import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getUserInfo,
    getUserInfoAndFriendStat
   // //getAll,
    //delete: _delete
};

function login(username:string, password:string) {
    return (dispatch:any) => {
        dispatch(request({ username }));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        fetch('api/login/user', requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((user: any) => {
                // login successful if there's a jwt token in the response
                //if (user && user.token) {
                if (user.statusCode == 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    try {
                        (window as any).localStorage.setItem('user', user.reasonPhrase);
                    }
                    catch (err) {

                    }
                    // console.log(user.reasonPhrase);
                    dispatch(success(user.reasonPhrase));
                    dispatch(alertActions.success("Login Successful"));
                }
                else {
                    dispatch(failure(user));
                    dispatch(alertActions.error(user.reasonPhrase));
                }

            })
            .catch((err) => dispatch(failure(err)))
    };

    function request(user:any) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user:any) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error:any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return (dispatch: any) => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT });
    }
}

function register(user: any) {
    return (dispatch:any) => {
        dispatch(request(user));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        fetch('api/user/register', requestOptions)
            .then((response) => {
                // return json if it was returned in the response
                return response.json();
            })
            .then(
            (data: any) => {
                if (data.statusCode == 200) {
                    console.log("Regsitration success" + data.reasonMessage);
                    dispatch(success(user));
                    // history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                }
                else {
                    console.log("Regsitration failed" + data.reasonPhrase);

                    dispatch(failure(data));
                    dispatch(alertActions.error(data.reasonPhrase))
                }
            })
            .catch((err) => { console.log("ERROR" + err); dispatch(alertActions.error); });
            
    };

    function request(user:any) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user:any) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error:any) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getUserInfo(username:string) {
    return (dispatch:any) => {
        dispatch(request());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        fetch('api/user/?username=' + username, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then(
            (data: any) => {
                if (data.statusCode == 200) {
                    dispatch(success(JSON.parse(data.reasonPhrase)));
                }
                else dispatch(failure(data));
            })
            .catch((error) => dispatch(failure(error)));
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(users:any) { return { type: userConstants.GET_SUCCESS, users } }
    function failure(error:any) { return { type: userConstants.GET_FAILURE, error } }
}

function getUserInfoAndFriendStat(username: string, logged_username:string) {
    return (dispatch: any) => {
        dispatch(request());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        fetch('api/userAndFriend/?logged_username=' + logged_username + '&page_username=' + username, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then(
            (data: any) => {
                if (data.statusCode == 200) {
                    dispatch(success(JSON.parse(data.reasonPhrase)));
                }
                else dispatch(failure(data));
            })
            .catch((error) => dispatch(failure(error)));
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(users: any) { return { type: userConstants.GET_SUCCESS, users } }
    function failure(error: any) { return { type: userConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
//function _delete(id) {
//    return dispatch => {
//        dispatch(request(id));

//        userService.delete(id)
//            .then(
//            () => {
//                dispatch(success(id));
//            },
//            error => {
//                dispatch(failure(id, error));
//            }
//            );
//    };

//    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
//}


function handleResponse(response: any) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json();//.then((json: any) => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then((text: any) => reject(text));
        }
    });
}

function handleError(error: Error) {
    return Promise.reject(error && error.message);
}