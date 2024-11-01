import { useEffect, useState, useRef } from 'react';
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
    const [imageUrl, setImageUrl] = useState(null);
    const contentBoxRef = useRef(null);
    const userWishData = getLocalStorageData();

    useEffect(() => {
        if (userWishData) {
            setWishData(JSON.parse(userWishData));
        }
    }, [userWishData]);
    // Function to generate the image and save URL in state
    const exportImage = async () => {
        if (!contentBoxRef.current) return;

        try {
            const dataURL = await toPng(contentBoxRef.current, {
                backgroundColor: '#fbcab0',
                quality: 1.0,
                height: contentBoxRef.current.scrollHeight,
                width: contentBoxRef.current.offsetWidth,
            });
            setImageUrl(dataURL);  // Save the generated image URL to state
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    useEffect(() => {
        if (Object.keys(wishData).length > 0) {
            setImageUrl(null); // Clear previous image
            const timeoutId = setTimeout(() => {
                exportImage(); // Generate image after a slight delay
            }, 100); // Delay to ensure rendering

            return () => clearTimeout(timeoutId); // Cleanup on unmount
        }
    }, [wishData]);

    const handleShare = async () => {
        trackingUserShare();

        if (isMobile() && navigator.share && imageUrl) {
            try {
                const file = dataUrlToFile(imageUrl, "fpt_20-11.png");
                await navigator.share({ files: [file], title: "FPTU 20-11" });
            } catch (error) {
                console.error('Error sharing image:', error);
            }
        } else if (imageUrl) {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = 'fpt_20-11.png';
            a.click();
        }

        try {
            // conver dataURL to Blob
            const blob = await fetch(imageUrl).then(res => res.blob());

            // create new File object
            const file = new File([blob], 'fpt_20-11.png', { type: 'image/png' });

            await postWishData({
                image: file,
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
                    <p className="flex flex-col text-black font-medium text-xs md:text-xl w-full md:max-w-[80%] text-center mx-auto py-4 md:pt-10 md:pb-6 font-inter">
                        <span>Bạn đã gửi lời chúc thành công</span>
                        <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
                    </p>
                    {/* Show generated image instead of ContentBox */}
                    {imageUrl ? (
                        <img src={imageUrl} className='w-full rounded-md bg-wish_card bg-center bg-cover' alt='Generated wish card' />
                    ) : (
                        <ContentBox ref={contentBoxRef} className='bg-wish_card bg-center bg-cover bg-no-repeat md:h-96 h-48'>
                            <span className="md:max-w-[80%] max-w-56 text-center text-xs md:text-xl font-normal text-black font-inter">
                                {wishData.userInput || 'Bạn chưa nhập lời chúc'}
                                {/* Lorem ipsum dolor sit amet consectetur. Vels mi id est tincidunt ac auctor sagittis metus. At risus interdum venenatis fringilla feugiat diam. */}
                            </span>
                        </ContentBox>
                    )}
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
