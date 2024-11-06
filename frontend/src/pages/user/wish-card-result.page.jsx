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
        try {
            console.log("Starting canvas generation...");

            // Set higher DPI
            // const PIXEL_RATIO = window.devicePixelRatio || 2;
            // ? Set these 2 values to match the scale size on both mobile and desktop
            const PIXEL_RATIO = 3;
            const offsetWidth = 350;

            // Create initial canvas with temporary size
            const canvas = new fabric.Canvas(document.createElement('canvas'), {
                width: 1600,  // increased base width
                height: 1200, // increased base height
                enableRetinaScaling: true, // enable high DPI rendering
            });

            // Load background image first
            const bgImg = await new Promise((resolve) => {
                fabric.Image.fromURL('/assets/images/wish_card_bg_x3.png', (img) => {
                    // Scale image accounting for pixel ratio
                    const scale = (offsetWidth * PIXEL_RATIO) / img.width;
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
            const shareText = `Cùng chia sẻ thông điệp yêu thương đến thầy cô FPT nhé!` + "\n" + `#FPTU20_11`;

            // Add text with adjusted font size and line wrapping
            const userInput = new fabric.Textbox(userWishData?.userInput || 'Bạn chưa nhập lời chúc', {
                left: canvas.width / 2,
                top: canvas.height / 3,
                fontSize: 12 * PIXEL_RATIO,
                fontFamily: 'Inter',
                fill: '#000000',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                width: canvas.width * 0.9,
                lineHeight: 1.5,
                breakWords: true,
                wordWrap: true,
                padding: 12 * PIXEL_RATIO,
                fontWeight: 400, // font-normal
            });

            // Add user name below the text at the bottom right
            const ADJUST_HEIGHT_RATIO = userWishData?.userInput.length > 105 ? 2 : 1.5;
            const nameText = new fabric.Text(userWishData?.name || '', {
                left: canvas.width / 1.5,
                top: userInput.top + userInput.height / ADJUST_HEIGHT_RATIO,
                fontSize: 12 * PIXEL_RATIO,
                fontFamily: 'Inter',
                fill: '#000000',
                textAlign: 'center',
                originX: 'center',
                originY: 'top',
                fontStyle: 'italic',
                fontWeight: 400, // font-normal
            });

            canvas.add(nameText);

            canvas.add(userInput);
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
                await navigator.share({
                    files,
                    title: "FPTU 20-11",
                    text: shareText,
                });
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
        <div className="relative w-screen min-h-screen overflow-hidden">
            <Background />
            <Header />
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="absolute left-1/2 w-full -translate-x-1/2 top-[12vh] flex flex-col items-center px-2 md:px-4">
                <div className='w-full sm:max-w-[49rem] bg-pink rounded-lg px-4 sm:px-16 pb-8 sm:pb-[50px] mx-auto z-20'>
                    <p className="flex flex-col font-medium text-xs md:text-xl w-full text-center mx-auto py-4 md:pt-10 md:pb-6 font-inter">
                        <span>Bạn đã gửi lời chúc thành công</span>
                        <span>Cùng <strong className='italic'>{userWishData?.name}</strong> chia sẻ thông điệp cảm ơn thầy cô nhé!</span>
                    </p>
                    {/* Show generated image instead of ContentBox */}
                    <div id='content-box' className='md:h-96 h-48 w-full aspect-video rounded-md bg-wish_card bg-center bg-cover bg-no-repeat'>
                        <div className=' mx-auto px-12 md:px-20 md:pt-4 pt-3 text-center'>
                            <span className="md:max-w-[80%] max-w-56 text-center text-xs md:text-xl font-normal font-inter">
                                {userWishData?.userInput || 'Bạn chưa nhập lời chúc'}
                            </span>
                            <div className="md:max-w-[80%] max-w-56 text-right text-xs md:text-xl font-normal font-inter mt-3">
                                <span className='italic'>{userWishData?.name || ''}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-[49rem] mt-4 z-20">
                    <Button
                        variant="opacity"
                        label="Gửi lời chúc khác"
                        size="medium"
                        onClick={handleAddOtherWish}
                        className="w-full sm:w-auto px-8"
                    />
                    <Button
                        variant="primary"
                        label="Chia sẻ"
                        size="medium"
                        onClick={handleShare}
                        className="w-full sm:w-auto px-8"
                    />
                </div>
            </div>
        </div>
    );
};

export default WishCardResultPage;
