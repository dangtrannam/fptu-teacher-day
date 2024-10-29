import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-white bg-opacity-10 w-screen-xl md:min-h-[14vh]">
            <div className="flex justify-between items-center py-4 px-6 gap-4 w-auto max-w-screen-xl mx-auto">
                <Link
                    to="#"
                    target="_blank"
                >
                    <img
                        // src="https://via.placeholder.com/240x76"
                        src="/assets/logo/logo-coc-doc.png"
                        alt="fptu-logo"
                    />
                </Link>
                <Link
                    to="https://university.fpt.edu.vn/fptu-tuoi-18/"
                    target="_blank"
                >
                    <img
                        // src="https://via.placeholder.com/240x76"
                        src="/assets/logo/logo-thankyou.png"
                        alt="Logo FTPU"
                        className="w-full h-full"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Header;