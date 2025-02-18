import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddPersonalAccount = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const buildingId = localStorage.getItem("buildingId");
    const navigate = useNavigate();
    const OSBBId = localStorage.getItem('OSBBId');
    
    const [formData, setFormData] = useState({
        flatNum: '',
        totalArea: '',
        heatingArea: '',
        ownerId: ''
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
            flatNum: formData.flatNum,
            totalArea: formData.totalArea,
            heatingArea: formData.heatingArea,
            personId: formData.personId,
            typeId: formData.typeId,
        });
        try {
            console.log(`${import.meta.env.VITE_BACKEND_URL}/api/user/addPersonalAccount/${buildingId}`);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/addPersonalAccount/${buildingId}`,
                {
                    flatNum: formData.flatNum,
                    totalArea: formData.totalArea,
                    heatingArea: formData.heatingArea,
                    personId: formData.personId,
                    typeId: formData.typeId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log("2");
            console.log('Response:', response.data); // Debugging
            navigate(`/admin/${OSBBId}`);
        } catch (error) {
            console.error('Ошибка добавления квартиры:', error.response?.data || error);
        }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#544C76] p-8">
  <div className="w-full max-w-3xl p-8 rounded-lg flex flex-col items-center">
  <Typography variant="h4" color="blue" className="text-white mb-6">
      Додати квартиру
    </Typography>
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
    <div className="mb-4 w-full">
      <Typography variant="small" className="text-white mb-2">
          Номер квартири
        </Typography>
        <Input
          type="text"
          name="flatNum"
          value={formData.flatNum}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
          placeholder="Номер квартири"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <Typography variant="small"className="text-white mb-2">
          Загальна площа
        </Typography>
        <Input
          type="text"
          name="totalArea"
          value={formData.totalArea}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
          placeholder="Загальна площа"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <Typography variant="small" className="text-white mb-2">
          Опалювана площа
        </Typography>
        <Input
          type="text"
          name="heatingArea"
          value={formData.heatingArea}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
          placeholder="Опалюєма площа"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <Typography variant="small" className="text-white mb-2">
          ID власника (personId)
        </Typography>
        <Input
          type="text"
          name="personId"
          value={formData.personId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2 bg-white"
          placeholder="ID власника (personId)"
          required
        />
      </div>

     {/* <div className="mb-4">
        <Typography variant="small" color="gray" className="mb-2">
          Номер лицевого счета (сгенерированный)
        </Typography>
        <Input
          type="text"
          name="personalNumber"
          value={formData.personalNumber || `PA-${Math.floor(Math.random() * 100)}`}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 p-2"
          placeholder="Номер лицевого счета"
          required
          disabled
        />
      </div>*/}

      <Button type="submit" 
      color="#C4C3E3" 
      className="m-5 rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg w-6/12"
                    >
        Додати
      </Button>
    </form>
  </div>
</div>

    );
};

export default AddPersonalAccount;
