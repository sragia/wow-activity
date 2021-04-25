import axios, { Method } from 'axios';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class Api {
    public register(email: string, username: string, password: string) {
        return this.fetch('auth/register', {
            email,
            username,
            password
        }, 'POST');
    }

    private fetch(uri: string, payload: {[index: string]: any}, method: Method = 'GET') {
        return axios({
            url: `${ENDPOINT}${uri}`,
            method,
            params: payload
        });
    }
}

export default new Api();