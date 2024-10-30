import React, { useEffect, useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';
import Background from '../../components/common/background.component';
import { trackingUserShare } from '../../service/tracking.service';
import { postWishData } from '../../service/wish.service';
import { getLocalStorageData, handleRemoveLocalStorage } from '../../service/localStorageService';

const WishCardResultPage = ({ setNextPage }) => {
    const [wishData, setWishData] = useState({});
    const contentBoxRef = useRef(null);
    const data = getLocalStorageData();

    useEffect(() => {
        if (data) {
            setWishData(JSON.parse(data));
        }
    }, [data]);

    const exportImage = async () => {
        if (!contentBoxRef.current) return;

        try {
            const dataURL = await toPng(contentBoxRef.current, {
                backgroundColor: null,
                quality: 1.0,
                height: contentBoxRef.current.scrollHeight,
                width: contentBoxRef.current.offsetWidth,
            });

            //Download image
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "fpt_20-11.png";
            link.click();

            // conver dataURL to Blob
            const blob = await fetch(dataURL).then(res => res.blob());

            // create new File object
            const file = new File([blob], 'fpt_20-11.png', { type: 'image/png' });
            return file;
        } catch (error) {
            console.error('Error exporting image:', error);
            throw error;
        }
    };


    const handleShare = async () => {
        trackingUserShare(); // follow user share action
        const exportedImageFile = await exportImage(); // export image from contentBoxRef

        // create new wishData object
        const newWishData = {
            image: exportedImageFile, // user input image
            name: wishData.name || '', // get name from wishData
            schoolName: wishData.schoolName || '', // get schoolName from wishData
            userInput: wishData.userInput || '', // get userInput from wishData
        };

        // post wish data to server
        try {
            await postWishData(newWishData)
            handleRemoveLocalStorage(setNextPage);
        } catch (error) {
            console.error('Failed to post wish data:', error);
        }
    };

    const handleAddOtherWish = () => {
        handleRemoveLocalStorage(setNextPage);
    };

    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <Header />
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="absolute left-1/2 w-full -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center px-2 md:px-4">

                <div className='w-full sm:max-w-[49rem] md:min-h-[32.5rem] bg-pink rounded-lg px-4 sm:px-16 pb-8 sm:pb-[50px] mx-auto mt-9 z-20'>
                    <p className="text-black font-medium text-xl w-full md:max-w-[80%] text-center mx-auto py-4 md:py-8 font-inter flex flex-col">
                        <span>Bạn đã gửi lời chúc thành công</span>
                        <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
                    </p>
                    <ContentBox ref={contentBoxRef}>
                        <span className="max-w-[40%] text-center mx-auto text-base font-normal text-black font-inter">
                            {wishData.userInput || 'Bạn chưa nhập lời chúc'}
                        </span>
                    </ContentBox>
                </div>

                <div className="flex flex-col sm:flex-row justify-around items-center w-full max-w-[30rem] sm:max-w-[49rem] mx-auto mt-6 z-20 space-y-4 sm:space-y-0">
                    <div className="flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch">
                        <Button
                            variant="opacity"
                            label="Gửi lời chúc khác"
                            size="medium"
                            onClick={handleAddOtherWish}
                        />
                    </div>
                    <div className="flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch">
                        <Button variant="primary" label="Chia sẻ" size="medium" onClick={handleShare} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishCardResultPage;
