import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getAllTrackingAccess, getAllTrackingShare } from '../../../service/tracking.service';

const useTrackingData = () => {
    const [trackingData, setTrackingData] = useState({ today: 0, yesterday: 0, total: 0 });
    const [shareData, setShareData] = useState({ today: 0, yesterday: 0, total: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs();
            const yesterday = today.subtract(1, 'day');

            try {
                const accessData = await getAllTrackingAccess();
                const totalAccessCount = accessData.length;

                const todayAccessCount = accessData.filter(item =>
                    dayjs(item.timestamp).isSame(today, 'day')
                ).length;

                const yesterdayAccessCount = accessData.filter(item =>
                    dayjs(item.timestamp).isSame(yesterday, 'day')
                ).length;

                setTrackingData({
                    today: todayAccessCount,
                    yesterday: yesterdayAccessCount,
                    total: totalAccessCount,
                });

                const shareData = await getAllTrackingShare();
                const totalShareCount = shareData.length;

                const todayShareCount = shareData.filter(item =>
                    dayjs(item.timestamp).isSame(today, 'day')
                ).length;

                const yesterdayShareCount = shareData.filter(item =>
                    dayjs(item.timestamp).isSame(yesterday, 'day')
                ).length;

                setShareData({
                    today: todayShareCount,
                    yesterday: yesterdayShareCount,
                    total: totalShareCount,
                });
            } catch (error) {
                console.error('Error fetching tracking data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateGrowth = (today, yesterday) => {
        if (yesterday === 0) return today > 0 ? 100 : 0;
        return ((today - yesterday) / yesterday) * 100;
    };

    return {
        trackingData,
        shareData,
        accessGrowth: calculateGrowth(trackingData.today, trackingData.yesterday),
        shareGrowth: calculateGrowth(shareData.today, shareData.yesterday),
    };
};

export default useTrackingData;
