import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import gsap from 'gsap';
import Hammer from 'hammerjs';
import FontFaceObserver from 'fontfaceobserver';
import Header from '../components/layout/Header';

const regexI = /[IÌÍĨỊỈiìíĩịỉ\u0049\u0069\u00CC\u00CD\u0128\u1EC8\u1EC9\u1EC4\u1EC5\u1ECA\u1ECB]/gu;

const testIRegex = (text) => {
    return regexI.test(text);
}

const FRAME_SIZE = 25.3125 * 15; // 17.5rem
const USER_WIDTH = 25.3125 * 15; // 17.5rem

const transitionClasses = 'transition ease-in-out duration-300'
const background = '#262625';
const DEFAULT_TEXT = 'NGÀN TRẢI NGHIỆM,VẠN'

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

async function shareImage(files) {
    try {
        await navigator.share({
            files: files,
            title: "FPTU Tuổi 18",
            text: ""
        });
        console.log("Successfully shared");
    } catch (error) {
        console.log("Error sharing:", error);
    }
}

const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};

// eslint-disable-next-line react/prop-types
const AvatarCreatorPage = ({ currentPage }) => {
    const hammerRef = useRef(null);
    const boxRef = useRef(null);
    const userImageRef = useRef(null);
    const counterRef = useRef();
    const unFinishSection1Ref = useRef();
    const unFinishSection2Ref = useRef();
    const unFinishSection3Ref = useRef();
    const finishSectionRef = useRef();
    const [isFinish, setIsFinish] = useState(false);
    const [textColor, setTextColor] = useState('white');
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [userImageSrc, setUserImageSrc] = useState(null);
    const [text, setText] = useState(`${DEFAULT_TEXT} KHÁT KHAO`);
    const [canvas, setCanvas] = useState(null);

    const handleTextColorChange = (color) => {
        setTextColor(color);
    };

    useEffect(() => {
        const initCanvas = new fabric.Canvas(canvasRef.current, {
            width: FRAME_SIZE,
            height: FRAME_SIZE,
            // centeredScaling: true,
            preserveObjectStacking: true,
            backgroundColor: background,
        });

        setCanvas(initCanvas);

        const loadFrameImage = async () => {
            const frameImage = await new Promise((resolve) => {
                fabric.Image.fromURL(frameWhite, (img) => {
                    img.scaleToWidth(FRAME_SIZE);
                    img.scaleToHeight(FRAME_SIZE);
                    img.set({
                        selectable: false,
                        evented: false,
                        name: 'frame',
                    });
                    resolve(img);
                });
            });

            initCanvas.add(frameImage);
            initCanvas.sendToBack(frameImage);
            initCanvas.renderAll();
        };

        loadFrameImage();

        // Cleanup function
        return () => {
            if (initCanvas) {
                initCanvas.getObjects()?.forEach(obj => {
                    initCanvas.remove(obj);
                    obj.dispose();
                });
                initCanvas.dispose(); // Dispose of the Fabric.js canvas
            }
        };
    }, []);

    useEffect(() => {
        if (!canvas) return;

        const userImage = async () => {
            if (userImageRef.current) {
                canvas.remove(userImageRef.current);
                userImageRef.current = null;
            }
            if (userImageSrc) {
                const img = await new Promise((resolve) => {
                    fabric.Image.fromURL(userImageSrc, (img) => {
                        img.scale(FRAME_SIZE / img.width);
                        img.set({
                            left: 0,
                            bottom: 0,
                            lockRotation: true,
                            hasControls: !isMobile(),
                            hasBorders: false, // Ensure no borders on user image
                            shadow: 'rgba(0,0,0,0.6) 5px 5px 5px',
                            name: 'userImage',
                            lockScalingFlip: true,
                            lockSkewingX: true,
                            lockSkewingY: true,
                        });
                        resolve(img);
                    });
                });

                // Add scaling event listener to enforce uniform scaling
                img.on('scaling', function (event) {
                    const { transform } = event;
                    if (transform) {
                        const target = transform.target;
                        const scale = Math.max(target.scaleX, target.scaleY);
                        target.scaleX = scale;
                        target.scaleY = scale;
                    }
                });

                userImageRef.current = img;
                canvas.add(img);

                // Đảm bảo hình ảnh người dùng nằm dưới frame
                const frameImage = canvas.getObjects().find(obj => obj.name === 'frame');
                if (frameImage) {
                    canvas.sendToBack(img);
                    canvas.bringToFront(frameImage);
                }

                // Bring text objects to front
                canvas.getObjects("text").forEach(obj => canvas.bringToFront(obj));
                canvas.renderAll();
            }
        };

        userImage();
    }, [userImageSrc, canvas]);

    useEffect(() => {
        if (!hammerRef.current && canvas && isMobile()) {
            const canvasElement = canvas.upperCanvasEl;
            const mc = new Hammer.Manager(canvasElement);

            const pinch = new Hammer.Pinch();
            const pan = new Hammer.Pan();

            pinch.recognizeWith(pan);

            mc.add([pinch, pan]);

            let initialScale = 1;
            let initialDeltaX = 0;
            let initialDeltaY = 0;

            mc.on('pinchstart', () => {
                if (userImageRef.current) {
                    initialScale = userImageRef.current.scaleX;
                }
            });

            mc.on('pinchmove', (e) => {
                if (userImageRef.current) {
                    userImageRef.current.scale(initialScale * e.scale);
                    canvas.renderAll();
                }
            });

            mc.on('panstart', () => {
                if (userImageRef.current) {
                    initialDeltaX = userImageRef.current.left;
                    initialDeltaY = userImageRef.current.top;
                }
            });

            mc.on('panmove', (e) => {
                if (userImageRef.current) {
                    userImageRef.current.set({
                        left: initialDeltaX + e.deltaX,
                        top: initialDeltaY + e.deltaY,
                    });
                    canvas.renderAll();
                }
            });

            hammerRef.current = mc;
            console.log(hammerRef.current)
        }

        return () => {
            if (hammerRef.current) {
                hammerRef.current.destroy();
                hammerRef.current = null;
            }
        };
    }, [canvas, userImageSrc]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setUserImageSrc(URL.createObjectURL(file));
    };
    const renderTextOnCanvas = () => {
        if (!canvas) return;

        const font = new FontFaceObserver('Montserrat ExtraBold');

        font.load().then(() => {
            canvas.getObjects("text").forEach((obj) => canvas.remove(obj));

            const radius = USER_WIDTH / 2 * 0.73;
            const maximumTextLength = 40;
            const baseAngleStep = Math.PI / maximumTextLength;

            const userInputStartIndex = DEFAULT_TEXT.length;

            let extraAngleAdjustment = 0;
            const angleAdjustmentForI = 100;
            const angleAdjustmentForSpace = 100;

            for (let i = 0; i < text.length; i++) {
                let angleStep = baseAngleStep;

                const isICharacter = testIRegex(text[i]);
                if (text[i] === ' ') {
                    console.debug('angleStep of space: ', baseAngleStep);
                    angleStep -= (baseAngleStep / angleAdjustmentForSpace);
                } else if (isICharacter) {
                    console.debug('angleStep of I: ', baseAngleStep);
                    angleStep -= (baseAngleStep / angleAdjustmentForI);
                }

                const angle = (i * angleStep) + extraAngleAdjustment - Math.PI;
                const baseX = canvas.width / 2 + radius * Math.cos(angle);
                const baseY = canvas.height / 2 + radius * Math.sin(angle);

                if (text[i] === ' ') {
                    console.debug('extraAngleAdjustment of space: ', baseAngleStep);
                    extraAngleAdjustment -= (baseAngleStep / 3);
                } else if (isICharacter) {
                    console.debug('extraAngleAdjustment of I: ', baseAngleStep);
                    extraAngleAdjustment -= (baseAngleStep / 2);
                }

                const isColoredText = i >= userInputStartIndex;

                const textObj = new fabric.Text(text[i], {
                    left: baseX,
                    top: baseY,
                    fontSize: 11,
                    fontFamily: "Montserrat ExtraBold",
                    fontWeight: 600,
                    fill: isColoredText ? "#F15A25" : textColor,
                    originX: "center",
                    originY: "center",
                    angle: (angle * 180) / Math.PI + 90,
                    selectable: false,
                    shadow: new fabric.Shadow({
                        offsetX: 0.6,
                        offsetY: 0.1,
                        blur: 0.5,
                        opacity: 0.05,
                        color: 'rgb(97, 97, 97)',
                    })
                });

                canvas.add(textObj);
                canvas.bringToFront(textObj);
            }

            canvas.renderAll();
        }).catch(() => {
            console.error('Montserrat ExtraBold font is not available.');
        });
    };


    const handleTextChange = debounce((e) => {
        const newText = e.target.value.toUpperCase(); // Convert input to uppercase
        if (!newText) {
            setText(DEFAULT_TEXT + " KHÁT KHAO");
        } else {
            setText(DEFAULT_TEXT + " " + newText);
        }
        renderTextOnCanvas(); // Update canvas immediately on text change
    }, 200); // 300ms debounce delay

    const exportImage = () => {
        // Save the original canvas dimensions
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;

        // Calculate the scale factor
        let scaleFactor;
        if (isMobile()) {
            scaleFactor = Math.max(2048 / originalWidth, 2048 / originalHeight);
        } else {
            scaleFactor = Math.max(1080 / originalWidth, 1080 / originalHeight);
        }

        // Use requestAnimationFrame for smooth rendering
        requestAnimationFrame(() => {
            // Export the canvas to a data URL with increased size using multiplier
            const dataURL = canvas.toDataURL({
                format: "png",
                quality: 1.0, // Maximum quality
                multiplier: scaleFactor // Adjust the resolution without resizing the canvas
            });

            // Convert data URL to file
            const file = dataUrlToFile(dataURL, "fptu-tuoi18.png");
            const files = convertToFileList(file);

            if (isShareable() && isMobile() && files.length > 0) {
                shareImage(files);
            } else {
                // Create a link to download the image if sharing is not supported
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "fptu-tuoi18.png";
                link.click();
            }

            // No need to resize and reset the canvas since we didn't change its dimensions
        });
    };

    const toggleIsFinishing = () => {
        if (!isFinish) {
            setTimeout(() => {
                if (hammerRef.current) {
                    hammerRef.current.destroy();
                    hammerRef.current = null;
                }

                imageRef.current.src = canvas.toDataURL();
                imageRef.current['classList'].remove('hidden');
                if (canvasRef.current) {
                    // Convert the canvas to a data URL with PNG format for high quality
                    const dataURL = canvasRef.current.toDataURL("image/png");

                    // Set the src of the image element to the data URL
                    imageRef.current.src = dataURL;

                    // Remove 'hidden' class from the image to display it
                    imageRef.current.classList.remove('hidden');

                    // Add 'hidden' class to the canvas to hide it
                    canvasRef.current.classList.add('hidden');

                    // Also hide the container of the canvas if needed
                    document.getElementsByClassName('canvas-container')[0].classList.add('hidden');
                } else {
                    imageRef.current['classList'].add('hidden');
                    canvasRef.current['classList'].remove('hidden');
                    document.getElementsByClassName('canvas-container')[0].classList.remove('hidden');
                }
                setIsFinish(true);
                gsap.fromTo(boxRef.current,
                    {
                        y: "0%",
                    },
                    {
                        y: "10%",
                        duration: 1,
                        ease: "power2.out",
                    });
                gsap.fromTo(counterRef.current,
                    {
                        y: "-100%",
                    },
                    {
                        y: "0%",
                        duration: 1,
                        ease: "power2.out",
                    });
                setTimeout(() => {
                    unFinishSection1Ref.current['classList'].add('hidden');
                    unFinishSection2Ref.current['classList'].add('hidden');
                    unFinishSection3Ref.current['classList'].add('hidden');
                    finishSectionRef.current['classList'].remove('hidden');
                }, 1000);
            }, 210)
        } else {
            imageRef.current['classList'].add('hidden');
            canvasRef.current['classList'].remove('hidden');
            document.getElementsByClassName('canvas-container')[0].classList.remove('hidden');

            setUserImageSrc(null);
            const userImage = canvas.getObjects().find(obj => obj.name === "userImage");
            canvas.remove(userImage);
            unFinishSection1Ref.current['classList'].remove('hidden');
            unFinishSection2Ref.current['classList'].remove('hidden');
            unFinishSection3Ref.current['classList'].remove('hidden');
            setIsFinish(false);

            gsap.fromTo(boxRef.current,
                {
                    y: "10%",
                },
                {
                    y: "0%",
                    duration: 2,
                    ease: "power2.out",
                });
            gsap.fromTo(counterRef.current,
                {
                    y: "0%",
                },
                {
                    y: "100%",
                    duration: 1,
                    ease: "power2.out",
                });

        }

    }
    useEffect(() => {
        renderTextOnCanvas();
    }, [text, textColor, canvas]);

    useEffect(() => {
        if (currentPage === 3) {
            gsap.fromTo(boxRef.current,
                { y: "100%" },
                {
                    y: "0%",
                    duration: 2,
                    ease: "power2.out"
                }
            );
        }
    }, [currentPage]);

    return (
        <>
            <Header />
            <div className='relative h-screen'>
                <div className={`absolute bottom-0 left-0 right-0 top-[35%] sm:top-[40%] md:top-[35%] bg-white z-50 h-[70%] h-auto rounded-t-3xl`}
                    ref={boxRef}>
                    <div className={`${isFinish ? '-top-[200px]' : '-top-[240px]'} absolute left-1/2 -translate-x-1/2`}>

                        <div className="relative z-20 flex flex-col items-center justify-center gap-4">
                            <p className={`text-orange-500 text-[18px]  font-montserrat-bold  ${isFinish ? 'hidden' : 'relative top-0'}`}>Bước 1</p>
                            <div className={`relative min-h-[17.5rem] min-w-[17.5rem] md:min-h-[20rem] md:min-w-[20rem] ${transitionClasses}`} style={{
                                borderRadius: '10px',
                                boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.8)',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(2px)',
                                padding: '25px',
                            }}>
                                <img ref={imageRef} className='hidden w-[17.5rem] h-[17.5rem]' alt={'final-image'} />
                                <canvas ref={canvasRef} className={`absolute z-50 font-montserrat-extrabold`} id='myCanvas' />
                            </div>

                            <div ref={finishSectionRef} className={`flex flex-col items-center relative hidden md:mt-4 mt-10 ${transitionClasses} ${isFinish ? 'opacity-100' : 'opacity-0'}`}>
                                <button onClick={exportImage} className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white md:text-lg rounded-full w-60 font-montserrat-extrabold font-extrabold">
                                    XUẤT ẢNH
                                </button>

                                <button onClick={toggleIsFinishing}
                                    className="px-8 py-3 mt-3 bg-white-500 border-orange-600 border md:text-lg text-orange-600 rounded-full w-56 hover:bg-orange-600 hover:text-white font-montserrat-extrabold">
                                    TẠO ẢNH KHÁC
                                </button>
                            </div>

                            {/* <div ref={unFinishSection1Ref} className={`relative bg-white shadow-lg rounded-full border border-gray-300 p-2 ${transitionClasses} ${isFinish ? 'opacity-0' : 'opacity-100'}`}>
                                <button
                                    onClick={() => handleTextColorChange('white')}
                                    className={`px-4 py-2 mx-2 ${textColor === 'white' ? 'bg-gray-300 font-semibold border border-gray-300' : 'bg-gray-100 border border-transparent'} rounded-full shadow transition duration-300 md:text-lg font-montserrat-semibold`}
                                    style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}
                                >
                                    Trắng
                                </button>
                                <button
                                    onClick={() => handleTextColorChange('#111111')}
                                    className={`px-4 py-2 mx-2 ${textColor === '#111111' ? 'bg-gray-300 font-semibold border border-gray-300' : 'bg-gray-100 border border-transparent'} rounded-full shadow transition duration-300 md:text-lg font-montserrat-semibold`}
                                    style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}
                                >
                                    Đen
                                </button>
                            </div> */}


                            <div ref={unFinishSection2Ref} className={`text-left relative mt-4 ${transitionClasses} ${isFinish ? 'opacity-0' : 'opacity-100'}`}>
                                {/* <h1 className="w-auto mb-2 h-auto font-montserrat-extrabold font-[900] text-3xl sm:text-4xl lg:text-5xl text-[#7A7A7A] leading-6">Ngàn
                                    trải nghiệm</h1>
                                <div className='flex'>
                                    <h1 className={`w-auto h-auto font-montserrat-extrabold font-extrabold text-3xl sm:text-4xl lg:text-5xl ${textColor === 'orange' ? 'text-[#F15A25]' : 'text-[#7A7A7A]'} text-start`}>Vạn</h1>
                                    <input
                                        type="text"
                                        placeholder="Nhập tại đây... (tối đa 20 ký tự)"
                                        maxLength="20"
                                        onChange={handleTextChange}
                                        className="md:ml-3 ml-2 rounded w-full font-montserrat md:w-full italic border-b-2 border-[#7A7A7A] text-center text-xs md:text-lg focus:outline-none mb-2"
                                        style={{
                                            fontFamily: 'Montserrat',
                                        }}
                                    />
                                </div> */}
                                {/* Form Section for Tablet & Mobile */}
                                <div className="flex flex-col items-center justify-center px-4 space-y-4 mx-auto">
                                    <span className="text-lg font-montserrat-extrabold text-orange-500">Bước 2</span>
                                    <input type="text" placeholder="Họ Tên" className="w-auto px-4 py-2 border border-gray-300 rounded bg-gray-400  text-black placeholder:text-black" />
                                    <input type="text" placeholder="Trường" className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-400  text-black placeholder:text-black" />
                                    <input type="text" placeholder="Lời cảm ơn" className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-400 text-black placeholder:text-black" />
                                </div>
                            </div>

                            <div ref={unFinishSection3Ref} className={`flex flex-col items-center relative ${transitionClasses} ${isFinish ? 'opacity-0' : 'opacity-100'}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    id="avatarUpload"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="avatarUpload"
                                    className="px-8 w-auto py-3 mb-2 text-white bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-700 hover:to-gray-500 font-montserrat-extrabold md:text-xl rounded-full md:w-72 text-center cursor-pointer">
                                    THÊM ẢNH CÁ NHÂN
                                </label>
                                <button onClick={toggleIsFinishing}
                                    className="px-8 py-3 text-white bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-700 hover:to-gray-500 font-montserrat-extrabold font-extrabold md:text-lg rounded-full w-60 md:w-72">
                                    HOÀN TẤT
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AvatarCreatorPage;