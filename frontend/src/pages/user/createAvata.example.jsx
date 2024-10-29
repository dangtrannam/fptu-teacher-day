import React from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';

const CreateAvatarExample = ({ onAddWishOther, onShare }) => (
    <div className="h-screen relative flex flex-col bg-bgBase bg-cover bg-center">

        {/* Lớp phủ mờ với độ mờ cao hơn */}
        <div className="absolute inset-0 z-10 bg-black-50"></div>

        {/* Nội dung chính */}
        <Header className="z-20" />

        {/* ContentBox */}
        <ContentBox description="Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.">
            <span className='max-w-80 text-center mx-auto text-xs font-normal text-black'>
                Lorem ipsum dolor sit amet consectetur. Vel mi id est tincidunt ac auctor sagittis metus. At risus interdum venenatis fringilla feugiat diam.
            </span>
        </ContentBox>

        {/* Button Container */}
        <div className="flex justify-around items-center w-[49rem] mx-auto mt-6 z-20">
            <Button variant='opacity' label="Gửi lời chúc khác" size="medium" onClick={onAddWishOther} />
            <Button variant='primary' label="Chia sẻ" size="medium" onClick={onShare} />
        </div>
    </div>
);

export default CreateAvatarExample;
