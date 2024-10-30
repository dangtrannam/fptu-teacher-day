import React from 'react';

const ContentBox = ({ children, description }) => (
    <div className="bg-white rounded-lg w-full sm:max-w-[49rem] md:min-h-[32.5rem] px-4  sm:px-16 pb-8 sm:pb-[50px] mx-auto mt-9 z-20">
        <p className="text-black font-normal text-sm w-full md:max-w-[80%]  text-center mx-auto py-4 md:py-8">
            {description}
        </p>

        <div className='bg-wish_card bg-center w-full aspect-video flex flex-col items-center justify-center rounded-md bg-contain bg-no-repeat'>
        {children}
        </div>
    </div>
);

export default ContentBox;
