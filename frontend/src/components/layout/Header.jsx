import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-orange-400 w-full md:min-h-[14vh]">
            <div className="flex justify-between items-center py-4 px-6 gap-4 w-full max-w-screen-xl mx-auto">
                <Link
                    to="#"
                    target="_blank"
                >
                    <img
                        src="https://via.placeholder.com/240x76"
                        alt="fptu-logo"
                    />
                </Link>
                <Link
                    to="https://university.fpt.edu.vn/fptu-tuoi-18/"
                    target="_blank"
                >
                    <img
                        src="https://via.placeholder.com/240x76"
                        alt="Logo FTPU 18year"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Header
