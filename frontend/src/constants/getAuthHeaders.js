import { getLocalStorageToken } from "../service/localStorageService";

export const getAuthHeaders = () => {
    const token = getLocalStorageToken();
    return token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };
};
