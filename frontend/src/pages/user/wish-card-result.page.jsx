import Header from '../../components/layout/Header';
import Button from '../../components/common/button.component';
import Background from '../../components/common/background.component';
import { trackingUserShare } from '../../service/tracking.service';
import { postWishData } from '../../service/wish.service';
import { getLocalStorageData, handleRemoveLocalStorage } from '../../service/localStorageService';
// import html2canvaspro from 'html2canvas-pro';
import { fabric } from 'fabric';

function isMobile() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    const userWishData = JSON.parse(getLocalStorageData());

    const handleShare = async () => {
        if (!userWishData?.name || !userWishData?.schoolName || !userWishData?.userInput) {
            return;
        }
        
        const file = await ShareImage();
        try {
            trackingUserShare();
            await postWishData({
                image: file,
                name: userWishData?.name || '',
                schoolName: userWishData?.schoolName || '',
                userInput: userWishData?.userInput || '',
            });
        } catch (error) {
            console.error('Failed to post wish data:', error);
        }
        
    };

    async function ShareImage() {
        const contentBox = document.getElementById('content-box');
        try {
            console.log("Starting canvas generation...");
            
            // Set higher DPI
            const PIXEL_RATIO = window.devicePixelRatio || 2;
            // Create initial canvas with temporary size
            const canvas = new fabric.Canvas(document.createElement('canvas'), {
                width: 1600,  // increased base width
                height: 1200, // increased base height
                enableRetinaScaling: true, // enable high DPI rendering
            });

            // Load background image first
            const bgImg = await new Promise((resolve) => {
                fabric.Image.fromURL('/assets/images/wish_card_flower_2.png', (img) => {
                    // Scale image accounting for pixel ratio
                    const scale = (contentBox.offsetWidth * PIXEL_RATIO) / img.width;
                    img.scale(scale);
                    
                    // Resize canvas to match scaled image
                    canvas.setDimensions({
                        width: img.width * scale,
                        height: img.height * scale
                    });
    
                    img.set({
                        originX: 'center',
                        originY: 'center',
                        left: canvas.width / 2,
                        top: canvas.height / 2
                    });
                    
                    canvas.add(img);
                    resolve();
                }, { 
                    crossOrigin: 'anonymous',
                    quality: 1.0 // max quality for image loading
                });
            });

            // Add text with adjusted font size for higher resolution
            const text = new fabric.Text(userWishData?.userInput || 'Bạn chưa nhập lời chúc', {
                left: canvas.width / 2,
                top: canvas.height / 3,
                fontSize: (contentBox.offsetWidth < 768 ? 16 : 20) * PIXEL_RATIO,
                fontFamily: 'Inter',
                fill: '#000000',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                width: canvas.width * 0.8
            });
            
            canvas.add(text);
            canvas.renderAll();

            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1.0,
                multiplier: PIXEL_RATIO
            });

            const file = dataUrlToFile(dataURL, "fpt_20-11.png");
            console.log("File created:", file);
            
            const files = convertToFileList(file);
            if (isMobile() && navigator.canShare({ files }) && navigator.share) {
                console.log("Sharing...");
                await navigator.share({ files, title: "FPTU 20-11" });
            } else {
                // download file
                const a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "fpt_20-11.png";
                a.click();
            }

            return file;
        } catch (error) {
            console.error("Error during sharing flow:", error);
        }
    }

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
                    <p className="flex flex-col font-medium text-xs md:text-xl w-full md:max-w-[80%] text-center mx-auto py-4 md:pt-10 md:pb-6 font-inter">
                        <span>Bạn đã gửi lời chúc thành công</span>
                        <span>Hãy share để cùng nhau cảm ơn thầy cô nhé!</span>
                    </p>
                    {/* Show generated image instead of ContentBox */}
                    <div id='content-box' className='md:h-96 h-48 w-full aspect-video rounded-md bg-wish_card bg-center bg-cover bg-no-repeat'>
                        <div className=' mx-auto px-12 md:px-20 md:pt-20 pt-3 text-center'>
                            <span className="md:max-w-[80%] max-w-56 text-center text-xs md:text-xl font-normal font-inter">
                                {userWishData?.userInput || 'Bạn chưa nhập lời chúc'}
                            </span>
                        </div>
                    </div>
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
