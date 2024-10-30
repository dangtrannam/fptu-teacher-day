import React, { useEffect, useState, useRef } from 'react';
import { toPng } from 'html-to-image'; // Importing toPng from html-to-image
import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import ContentBox from '../../components/common/contentBox.component';
import Background from '../../components/common/background.component';
import { trackingUserShare } from '../../service/tracking.service';
import { postWishData } from '../../service/wish.service';

const WishCardResult = ({ setNextPage }) => {
    const [wishData, setWishData] = useState();
    const contentBoxRef = useRef(null);

    const data = localStorage.getItem('inputData');
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
                // Use scrollHeight to capture the full content
                height: contentBoxRef.current.scrollHeight,
                // Width can be set to its offsetWidth
                width: contentBoxRef.current.offsetWidth,
            });

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "wish-card.png";
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    const handleShare = () => {
        trackingUserShare(); // Track share event
        exportImage();       // Export the image for download
        // postWishData(wishData); // Save the wish data to the server
    };

    const handleAddOtherWish = () => {
        localStorage.removeItem('inputData');
        setNextPage(); // Navigate to the previous page or desired page
    };

    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <Header />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="absolute left-1/2 w-full -translate-x-1/2 top-[12vh] flex justify-center mt-6 mb-20 mx-auto flex-col items-center px-2 md:px-4">

                {/* ContentBox with ref */}
                <div className='w-full sm:max-w-[49rem] md:min-h-[32.5rem]' ref={contentBoxRef}>
                    <ContentBox>
                        <span className="max-w-[40%] text-center mx-auto text-base font-normal text-black font-inter">
                            {wishData?.userInput || 'Bạn chưa nhập lời chúc'}
                        </span>
                    </ContentBox>
                </div>

                {/* Button Container */}
                <div className="flex flex-col sm:flex-row justify-around items-center w-full max-w-[30rem] sm:max-w-[49rem] mx-auto mt-6 z-20 space-y-4 sm:space-y-0">
                    <div className="flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch">
                        <Button variant="opacity" label="Gửi lời chúc khác" size="medium" onClick={handleAddOtherWish} />
                    </div>
                    <div className="flex-1 px-2 sm:px-4 md:px-8 xl:px-12 self-stretch">
                        <Button variant="primary" label="Tải xuống" size="medium" onClick={handleShare} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishCardResult;
