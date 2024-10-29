import React from 'react';

const Button = ({ label, size = 'medium', onClick = () => { } }) => {
    // Các class CSS tùy thuộc vào kích thước của nút
    const sizeClasses = {
        large: 'w-60 h-14 px-6 py-3',   // kích thước lớn
        medium: 'w-[30%] py-4',         // kích thước trung bình
        small: 'px-8 py-4'              // kích thước nhỏ
    };

    return (
        <button
            className={`${sizeClasses[size]} bg-orange-500 text-white rounded-full font-bold text-lg`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
