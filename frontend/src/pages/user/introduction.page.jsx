import React from 'react';
import Button from '../../components/common/button.component';
import SVGLogo from '../../components/common/svg.component.jsx';

const IntroductionPage = ({ setNextPage }) => (
    <div className="h-screen flex flex-col md:bg-bgBase bg-bgBase_Mobile lg:bg-bgBase w-full bg-cover bg-center p-4">
        <div className="flex flex-col items-center justify-center mt-16 lg:mt-32 mb-10 mx-auto max-w-2xl w-full">
            <div className="flex justify-center items-center w-full">
                <SVGLogo className="hidden lg:block max-w-full w-auto max-h-56" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 w-full mt-10 px-4 lg:px-0">
                <p className="text-center text-gray-700 text-base md:text-lg">
                    Lorem ipsum dolor sit amet consectetur. Lobortis sit mauris vestibulum justo interdum.
                </p>
                <Button label="Gửi lời chúc" size="large" onClick={setNextPage} />
            </div>
        </div>
    </div>
);

export default IntroductionPage;
