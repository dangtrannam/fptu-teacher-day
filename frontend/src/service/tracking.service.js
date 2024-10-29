import axios from 'axios';
import { GET_IP_URL, TRACKING_ACCESS_ENDPOINT } from './apiConfig';

export const trackingUserAccess = async () => {
    try {
        // get IP address
        const ipResponse = await axios.get(GET_IP_URL);
        const userIP = ipResponse.data.ip; // Get IP address from response

        // post IP address to API
        const postResponse = await axios.post(TRACKING_ACCESS_ENDPOINT, {
            ip: userIP,
        }, {
            headers: {
                'x-forwarded-for': userIP,
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getAllTracking = async () => {
    try {
        const token = localStorage.getItem('fptuTeacherDayToken');
        const response = await axios.get(TRACKING_ACCESS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};