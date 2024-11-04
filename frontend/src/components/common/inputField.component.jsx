import React from 'react';

const InputField = ({ placeholder, value, onChange, className, hint }) => (
    <div className="relative w-full">
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${className} shadow-md w-60 h-14 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-black placeholder:font-medium placeholder:text-sm`}
        />
        {!value && hint && (
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 italic text-sm font-medium">
                {hint}
            </span>
        )}
    </div>
);

export default InputField;
