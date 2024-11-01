import React, { forwardRef } from 'react';

const ContentBox = forwardRef(({ children, className }, ref) => (
    <div
        ref={ref}
        className={` ${className}`}
    >
        <div className=''>
            {children}
        </div>
    </div>

));

export default ContentBox;
