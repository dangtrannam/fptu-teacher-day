import axios from 'axios';
import { LOGIN_ENDPOINT } from './apiConfig';

export async function login(username, password) {
    try {
        const response = await axios.post(LOGIN_ENDPOINT, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        if (data.access_token) {
            localStorage.setItem('fptuTeacherDayToken', data.access_token);
        } else {
            throw new Error('Invalid token');
        }
        return data;
    } catch (error) {
        throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
}

export function logout() {
    localStorage.removeItem('fptuTeacherDayToken');
}
