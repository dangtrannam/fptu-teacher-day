import CircularProgress from "../components/circular-progress.jsx";

// eslint-disable-next-line react/prop-types
const IntroductionPage = ({ currentPage, setNextPage }) => {
    return (
        <div style={{
            boxShadow: '0px -6px 30px rgba(0, 0, 0, 0.1)',
            zIndex: -2
        }}>
            <div className="flex flex-col justify-center items-center">
                <img src={''} alt={'fptu-logo'} className={'w-44 md:w-50 mb-20'} />
                <CircularProgress currentPage={currentPage} setNextPage={setNextPage} />
                <div className={`mt-20 h-20 opacity-0`}></div>
            </div>
        </div>
    );
};

export default IntroductionPage;
