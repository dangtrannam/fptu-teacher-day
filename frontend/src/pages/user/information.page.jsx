import React from 'react';
import Header from '../../components/layout/Header';
import SVGLogo from '../../components/common/svg.component';
import Button from '../../components/common/button.component';
import InputField from '../../components/common/inputField.component';
import Background from '../../components/common/background.component';

const InformationPage = ({ setNextPage }) => (
    <div className="relative w-screen overflow-hidden">
        <Background />
        <Header />
        <div className="absolute left-1/2 -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center">
            <SVGLogo className="w-24 md:w-32 lg:w-40 h-auto" />
            <div className="flex flex-col items-center justify-center space-y-10 max-w-md w-full mt-10 px-4">
                <form className="flex flex-col items-center space-y-6 max-w-md w-full">
                    <InputField placeholder="Họ tên" className="w-full max-w-xs md:max-w-sm lg:max-w-md" />
                    <InputField placeholder="Trường" className="w-full max-w-xs md:max-w-sm lg:max-w-md" />
                    <InputField placeholder="Lời cảm ơn" className="w-full max-w-xs md:max-w-sm lg:max-w-md" />
                </form>
                <Button
                    variant='primary'
                    label="Gửi lời chúc"
                    size="large"
                    onClick={setNextPage}
                />
            </div>
        </div>
    </div>
);

export default InformationPage;
