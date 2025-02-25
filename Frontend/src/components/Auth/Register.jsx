import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
    firstname: "",
    lastname: "",
    middlename: "",
    taxcode: "",
    gender: "",
    birthday: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData);
      if (response.data.success) {
        setMessage("Регистрация успешна!");
        navigate("/login");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Ошибка регистрации пользователя");
    }
  };

  return (
    <div className="enterD centered" style={{ textAlign: "center" }}>
      <Card color="transparent" shadow={false} style={{ height: "100%", justifyContent:"center"}}>
      <div className="flex items-center ml-10 mt-5">
          <Link className='text-white' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
            Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
          </Link>
          <Link className='underline text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Кабінет
          </Link>
        </div>
      <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-gray-50 p-10 font-thin">
          СТВОРЕННЯ КАБІНЕТУ
        </Typography>
        <center>
          <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <div className="mb-1 flex flex-row gap-6">
                <Input type="text" size="lg"
                  placeholder="Login"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.login} onChange={handleChange}  />

                <Input type="email" size="lg"
                  placeholder="Email@email.com"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={formData.email} onChange={handleChange}  />
              </div>
              <div className="mb-1 flex flex-row gap-6">
                <Input type="text" size="lg"
                  placeholder="Алексій"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="firstname" value={formData.firstname} onChange={handleChange}  />
                <Input type="text" size="lg"
                  placeholder="Алексіїв"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="lastname" value={formData.lastname} onChange={handleChange} />

                <Input type="text" size="lg"
                  placeholder="Алексійович"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="middlename" value={formData.middlename} onChange={handleChange} />
              </div>
              <div className="mb-1 flex flex-row gap-6">
                <Input type="text" size="lg"
                  placeholder="+01-000-000-000"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="phone" value={formData.phone} onChange={handleChange} />
                <Input type="date" size="lg"
                  placeholder="2000.01.01"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="birthday" value={formData.birthday} onChange={handleChange} />
                <Input type="text" size="lg"
                  placeholder="00-001"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="taxcode" value={formData.taxcode} onChange={handleChange} />

                <Input type="text" size="lg"
                  placeholder="м/ж"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="gender" value={formData.gender} onChange={handleChange} />
              </div>
              <div className="mb-1 flex flex-row gap-6">
                <Input type="password" size="lg"
                  placeholder="***********"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.password} onChange={handleChange} />
                <Input type="password" size="lg"
                  placeholder="***********"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
            <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }}  type="submit" variant="gradient">
              Підтвердити
            </Button>
          </form>
          {message && <p style={{ color: message.includes("успешна") ? "green" : "red" }}>{message}</p>}
        </center>
        <div className="flex flex-col items-center mb-20">
        <Link to="/login" className='mx-10 p-2 underline text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
            <Button className=' mx-5' size='sm' variant="text" color="white">
               УВІЙТИ
            </Button>
          </Link>
          </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
