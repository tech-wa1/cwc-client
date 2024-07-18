import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_DOMAIN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const get = axios.get

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, data: any) => {
    return axios.post(url, data)
}
