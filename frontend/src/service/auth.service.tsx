import axios from 'axios';
import { LOGIN_ENDPOINT } from './apiConfig';

interface LoginResponse {
    access_token: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
    try {
        const response = await axios.post(LOGIN_ENDPOINT, {
            username,
            password
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data: LoginResponse = response.data;
        localStorage.setItem('fptuTeacherDayToken', data.access_token);
        return response.data;
    } catch (error) {
        throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
}