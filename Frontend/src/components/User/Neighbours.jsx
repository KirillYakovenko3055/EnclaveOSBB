import React, { useEffect, useState  } from 'react';
import "../OSBB/OSBB.css"
import "../Main/Main.css"
import second from '../../assets/images/nieghbours2.jfif';
import third from '../../assets/images/nieghbours3.jfif';
import { Link } from "react-router-dom";
import { Typography, Button } from '@material-tailwind/react';
const Neighbours = () => {
    const [selectedImage, setSelectedImage] = useState(1);
    const handleClick = (imageId) => {
        setSelectedImage(imageId);
    };
    return (
        <div className="mx-auto px-4 rounded-3xl">
            <div className="flex items-center mx-6 my-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/neighbours'}>
                    Сусіди
                </Link>
            </div>
            <div className="about-section">
                <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>ВАШІ СУСІДИ</Typography>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='ml-12'>
                    <button onClick={() => { handleClick(1) }}>
                        <Typography color='white' className='ml-12 mt-6' variant='h2' style={{ position: "absolute", zIndex: "1" }}>Сусіди на вашому поверсі</Typography>
                        <img className={`${selectedImage === 1 ? 'selected' : ''}`} style={{ borderTopLeftRadius: "60px" }} src={second}>
                        </img>
                    </button>
                </div>
                <div className='mr-12'>
                    <button onClick={() => { handleClick(2) }}>
                        <Typography color='white' className='ml-12 mt-6' variant='h2' style={{ position: "absolute", zIndex: "1" }}>Всі сусіди</Typography>
                        <img className={`${selectedImage === 2 ? 'selected' : ''}`} style={{ borderBottomRightRadius: "60px" }} src={third}>
                        </img>
                    </button>
                </div>
            </div>
            <div className="holder px-56">
                <div className="cardPerson mx-auto px-4">
                    <img className="imgProf" src='https://img.freepik.com/free-photo/medium-shot-man-with-freckles_23-2149359573.jpg?semt=ais_hybrid' alt="" />
                    <div className="p-6">
                        <Typography color='black' variant='h3'>Алексій Алексійович {/*neighbours.name*/} </Typography>
                        <Typography color='gray' variant='h4'>квартира 103 {/*neighbours.flat*/}</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Neighbours;