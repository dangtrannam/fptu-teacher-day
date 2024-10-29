import React from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';

const CreateAvatarExample = ({ onAddWishOther, onShare }) => (
    <div className="h-screen flex flex-col bg-bgBase bg-cover bg-center">
        <Header />

        {/* ContentBox */}
        <ContentBox description="Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.">
            <span className='max-w-80 text-center mx-autor text-xs font-normal text-black'>
                Lorem ipsum dolor sit amet consectetur. Vel mi id est tincidunt ac auctor sagittis metus. At risus interdum venenatis fringilla feugiat diam.

            </span>
        </ContentBox>

        {/* Button Container */}
        <div className="flex justify-around items-center w-[49rem] mx-auto mt-6">
            <Button label="Gửi lời chúc khác" size="medium" onClick={onAddWishOther} />
            <Button label="Chia sẻ" size="medium" onClick={onShare} />
        </div>
    </div>
);

export default CreateAvatarExample;
