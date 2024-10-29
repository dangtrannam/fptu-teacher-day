import React from 'react';
import Button from '../../components/common/button.component';
import SVGLogo from '../../components/common/svg.component.jsx';
const IntroductionPage = ({ setNextPage }) => (
    <div className="h-screen flex flex-col bg-bgBase bg-cover bg-center">
        <div className="flex justify-center mt-32 mb-10 mx-auto flex-col items-center">
            <SVGLogo />
            <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full mt-10">
                <p className="text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur. Lobortis sit mauris vestibulum justo interdum.
                </p>
                <Button label="Bắt đầu" size="large" onClick={setNextPage} />
            </div>
        </div>
    </div>
);

export default IntroductionPage;
