const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;

export const WISH_ENDPOINT = `${BASE_URL}/upload`;
export const IMAGE_ENDPOINT = `${BASE_URL}/upload/image`;

//Tracking 
export const GET_IP_URL = 'https://api.ipify.org?format=json';
export const TRACKING_ACCESS_ENDPOINT = `${BASE_URL}/tracking/access`;
export const TRACKING_SHARE_ENDPOINT = `${BASE_URL}/tracking/share`;
