import { Link } from "react-router-dom";

const IntroductionPage = ({ setNextPage }) => {
    return (
        <div>
            <div className="bg-gray-400 w-full md:min-h-[14vh]">
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
            <div>
                {/* Main Content Section */}
                <div className="flex flex-col items-center justify-center px-4 py-8 space-y-6">
                    <div className="w-full max-w-md">
                        <img src="https://via.placeholder.com/400x240" alt="Placeholder" className="w-full h-auto" />
                    </div>
                    <p className="text-center max-w-md text-gray-700">
                        Lorem ipsum dolor sit amet consectetur. Lobortis sit mauris vestibulum justo interdum.
                    </p>
                    <button
                        className="px-8 py-2 bg-gray-500 text-white rounded-full"
                        onClick={setNextPage}  // This will trigger setNextPage when clicked
                    >
                        BUTTON
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntroductionPage;
