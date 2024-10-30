import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import SVGLogo from '../../components/common/svg.component';
import Button from '../../components/common/button.component';
import InputField from '../../components/common/inputField.component';
import Background from '../../components/common/background.component';

const InformationPage = ({ setNextPage }) => {
    const [name, setName] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [userInput, setUserInput] = useState('');

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { name, schoolName, userInput };
        localStorage.setItem('inputData', JSON.stringify(newData));

        setNextPage(); // Move to next page after saving data
        setName('');
        setSchoolName('');
        setUserInput('');
    };

    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <Header />
            <div className="absolute left-1/2 -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center">
                <SVGLogo className="w-24 md:w-32 lg:w-40 h-auto" />
                <div className="flex flex-col items-center justify-center space-y-10 max-w-md w-full mt-10 px-4">
                    <form className="flex flex-col items-center space-y-6 max-w-md w-full" onSubmit={handleSubmit}>
                        <InputField
                            placeholder="Họ tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                        <InputField
                            placeholder="Trường"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                        <InputField
                            placeholder="Lời cảm ơn"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                    </form>
                    <Button
                        variant="primary"
                        label="Gửi lời chúc"
                        size="large"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default InformationPage;
