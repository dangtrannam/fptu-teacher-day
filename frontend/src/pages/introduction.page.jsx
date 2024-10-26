
const IntroductionPage = ({ setNextPage }) => {
    return (
        <div

        >
            <div className="flex flex-col justify-center items-center">
                <button
                    onClick={setNextPage}
                    className="w-60 md:w-64 h-20 border rounded-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 px-12"
                >
                    <span className="text-white text-center md:text-xl font-montserrat font-bold">
                        Update Image
                    </span>
                </button>
            </div>
        </div>
    );
};

export default IntroductionPage;
