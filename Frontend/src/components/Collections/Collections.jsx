import React, { useState } from 'react';
import {Link } from "react-router-dom";
import "../OSBB/OSBB.css"
import "../Main/Main.css"
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
const CollectionsForm = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="flex items-center ml-10 mt-5">
            <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
            </Link>
            <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collections'}>
                Збори
            </Link>
        </div>
            <div className="about-section">
                <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Збори</Typography>
            </div>
            <div className='clDiv'>
                <div className='rwDiv'>
                    <Button style={{borderTopLeftRadius:"60px"}} className=' cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Протоколи минулих років</Button>
                    <Button onClick={() => navigate("/user/votings")} className='cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Онлайн-голосування</Button>
                    <Button style={{borderTopRightRadius:"60px"}} className=' cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Опитування мешканців</Button>
                </div>
                <div className='rwDiv'>
                    <Button onClick={() => navigate("/user/collList")} className='cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Список зборів</Button>
                    <Button onClick={() => navigate("/payment")} className='cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Форма для внеску суми</Button>
                    <Button onClick={() => navigate("/user/checkvotings")} className='cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Історія голосувань</Button>
                </div>
                <div className='rwDiv'>
                    <Button style={{borderBottomLeftRadius:"60px"}} className=' cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Рішення по голосуваннях</Button>
                    <Button style={{borderBottomRightRadius:"60px"}} onClick={() => navigate("/user/collProps")} className=' cellDiv to-indigo-100 from-deep-purple-100 text-black text-2xl' variant="gradient">Пропозиції для зборів</Button>
                </div>
            </div>
        </div>
    )
}
export default CollectionsForm;