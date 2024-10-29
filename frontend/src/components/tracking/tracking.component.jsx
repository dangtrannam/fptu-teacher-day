import React, { useState, useEffect } from 'react';
import { getAllTracking } from '../../service/tracking.service';
import dayjs from 'dayjs';

const TrackingComponent = () => {
    const [trackingData, setTrackingData] = useState([]);
    const [todayCount, setTodayCount] = useState(0);
    const [yesterdayCount, setYesterdayCount] = useState(0);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const data = await getAllTracking();
                setTrackingData(Array.isArray(data) ? data : []);

                const today = dayjs();
                const yesterday = today.subtract(1, 'day');

                // filter access today
                const todayData = data.filter(item =>
                    dayjs(item.timestamp).isSame(today, 'day')
                );

                // Filter access yesterday
                const yesterdayData = data.filter(item =>
                    dayjs(item.timestamp).isSame(yesterday, 'day')
                );

                setTodayCount(todayData.length);
                setYesterdayCount(yesterdayData.length);
            } catch (error) {
                console.error('Error fetching tracking data:', error);
                setTrackingData([]);
            }
        };

        fetchTrackingData();
    }, []);

    // Calculate total access count
    const totalAccessCount = trackingData.length;

    // Calculate comparison with yesterday
    const comparisonWithYesterday = yesterdayCount > 0
        ? ((todayCount - yesterdayCount) / yesterdayCount) * 100
        : todayCount > 0 ? 100 : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 justify-items-center">
            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">Total Truy Cập</h2>
                <p className="text-3xl font-semibold text-blue-500">{totalAccessCount}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">Truy Cập Hôm Nay</h2>
                <p className="text-3xl font-semibold text-green-500">{todayCount}</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg text-center w-full">
                <h2 className="text-xl font-bold mb-2">So Sánh Với Hôm Qua</h2>
                <p className={`text-3xl font-semibold ${comparisonWithYesterday >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {comparisonWithYesterday.toFixed(2)}%
                </p>
            </div>
        </div>


    );
};

export default TrackingComponent;
