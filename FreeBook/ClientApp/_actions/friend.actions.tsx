import { friendConstants } from '../_constants';
import { friendService } from '../_services';
import { fail } from 'assert';
export const friendActions = {
    sendFriendRequest,
    deleteFriend
};

function sendFriendRequest(username: string, fusername: string) {
    return ((dispatch: any) => {
        friendService.friendRequest(username, fusername)
            .then((data: any) => {
                if (data.statusCode == 200)
                    return dispatch(success())
                else dispatch(failure(JSON.parse(data.reasonPhrase)))
            })
            .catch((error) => dispatch(failure(error.message))); 
    });

    function success() {
        return { type: friendConstants.REQUEST_SUCCESS };
    }
    function failure(message:string) {
        return { type: friendConstants.REQUEST_FAILED, message };
    }
}



function deleteFriend() {
    return { type: friendConstants.DELETE };
}