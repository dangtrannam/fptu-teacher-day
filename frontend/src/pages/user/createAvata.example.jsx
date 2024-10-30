import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';
import Background from '../../components/common/background.component';
import { useEffect, useState } from 'react';
import { trackingUserShare } from '../../service/tracking.service';

const CreateAvatarExample = ({ setNextPage }) => {
    const [wishData, setWishData] = useState();

    const data = localStorage.getItem('inputData');
    useEffect(() => {
        if (data) {
            setWishData(JSON.parse(data));
        }
    }, [data]);

    const handleShare = () => {
        trackingUserShare();
    };

    const handleAddOtherWish = () => {
        localStorage.removeItem('inputData');
        setNextPage(); // Navigate to the previous page or desired page
    };

    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <Header />
            {/* black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="absolute left-1/2 w-full -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center px-2 md:px-4">
                <ContentBox description="Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.">
                    <span className="max-w-[45%] text-center mx-auto text-base font-normal text-black font-inter">
                        {wishData?.userInput || 'Bạn chưa nhập lời chúc'}
                    </span>
                </ContentBox>

                {/* Button Container */}
                <div className="flex flex-col sm:flex-row justify-around items-center w-full max-w-[30rem] sm:max-w-[49rem] mx-auto mt-6 z-20 space-y-4 sm:space-y-0">
                    <div className='flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch'>
                        <Button variant="opacity" label="Gửi lời chúc khác" size="medium" onClick={handleAddOtherWish} />
                    </div>
                    <div className='flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch'>
                        <Button variant="primary" label="Chia sẻ" size="medium" onClick={handleShare} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAvatarExample;
