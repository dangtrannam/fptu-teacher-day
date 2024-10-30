import React from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';
import Background from '../../components/common/background.component';

const CreateAvatarExample = ({ onAddWishOther, onShare }) => (
    <div className="relative w-screen overflow-hidden">
        <Background />
        <Header />
        {/* black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="absolute left-1/2 w-full -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center px-2 md:px-4">
            <ContentBox description="Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.">
                <span className="max-w-[80%] text-center mx-auto text-xs font-normal text-black">
                    Lorem ipsum dolor sit amet consectetur. Vel mi id est tincidunt ac auctor sagittis metus. At risus interdum venenatis fringilla feugiat diam.
                </span>
            </ContentBox>

            {/* Button Container */}
            <div className="flex flex-col sm:flex-row justify-around items-center w-full max-w-[30rem] sm:max-w-[49rem] mx-auto mt-6 z-20 space-y-4 sm:space-y-0">
                <div className='flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch'>
                    <Button variant="opacity" label="Gửi lời chúc khác" size="medium" onClick={onAddWishOther} />
                </div>
                <div className='flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch'>
                    <Button variant="primary" label="Chia sẻ" size="medium" onClick={onShare} />
                </div>
            </div>
        </div>
    </div>
);

export default CreateAvatarExample;
