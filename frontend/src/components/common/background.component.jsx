import React from 'react';

const Background = () => {
    // Các class CSS tùy thuộc vào kích thước của nút
    const sizeClasses = {
        large: 'w-60 h-14 px-6 py-3',   // kích thước lớn
        medium: 'w-[30%] py-4',         // kích thước trung bình
        small: 'px-8 py-4'              // kích thước nhỏ
    };

    return (
        <div className='w-screen h-screen overflow-hidden -z-10 bg-bgBase_Mobile min-[500px]:bg-bgBase_Tablet min-[1200px]:bg-bgBase bg-cover bg-center'>
            Bacground
        </div>
    );
};

export default Background;
