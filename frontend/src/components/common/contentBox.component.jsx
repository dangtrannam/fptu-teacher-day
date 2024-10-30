import React, { forwardRef } from 'react';

const ContentBox = forwardRef(({ children, description }, ref) => (
    <div ref={ref} className="bg-pink rounded-lg  px-4 sm:px-16 pb-8 sm:pb-[50px] mx-auto mt-9 z-20">
        <p className="text-black font-medium text-xl w-full md:max-w-[80%] text-center mx-auto py-4 md:py-8 font-inter flex flex-col">
            <span>Bạn đã gửi lời chúc thành công</span>
            <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
        </p>
        <div className="bg-wish_card bg-center w-full aspect-video flex flex-col items-center justify-center rounded-md bg-contain bg-no-repeat">
            {children}
        </div>
    </div>
));

export default ContentBox;
