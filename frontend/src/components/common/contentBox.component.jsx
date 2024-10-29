import React from 'react';

const ContentBox = ({ children, description }) => (
    <div className="bg-pink rounded-lg w-[49rem] min-h-[32.5rem] pt-12 px-[92px] pb-[50px] mx-auto mt-9 z-20">
        <div className="text-black font-medium text-xl max-w-[32.5rem] mx-auto text-center font-inter flex flex-col">
            <span>Bạn đã gửi lời chúc thành công</span>
            <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
        </div>
        <div className="flex flex-col items-center justify-center h-[21.8rem] bg-wish_card mt-4">
            {children}
        </div>
    </div>
);

export default ContentBox;
