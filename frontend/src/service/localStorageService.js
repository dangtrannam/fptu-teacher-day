const handleRemoveLocalStorage = (setNextPage) => {
    localStorage.removeItem('inputData');
    setNextPage();
};

export { handleRemoveLocalStorage };