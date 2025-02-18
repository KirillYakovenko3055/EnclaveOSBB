import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import img from '../assets/owl/3,1.gif'
import { Link } from "react-router-dom";

const Register = () => {

    return (
        <div className="px-4 items-center flex justify-center flex-col-reverse lg:flex-row">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <Typography variant='h1' className="my-2 font-bold">
                                ПОМИЛКА 404
                            </Typography>
                            <Typography variant='h5' className='text-gray-800'>СТОРІНКА НЕ ЗНАЙДЕНА</Typography>
                            <Link to="/" className='mx-10 p-2 text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
                            <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
                                НА ГОЛОВНУ
                            </Button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img src={"https://i.ibb.co/G9DC8S0/404-2.png"} />
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={img} style={{ height: '23rem', width: '17rem', marginTop: '5rem' }} />
            </div>
        </div>
    );
};

export default Register;
