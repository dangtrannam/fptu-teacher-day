import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import SVGLogo from '../../components/common/svg.component';
import Button from '../../components/common/button.component';
import InputField from '../../components/common/inputField.component';
import Background from '../../components/common/background.component';
import { setLocalStorageData, getLocalStorageData } from '../../service/localStorageService';
import { informationSchema } from './schema/userInputSchema';

const InformationPage = ({ setNextPage }) => {
    const [name, setName] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [userInput, setUserInput] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const savedData = getLocalStorageData();

    // Load saved data when the component mounts
    useEffect(() => {
        if (savedData) {
            setName(savedData.name || '');
            setSchoolName(savedData.schoolName || '');
            setUserInput(savedData.userInput || '');
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Mark as submitted to show validation errors
        const formData = { name, schoolName, userInput };

        try {
            // Validate form data with Yup schema
            await informationSchema.validate(formData, { abortEarly: false });
            setLocalStorageData(formData); // Save valid data to localStorage
            setNextPage();

            // Reset form
            setName('');
            setSchoolName('');
            setUserInput('');
            setErrors({});
        } catch (validationErrors) {
            // Collect and display validation errors
            const formErrors = {};
            validationErrors.inner.forEach((error) => {
                formErrors[error.path] = error.message;
            });
            setErrors(formErrors);
        }
    };

    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <Header />
            <div className="absolute left-1/2 -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center">
                <SVGLogo className="w-24 md:w-32 lg:w-40 h-auto" />
                <div className="flex flex-col items-center justify-center space-y-10 max-w-md w-full mt-10 px-4">
                    <form className="flex flex-col items-center space-y-4 max-w-md w-full" onSubmit={handleSubmit}>
                        <InputField
                            placeholder="Họ tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                        {isSubmitted && errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name}</p>}

                        <InputField
                            placeholder="Trường"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                        {isSubmitted && errors.schoolName && <p className="text-red-500 text-sm font-bold mt-1">{errors.schoolName}</p>}

                        <InputField
                            placeholder="Lời chúc"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                        />
                        {isSubmitted && errors.userInput && <p className="text-red-500 text-sm font-bold mt-1">{errors.userInput}</p>}
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
