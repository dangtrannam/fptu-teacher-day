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
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

function isShareable() {
    return !!navigator.share;
}

function dataUrlToFile(dataUrl, fileName) {
    const binary = atob(dataUrl.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const byteArray = new Uint8Array(array);
    return new File([byteArray], fileName, {
        type: "image/png"
    });
}

function convertToFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
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

            // Convert dataURL to Blob
            const blob = await fetch(dataURL).then(res => res.blob());
            const fileShare = dataUrlToFile(dataURL, "fpt_20-11.png");
            const files = convertToFileList(fileShare);

            if (isMobile() && isShareable()) {
                // Automatically display image for mobile users
                imageRef.current.src = dataURL;
                imageRef.current.classList.remove('hidden');
                contentBoxRef.current.classList.add('hidden');

                // Share the image after generating
                await shareImage(files);
            } else {
                // Non-mobile download functionality
                const file = new File([blob], 'fpt_20-11.png', { type: 'image/png' });
                const url = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'fpt_20-11.png';
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    const shareImage = async (files) => {
        try {
            await navigator.share({
                files: files,
                title: "FPTU 20-11",
                text: ""
            });
            console.log("Successfully shared");
        } catch (error) {
            console.log("Error sharing:", error);
        }
    };

    const handleShare = async () => {
        trackingUserShare(); // Log user share action
        await exportImage(); // Generate and potentially share the image

        // Post wish data to server
        const newWishData = {
            image: imageRef.current.src, // Use the image source for posting
            name: wishData.name || '',
            schoolName: wishData.schoolName || '',
            userInput: wishData.userInput || '',
        };

        try {
            await postWishData(newWishData);
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
                    <img
                        ref={imageRef}
                        className='hidden w-full aspect-video flex-col items-center justify-center rounded-md bg-contain bg-no-repeat bg-wish_card bg-center'
                        alt={'final-image'} />
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
