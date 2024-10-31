import React, { forwardRef } from 'react';

const ContentBox = forwardRef(({ children, className }, ref) => (
    <div
        ref={ref}
        className={`w-full aspect-video flex flex-col items-center justify-center rounded-md ${className}`}
    >
        {children}
    </div>

));

export default ContentBox;
