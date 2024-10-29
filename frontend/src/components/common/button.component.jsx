import React from 'react';

const Button = ({ label, size = 'medium', variant = 'primary', onClick = () => { } }) => {
    const sizeClasses = {
        large: 'w-60 h-14 px-6 py-3',
        medium: 'w-[30%] py-4',
        small: 'px-8 py-4'
    };

    const variantClasses = {
        primary: 'bg-brand border-brand hover:bg-orange-600 hover:border-orange-600',
        // secondary: 'bg-gray-500 text-white border-gray-500',
        // outline: 'bg-transparent text-brand border-brand', 
        opacity: 'bg-orange-opacity border-brand hover:bg-brand hover:border-brand'
    };

    return (
        <button
            className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full border font-inter uppercase text-white text-xl font-semibold`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
