import { authHeader, config } from '../_helpers';
export const friendService = {
    friendRequest,
    deleteFriend,
    acceptFriend

};

function friendRequest(username: string, fusername: string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch('api/addfriend/?username=' + username + "&friend_username=" + fusername).then(handleResponse, handleError);
}
//TODO
function deleteFriend(username: string, fusername: string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch('api/addfriend/?username=' + username + "&friend_username=" + fusername).then(handleResponse, handleError);
}
//TODO
function acceptFriend(username: string, fusername: string) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch('api/addfriend/?username=' + username + "&friend_username=" + fusername).then(handleResponse, handleError);
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


function handleError(error: Error) {
    return Promise.reject(error && error.message);
}