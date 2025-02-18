import React, { useState } from 'react';
import { Input, Button, Typography, Checkbox } from "@material-tailwind/react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddResidents = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { personalAccountId } = useParams();
    const navigate = useNavigate();
    const OSBBId = localStorage.getItem('OSBBId');
    
    const [formData, setFormData] = useState({
        personId: '',
        userId: '',
        personalAccountId: personalAccountId,
        role: '', // Role
        isActive: false // Active/Inactive
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRoleChange = (role) => {
        setFormData(prevState => ({
            ...prevState,
            role: role
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/addResidents`,
                {
                    personId: formData.personId,
                    userId: formData.userId,
                    personalAccountId: formData.personalAccountId,
                    role: formData.role,
                    isActive: formData.isActive
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            navigate(`/admin`);
        } catch (error) {
            console.error('Error adding resident:', error.response?.data || error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#504E76] p-6">
            <div className="p-8 rounded-lg max-w-lg w-full">
                <Typography variant="h3" className="text-center mb-8 text-white text-xl">
                    НОВИЙ МЕШКАНЕЦЬ
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-8"> {/* Added space-y-8 for more vertical space */}
                    
                    {/* First Name */}
                    <div className="mb-6"> {/* Added mb-6 for spacing */}
                        <Input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="w-full bg-white border-2 rounded-lg p-2 shadow-sm"
                            placeholder="ID Персони"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-6"> {/* Added mb-6 for spacing */}
                        <Input
                            type="text"
                            name="personId"
                            value={formData.personId}
                            onChange={handleChange}
                            className="w-full bg-white border-2 rounded-lg p-2 shadow-sm"
                            placeholder="ID Особового рахунку (квартири)"
                            required
                        />
                    </div>


                    {/* Active / Inactive Toggle */}
                    <div className="mb-8 flex justify-center items-center space-x-4"> {/* Added mb-8 for spacing */}
                        <Button
                            variant="outlined"
                            className={`w-32 ${formData.isActive ? 'bg-white text-blue-700' : 'bg-transparent text-white'}`}
                            onClick={() => setFormData(prevState => ({ ...prevState, isActive: true }))}
                        >
                            Активний
                        </Button>
                        <Button
                            variant="outlined"
                            className={`w-32 ${!formData.isActive ? 'bg-white text-blue-700' : 'bg-transparent text-white'}`}
                            onClick={() => setFormData(prevState => ({ ...prevState, isActive: false }))}
                        >
                            Неактивний
                        </Button>
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

export default AddResidents;
