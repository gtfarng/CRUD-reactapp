import axios from 'axios'

export const FETCH_SWITCHS = 'fetch_switchs'
const ROOT_URL = 'http://localhost:8005/api/switchs'

export function fetchSwitchs() {
    const request = axios.get(ROOT_URL)
    return {
        type: FETCH_SWITCHS,
        payload: request
    };
}

