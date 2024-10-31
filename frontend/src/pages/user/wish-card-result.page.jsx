import React, { useEffect, useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';
import Background from '../../components/common/background.component';
import { trackingUserShare } from '../../service/tracking.service';
import { postWishData } from '../../service/wish.service';
import { getLocalStorageData, handleRemoveLocalStorage } from '../../service/localStorageService';

function isMobile() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function dataUrlToFile(dataUrl, fileName) {
    const binary = atob(dataUrl.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], fileName, { type: 'image/png' });
}

const WishCardResultPage = ({ setNextPage }) => {
    const [wishData, setWishData] = useState({});
    const contentBoxRef = useRef(null);
    const imageRef = useRef(null);
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

            // Nếu là di động và hỗ trợ chia sẻ
            if (isMobile() && navigator.share) {
                imageRef.current.src = dataURL;
                imageRef.current.classList.remove('hidden');
                contentBoxRef.current.classList.add('hidden');

                const file = dataUrlToFile(dataURL, "fpt_20-11.png");
                await navigator.share({ files: [file], title: "FPTU 20-11" });
            } else {
                // Tải xuống cho người dùng trên máy tính
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'fpt_20-11.png';
                a.click();
            }
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    const handleShare = async () => {
        trackingUserShare();
        await exportImage();

        try {
            await postWishData({
                image: imageRef.current.src,
                name: wishData.name || '',
                schoolName: wishData.schoolName || '',
                userInput: wishData.userInput || '',
            });
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
                    <p className="text-black font-medium text-xl w-full md:max-w-[80%] text-center mx-auto py-4 md:py-8 font-inter">
                        <span>Bạn đã gửi lời chúc thành công</span>
                        <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
                    </p>
                    <img ref={imageRef} className='hidden w-full aspect-video rounded-md bg-contain bg-wish_card bg-center' alt='final-image' />
                    <ContentBox ref={contentBoxRef} className='bg-wish_card bg-center'>
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
