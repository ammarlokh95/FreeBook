import { authHeader, config } from '../_helpers';
export const userService = {
    login,
    logout,
    register,
    //getAll,
    getByUsername,
    update,
    //delete: _delete
};

function login(username:string, password:string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('api/user/login', requestOptions)
        .then(handleResponse, handleError)
        .then((user:any) => {
            // login successful if there's a jwt token in the response
            console.log(user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                try {
                    (window as any).localStorage.setItem('user', JSON.stringify(user));
                }
                catch (err) {

                }
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    try {
        localStorage.removeItem('user');
    }
    catch (err) {
        return;
    }
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users', requestOptions).then(handleResponse, handleError);
}

function getByUsername(username:string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('api/user?username=' + username, requestOptions).then(handleResponse, handleError);
}

function register(user:any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('api/user/register', requestOptions)
        .then((response) => {
            if (response.status== 200) {
                // return json if it was returned in the response
                return response.body;

        } else {
                // return error message from response body
                console.log("Fail")
            response.text();
            }
        })
        .catch((err) => { console.log("ERROR" + err); return (err) });
}

function update(user:any) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
        
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id:any) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

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
function handleError(error:Error) {
    return Promise.reject(error && error.message);
}