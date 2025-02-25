import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import './Auth.css';

const VerifyCodeForm = () => {
  const [fullCode, setCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const inputRefs = useRef([]);
  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newCode = [...fullCode];
    newCode[index] = value;

    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); 

      const newCode = [...fullCode];

      if (fullCode[index]) {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text').slice(0, 6);
    const newCode = [...fullCode];

    setTimeout(() => {
      pastedData.split('').forEach((char, index) => {
        if (index < 6) {
          newCode[index] = char;
        }
      });
  
      setCode(newCode);

      const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
      inputRefs.current[nextEmptyIndex].focus();
    }, 0);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const login = localStorage.getItem('login');
      const code = fullCode.join('');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-code`, { code, login });
      const { token, role, accounts } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role == 'admin') {
        navigate('/admin');
        localStorage.setItem('accountId', accounts[0]._id)

      } else if (role == 'user') {
        navigate('/user');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка подтверждения');
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
          Особисті дані
        </Typography>
        <center>
        <Typography variant="div" style={{ fontFamily: 'Philosopher' }} className="text-gray-50 font-thin w-96">
          Ми надіслали вам лист на {email} для підтвердження. Будь-ласка введіть код для підтвердження нижче.
        </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleVerifyCode}>
            <div className='container'>
              {fullCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className='input'
                  maxLength={1}
                />
              ))}
            </div>
            <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin mb-20" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
              Підтвердити
            </Button>
          </form>{message && <p>{message}</p>}</center>
      </Card>
    </div>
  );
};

export default VerifyCodeForm;
