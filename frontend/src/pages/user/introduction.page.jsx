import React from 'react';
import Button from '../../components/common/button.component';
import SVGLogo from '../../components/common/svg.component.jsx';
import { trackingUserAccess } from '../../service/tracking.service.js';

const IntroductionPage = ({ setNextPage }) => {

    const handleStart = () => {
        setNextPage();
        trackingUserAccess();
    };

    return (
        <div className="h-screen flex flex-col md:bg-bgBase bg-bgBase_Mobile lg:bg-bgBase w-full bg-cover bg-center p-4">
            <div className="flex flex-col items-center justify-center mt-16 lg:mt-32 mb-10 mx-auto max-w-2xl w-full">
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
