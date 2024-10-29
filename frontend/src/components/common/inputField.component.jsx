import React from 'react';

const InputField = ({ placeholder }) => (
    <input
        type="text"
        placeholder={placeholder}
        className="w-60 h-14 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
);

export default InputField;
