import { statusConstants } from '../_constants';
import { Action } from 'history';

export const statusActions = {
    success,
    error,
    clear
};

function success(content: any) {
    return (dispatch: any) => {
        fetch('api/status/poststatus', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
            credentials: "same-origin"
        }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.statusCode == 200) {
                    dispatch({ type: statusConstants.SUCCESS, message: "iT WORKS" });
                }
                else {
                    dispatch({ type: statusConstants.ERROR, message: "iT Dont WORKS" });
                }

            })
            .catch((err) => {
                dispatch({
                    type: statusConstants.ERROR
                });
            });
       // return { type: statusConstants.SUCCESS, message: "iT WORKS" };
    }
}

function error(message: string) {
    return { type: statusConstants.ERROR, message };
}

function clear() {
    return { type: statusConstants.CLEAR };
}