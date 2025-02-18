import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const AddSaldo = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { personalAccountId } = useParams();
    const navigate = useNavigate();
    const OSBBId = localStorage.getItem('OSBBId');

    const [formData, setFormData] = useState({
        sum: '',
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Request Data:", {
            personalAccountId: personalAccountId,
            sum: formData.sum,
            date: formData.date,
            description: formData.description
        });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/addSaldo/${personalAccountId}`,
                {
                    personalAccountId: personalAccountId,
                    sum: parseFloat(formData.sum),
                    date: formData.date,
                    description: formData.description,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log('Response:', response.data);
            navigate(`/admin/personal-account/${personalAccountId}`);
        } catch (error) {
            console.error('Ошибка добавления задолженности:', error.response?.data || error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#504E76] p-6">
            <div className="p-8 rounded-lg max-w-lg w-full">
                <Typography variant="h3" className="text-center mb-8 text-white text-xl">
                    ДОДАТИ ЗАБОРГОВАНІСТЬ
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-8"> {/* Added space-y-8 for more vertical space */}
                    
                    {/* Date */}
                    <div className="mb-6"> {/* Added mb-6 for spacing */}
                        <Typography className="text-white mb-2">Дата:</Typography>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-white border-2 rounded-lg p-2 shadow-sm"
                            required
                        />
                    </div>

                    {/* Sum */}
                    <div className="mb-6"> {/* Added mb-6 for spacing */}
                        <Typography className="text-white mb-2">Сума:</Typography>
                        <Input
                            type="number"
                            name="sum"
                            value={formData.sum}
                            onChange={handleChange}
                            className="w-full bg-white border-2 rounded-lg p-2 shadow-sm"
                            placeholder="Введіть суму заборгованості"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6"> {/* Added mb-6 for spacing */}
                        <Typography className="text-white mb-2">Опис:</Typography>
                        <Input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-white border-2 rounded-lg p-2 shadow-sm"
                            placeholder="Введіть опис заборгованості"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full bg-[#C4C3E3] text-black py-3 rounded-lg text-lg">
                            НАДІСЛАТИ ЗАПИТ
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSaldo;
