import axios from 'axios';
import { GET_IP_URL, TRACKING_ACCESS_ENDPOINT, TRACKING_SHARE_ENDPOINT } from './apiConfig';

// Helper to retrieve IP address
const getUserIP = async () => {
    try {
        const response = await axios.get(GET_IP_URL);
        return response.data.ip;
    } catch (error) {
        logError('Error retrieving IP:', error);
        throw new Error('Unable to retrieve IP address');
    }
};

// Helper to retrieve headers with optional token
const getAuthHeaders = () => {
    const token = getLocalStorageToken();
    return token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };
};

// Helper to handle error logging consistently
const logError = (action, error) => {
    console.error(`Error during ${action}:`, error);
};

// Track user access
export const trackingUserAccess = async () => {
    try {
        const userIP = await getUserIP();
        await axios.post(
            TRACKING_ACCESS_ENDPOINT,
            { ip: userIP },
            { headers: { 'x-forwarded-for': userIP } }
        );
    } catch (error) {
        logError('tracking user access', error);
    }
};

// Track user share
export const trackingUserShare = async () => {
    try {
        const userIP = await getUserIP();
        await axios.post(
            TRACKING_SHARE_ENDPOINT,
            { ip: userIP },
            { headers: { 'x-forwarded-for': userIP } }
        );
    } catch (error) {
        logError('tracking user share', error);
    }
};

// Get all tracking data
export const getAllTrackingAccess = async () => {
    try {
        const response = await axios.get(TRACKING_ACCESS_ENDPOINT, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        logError('getting all tracking data', error);
        return [];
    }
};

// Get tracking share data
export const getAllTrackingShare = async () => {
    try {
        const response = await axios.get(TRACKING_SHARE_ENDPOINT, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        logError('getting tracking share data', error);
        return [];
    }
};
