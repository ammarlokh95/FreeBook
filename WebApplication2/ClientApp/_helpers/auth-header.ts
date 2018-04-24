//import * as ls from 'local-storage';
export function authHeader() {
    // return authorization header with jwt token
    try {
        let user = JSON.parse((window as any).localStorage.getItem('user') as string);
        if (user && user.token) {
            return { 'Authorization': 'Bearer ' + user.token };
        } else {
            return {};
        }
    }
    catch (err) {
        return {};
    }
}