import React from 'react';

const InputField = ({ placeholder, value, onChange, className }) => (
    <>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${className} w-60 h-14 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-black placeholder:font-medium placeholder:text-sm`}
        />
    </>
);

export default InputField;
