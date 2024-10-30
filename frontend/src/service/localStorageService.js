const handleRemoveLocalStorage = (setNextPage) => {
    localStorage.removeItem('inputData');
    setNextPage();
};

export { handleRemoveLocalStorage };

export const setLocalStorageData = (data) => {
    localStorage.setItem('inputData', JSON.stringify(data));
};

export const getLocalStorageData = () => {
    return localStorage.getItem('inputData');
};
//Token 
export const setLocalStorageToken = (token) => {
    localStorage.setItem('fptuTeacherDayToken', token);
};

export const getLocalStorageToken = () => {
    const token = localStorage.getItem('fptuTeacherDayToken');
    console.log('Token from localStorage:', token); // Log the token for debugging
    return token;
};
export const removeLocalStorageToken = () => {
    localStorage.removeItem('fptuTeacherDayToken');
}

