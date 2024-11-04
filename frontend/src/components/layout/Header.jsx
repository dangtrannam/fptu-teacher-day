import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="absolute top-0 left-0 right-0 
        
         md:min-h-[100px] px-4">
            <div className="flex justify-between items-center py-3 gap-4 w-auto max-w-screen-xl mx-auto">
                <Link
                    to="#"
                    target="_blank"
                >
                    <img
                        src="/assets/logo/logo-coc-doc.png"
                        alt="fptu-logo"
                        className="w-24 md:w-32 lg:w-40 h-auto"
                    />
                </Link>
                <Link
                    to="https://university.fpt.edu.vn/fptu-tuoi-18/"
                    target="_blank"
                >
                    <img
                        src="/assets/logo/logo-thankyou.png"
                        alt="Logo FTPU"
                        className="w-24 md:w-32 lg:w-40 h-auto"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Header;
