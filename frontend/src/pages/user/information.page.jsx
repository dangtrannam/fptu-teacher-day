import React from 'react';
import Header from '../../components/layout/Header';
import SVGLogo from '../../components/common/svg.component';
import Button from '../../components/common/button.component';
import InputField from '../../components/common/inputField.component';

const InformationPage = ({ setNextPage }) => (
    <div className="h-screen flex flex-col bg-bgBase_Mobile md:bg-bgBase lg:bg-bgBase w-full bg-cover bg-center">
        <Header />
        <div className="flex justify-center mt-6 mb-20 mx-auto flex-col items-center">
            <SVGLogo />
            <div className="flex flex-col items-center justify-center space-y-10 max-w-md w-full mt-10 px-4">
                <form className="flex flex-col items-center space-y-6 max-w-md w-full">
                    <InputField placeholder="Họ tên" />
                    <InputField placeholder="Trường" />
                    <InputField placeholder="Lời cảm ơn" />
                </form>
                <Button
                    variant='primary'
                    label="Gửi lời chúc"
                    size="large"
                    onClick={setNextPage} />
            </div>
        </div>
    </div>
);

export default InformationPage;
