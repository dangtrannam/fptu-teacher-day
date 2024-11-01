import React, { forwardRef } from 'react';

const ContentBox = forwardRef(({ children, className }, ref) => (
    <div
        ref={ref}
        className={`w-full aspect-video rounded-md bg-contain bg-no-repeat ${className}`}
        style={{
            style: { backgroundImage: 'url("./assets/images/wish_card_flower.png")' }
        }}
    >
        <div className='mx-auto px-12 md:px-20 md:pt-20 pt-3 text-center'>
            {children}
        </div>
    </div>

));

export default ContentBox;
