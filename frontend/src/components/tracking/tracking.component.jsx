const TrackingComponent = ({ trackingData, shareData, accessGrowth, shareGrowth }) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 justify-items-center">
            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">Tổng Truy Cập</h2>
                <p className="text-3xl font-semibold text-blue-500">{trackingData.total}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">Truy Cập Hôm Nay</h2>
                <p className="text-3xl font-semibold text-green-500">{trackingData.today}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">Tăng Trưởng So Với Hôm Qua</h2>
                <p className={`text-3xl font-semibold ${accessGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {accessGrowth.toFixed(2)}%
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 justify-items-center">
            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2 uppercase">Tổng lượt chia sẻ</h2>
                <p className="text-3xl font-semibold text-blue-500">{shareData.total}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2 uppercase">Chia sẻ hôm nay</h2>
                <p className="text-3xl font-semibold text-green-500">{shareData.today}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2 uppercase">Tăng Trưởng So Với Hôm Qua</h2>
                <p className={`text-3xl font-semibold ${shareGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {shareGrowth.toFixed(2)}%
                </p>
            </div>
        </div>
    </>
);

export default TrackingComponent;
