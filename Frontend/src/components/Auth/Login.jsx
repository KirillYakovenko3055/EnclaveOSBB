import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../App.css'
import './Auth.css';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { login, password });
      setMessage(response.data.message);
      localStorage.setItem('login', login);
      localStorage.setItem('email', response.data.email);
      navigate('/verify');
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div className="enterD centered" style={{ textAlign: "center" }}>
      <Card color="transparent" shadow={false} >
        <div className="flex items-center ml-10 mt-5">
          <Link className='text-white' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
            Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
          </Link>
          <Link className='underline text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Кабінет
          </Link>
        </div>
        <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-gray-50 p-10 font-thin">
          ВХІД У СВІЙ КАБІНЕТ
        </Typography>
        <center>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleLogin}>
            <div className="mb-1 flex flex-col gap-12">
              <Input
                type="text"
                size="lg"
                placeholder="Логін"
                className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
              УВІЙТИ
            </Button>
          </form>{message && <p>{message}</p>}
          </center>
        <div className="flex flex-col items-center mb-20">
          <Link className='mx-10 p-2 text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Забули свій пароль?
          </Link>
          <Link to="/register" className='mx-10 p-2 underline text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
            <Button className=' mx-5' size='sm' variant="text" color="white">
               Створити кабінет
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
