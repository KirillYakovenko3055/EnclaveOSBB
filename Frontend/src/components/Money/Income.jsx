import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Spendings.css';

const SpendingsPage = () => {
    const [chartImage, setChartImage] = useState(null);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchChartImage = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/spendings`, {
                    labels: ['Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень'],
                    dataPoints: [0, 800, 1000, 0]
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob'
                });

                const imageUrl = URL.createObjectURL(response.data);
                setChartImage(imageUrl);
            } catch (error) {
                console.error('Ошибка получения изображения диаграммы:', error);
            }
        };

        fetchChartImage();
    }, []);

    return (
        <div style={{height:"100%"}}>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/user/finances'}>
                    Фінанси&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }}>
                    Витрати
                </Link>
            </div>
            <h1 className='text-center text-4xl' style={{ fontFamily: "Philosopher" }}>Витрати</h1>
            <div class="table-title">Ваші витрати за першу половину 2024 року</div>
            <div className="table-container">
                <div class="table-title2">Загальна сума витрат: 1800 грн </div>
                <table class="payment-table">
                    <thead>
                        <tr>
                            <th>Місяць</th>
                            <th>Дата</th>
                            <th>Сплачена сума</th>
                            <th>Послуга</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Червень</td>
                            <td>02.06.</td>
                            <td>850 грн</td>
                            <td>850 грн</td>
                            <td>Сплачено</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {chartImage ? (
                <img src={chartImage} alt="Диаграмма оплат" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
                <p>Загрузка диаграммы...</p>
            )}
        </div>
    );
};

export default SpendingsPage;
