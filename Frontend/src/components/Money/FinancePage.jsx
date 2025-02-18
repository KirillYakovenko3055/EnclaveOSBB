import React from 'react';
import { Link } from 'react-router-dom';
import '../User/Profile.css'
import finance1 from '../../assets/images/finance1.png';
import finance2 from '../../assets/images/finance2.png';
import finance3 from '../../assets/images/finance3.png';
import finance4 from '../../assets/images/finance4.png';
import finance5 from '../../assets/images/finance5.png';

const FinancePage = () => {
    return (
        <div>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }}>
                    Фінанси
                </Link>
            </div>
            <div className="p-10">
                <h1 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: 'Philosopher' }}>ФІНАНСИ</h1>
                <div className='grid-container'>
                    <Link className=' row-span-2' to={'debt'}>
                    <div className='first image-text-container text-white'>
                        <img src={finance1} alt="Finance 1" className='first' />
                        <div className='center-text text-white'>ЗАБОРГОВАНОСТІ</div>
                        <div className='top-center-text text-white'>Детальні</div>
                    </div>
                    </Link>
                    <img src={finance2} alt="Finance 2" className='second' />
                    <Link to={'income'}>
                    <div className='fourth image-text-container2'>
                        <img src={finance4} alt="Finance 4" className='fourth' />
                        <div className='top-center-text2'>Детальні</div>
                        <div className='center-text2'>Надходження</div>
                        <div className='bottom-center-text'>— це кошти, які надходять на рахунок, зокрема від мешканців ОСББ у вигляді щомісячних платежів, пожертв, орендної плати чи інших доходів.</div>
                    </div>
                    </Link>
                    <img src={finance3} alt="Finance 4" className='third' />
                    <Link to={'spendings'}>
                        <div className='fifth image-text-container2'>
                            <img src={finance5} alt="Finance 4" className='fifth' />
                            <div className='text-black top-center-text2'>Детальні</div>
                            <div className='text-black center-text3'>Витрати</div>
                            <div className='text-black bottom-center-text text-lg'>— це кошти, які ОСББ витрачає на утримання будинку, такі як комунальні послуги (вода, електрика), ремонт, прибирання, зарплати працівникам, охорона тощо.</div>
                        </div>
                    </Link>
                </div>
            </div>
        
        </div>
    );
};

export default FinancePage;