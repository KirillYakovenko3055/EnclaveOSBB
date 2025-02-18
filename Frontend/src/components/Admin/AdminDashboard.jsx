import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboardStyles.css';


const AdminDashboard = () => {
    const navigate = useNavigate();

    // Обработчики кликов для кнопок
    const handleAddOSBBClick = () => {
        navigate('/admin/add-OSBB-data');
    };

    const handleOSBBListClick = () => {
        navigate('/admin/OSBB-list');
    };

    return (
        <div className="mx-auto flex flex-col items-center justify-center min-h-screen p-6 background">
            <div className="w-full max-w-md p-6 rounded-lg text-center">
                <button 
                    onClick={handleAddOSBBClick}
                    className="w-full py-4 mb-4 bg-[#544C76] text-white text-lg font-bold rounded-full shadow-lg "
                >
                    ДОДАТИ ОСББ
                </button>
                
                <button 
                    onClick={handleOSBBListClick}
                    className="w-full py-4 bg-[#544C76] text-white text-lg font-bold rounded-full shadow-lg"
                >
                    ОСББ
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
