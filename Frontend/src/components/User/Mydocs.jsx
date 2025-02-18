import React from 'react';
import {Link } from "react-router-dom";
import "../OSBB/OSBB.css"
import "../Main/Main.css"
import { useNavigate } from 'react-router-dom';
import { Button,Typography } from '@material-tailwind/react';
const MydocsForm = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="flex items-center ml-10 mt-5">
            <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
            </Link>
            <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collections'}>
                Особисті документи
            </Link>
        </div>
            <div className="about-section">
                <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Особисті документи</Typography>
            </div>
            <div className='clDiv'>
                <div className='rwDiv'>
                    <Button onClick={() => navigate("/user/docRent")} style={{borderTopLeftRadius:"60px"}} className='cellDiv bg-[#A1C060] text-white text-2xl'>Договір оренди</Button>
                    <Button onClick={() => navigate("/user/docOsbb")} style={{borderTopRightRadius:"60px"}} className='cellDiv bg-[#A1C060] text-white text-2xl'>Устав осбб</Button>
                </div>
                <div className='rwDiv'>
                    <Button onClick={() => navigate("/user/docBuy")} style={{borderBottomLeftRadius:"60px",borderBottomRightRadius:"60px"}} className='cellDiv bg-[#A1C060] text-white text-2xl'>Договір купівлі</Button>
                    <Button onClick={() => navigate("/user/docsBuilding")} style={{borderBottomRightRadius:"60px",borderBottomLeftRadius:"60px"}} className='cellDiv bg-[#A1C060] text-white text-2xl'>Документи по всьому будинку</Button>
               </div>
            </div>
        </div>
    )
}
export default MydocsForm;