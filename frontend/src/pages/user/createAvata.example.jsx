import React from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';

const CreateAvatarExample = ({ onAddImage, onComplete }) => (
    <div className="h-screen flex flex-col bg-bgBase bg-cover bg-center">
        <Header />

        {/* ContentBox */}
        <ContentBox description="Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.">

        </ContentBox>

        {/* Button Container */}
        <div className="flex justify-around items-center w-[49rem] mx-auto mt-6">
            <Button label="Thêm ảnh" size="medium" onClick={onAddImage} />
            <Button label="Hoàn tất" size="medium" onClick={onComplete} />
        </div>
    </div>
);

export default CreateAvatarExample;
