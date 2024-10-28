// import logo from "@assets/hello-page/logo.png";
// import fptLogo from '@assets/logo-colored.png';
// import VideoBackground from "./components/video-background/video-background.jsx";
// import { onlineBgWhiteVideoSrc } from "../constants/index.js";

// eslint-disable-next-line react/prop-types
const HelloPage = ({ setNextPage }) => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-white"
        // localSrc={"new/white-background"}
        // onlineSrc={onlineBgWhiteVideoSrc}
        >
            <div className="flex flex-col justify-center items-center">
                {/* <img
                    // src={fptLogo}
                    alt={'fptu-logo'}
                    className={'w-44 md:w-50 mb-20'}
                />
                <img
                    src={''}
                    className="w-80 h-80" alt={'logo'} /> */}
                <button
                    onClick={setNextPage}
                    className="w-60 md:w-64 h-20 border rounded-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 px-12"
                >
                    <span className="text-white text-center md:text-xl font-montserrat font-bold">
                        Gửi lời chúc
                    </span>
                </button>
            </div>
        </div>
    );
};

export default HelloPage;
