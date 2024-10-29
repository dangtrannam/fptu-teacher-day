import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-white bg-opacity-15 md:min-h-[12vh]">
            <div className="flex justify-between items-center py-3 gap-4 w-auto max-w-screen-xl mx-auto">
                <Link
                    to="#"
                    target="_blank"
                >
                    <img
                        src="/assets/logo/logo-coc-doc.png"
                        alt="fptu-logo"
                    />
                </Link>
                <Link
                    to="https://university.fpt.edu.vn/fptu-tuoi-18/"
                    target="_blank"
                >
                    <img
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