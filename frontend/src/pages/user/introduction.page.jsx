import Header from "../../components/layout/Header";

const IntroductionPage = ({ setNextPage }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* Main Content Section */}
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full">
                    <div className="w-full">
                        <img src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg" alt="Placeholder" className="w-full h-auto" />
                    </div>
                    <p className="text-center text-gray-700">
                        Lorem ipsum dolor sit amet consectetur. Lobortis sit mauris vestibulum justo interdum.
                    </p>
                    <button
                        className="px-8 py-2 bg-blue-500 text-white rounded-full"
                        onClick={setNextPage}
                    >
                        BUTTON
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntroductionPage;
