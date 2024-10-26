import Header from "../components/layout/Header";

const IntroductionPage = ({ setNextPage }) => {
    return (
        <div>
            <Header />
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
