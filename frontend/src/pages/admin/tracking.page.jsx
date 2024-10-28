import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar';
import TrackingComponent from '../../components/tracking/tracking.component';

const TrackingPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <Sidebar onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <TrackingComponent />
            </div>
        </div>
    );
}

export default TrackingPage
