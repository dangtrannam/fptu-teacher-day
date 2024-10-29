import React from 'react';

const ContentBox = ({ children, description }) => (
    <div className="bg-white rounded-lg w-[49rem] min-h-[32.5rem] pt-12 px-[92px] pb-[50px] mx-auto mt-9">
        <p className="text-black font-normal text-sm max-w-96 text-center mx-auto">
            {description}
        </p>
        <div className="flex flex-col items-center justify-center h-[21.8rem] bg-[#C5C5C5] mt-4">
            {children}
        </div>
    </div>
);

export default ContentBox;
