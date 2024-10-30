import React from 'react';
import Button from '../../components/common/button.component';
import Background from '../../components/common/background.component';
import SVGLogo from '../../components/common/svg.component.jsx';
import { trackingUserAccess } from '../../service/tracking.service.js';
import { handleRemoveLocalStorage } from '../../service/localStorageService.js';

const IntroductionPage = ({ setNextPage }) => {

    const handleStart = () => {
        handleRemoveLocalStorage(setNextPage);
        trackingUserAccess();
    };

    return (
        <div className="relative  w-screen overflow-hidden">
            <Background />
            <div className="absolute left-1/2 -translate-x-1/2 top-[12vh] flex flex-col items-center justify-center mt-16 lg:mt-32 mb-10 mx-auto max-w-2xl w-full">
                <div className="flex justify-center items-center w-full">
                    <SVGLogo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 w-full mt-10 px-4 lg:px-0">
                    <p className="text-center text-gray-700 text-base md:text-lg font-inter">
                        Lorem ipsum dolor sit amet consectetur. Lobortis sit mauris vestibulum justo interdum.
                    </p>
                    <Button
                        variant='primary'
                        label="Gửi lời chúc"
                        size="large"
                        onClick={handleStart}
                    />
                </div>
            </div>
        </div>
    )
};
export default IntroductionPage;
