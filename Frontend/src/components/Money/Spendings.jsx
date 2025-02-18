import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chart from "react-apexcharts";
import './Spendings.css';

const SpendingsPage = () => {
    const [configchart, setConfigchart] = useState(null);
    const [spendings, setSpendings] = useState([]);
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchSpendingsData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/spendings/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const spendingsData = response.data;
                setSpendings(spendingsData);

                const monthlySpendings = Array(12).fill(0);
                spendingsData.forEach(item => {
                    const month = new Date(item.date).getMonth(); 
                    if (monthlySpendings[month] === null) {
                        monthlySpendings[month] = item.sum;
                    } else {
                        monthlySpendings[month] += item.sum;
                    }
                });

                const chartConfig = {
                    type: "line",
                    height: 480,
                    series: [
                      {
                        name: "Витрати",
                        data: monthlySpendings,
                      },
                    ],
                    options: {
                      chart: {
                        toolbar: {
                          show: false,
                        },
                      },
                      title: {
                        show: false,
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      colors: ["#020617"],
                      stroke: {
                        lineCap: "round",
                        curve: "smooth",
                      },
                      markers: {
                        size: 0,
                      },
                      xaxis: {
                        categories: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                        axisTicks: {
                          show: false,
                        },
                        axisBorder: {
                          show: false,
                        },
                        labels: {
                          style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                          },
                        },
                      },
                      yaxis: {
                        labels: {
                          style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                          },
                        },
                      },
                      grid: {
                        show: true,
                        borderColor: "#dddddd",
                        strokeDashArray: 5,
                        xaxis: {
                          lines: {
                            show: true,
                          },
                        },
                        padding: {
                          top: 10,
                        },
                      },
                      fill: {
                        opacity: 0.8,
                      },
                      tooltip: {
                        theme: "dark",
                      },
                    },
                };
                setConfigchart(chartConfig);
            } catch (error) {
                console.error('Ошибка получения данных для диаграммы:', error);
            }
        };

        fetchSpendingsData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{ height: "100%" }}>
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
            <div className="table-title">Ваші витрати за 2024 рік</div>
            <div className="table-container">
                <div className="table-title2">
                    Загальна сума витрат: {spendings.reduce((sum, item) => sum + item.sum, 0)} грн
                </div>
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Категорія витрат</th>
                            <th>Дата</th>
                            <th>Сума</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spendings.map((spending, index) => (
                            <tr key={index}>
                                <td>{spending.type}</td>
                                <td>{formatDate(spending.date)}</td>
                                <td>{spending.sum} грн</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {configchart && <Chart {...configchart} />}
        </div>
    );
};

export default SpendingsPage;
