import React, { forwardRef } from 'react';

const ContentBox = forwardRef(({ children }, ref) => (

    <div ref={ref} className="bg-wish_card bg-center w-full aspect-video flex flex-col items-center justify-center rounded-md bg-contain bg-no-repeat">
        {children}
    </div>

));

export default ContentBox;
