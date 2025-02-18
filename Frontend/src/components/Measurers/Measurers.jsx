import React, { useEffect, useState } from 'react';
import "../OSBB/OSBB.css"
import "../Main/Main.css"
import axios from 'axios';
import second from '../../assets/images/measurers1.jfif';
import third from '../../assets/images/measurers2.png';
import water from '../../assets/images/water.png';
import light from '../../assets/images/light.png';
import fire from '../../assets/images/fire.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
    Button,
    Textarea,
    Typography,
    Input
} from "@material-tailwind/react";

const response1 = {
    month: "Вересень",
    tariff: 30,
    previousVolume: 170,
    currentVolume: 160,
    consumedVolume: 12,
    amountDue: 360,
    paid: 300,
    debt: 60,
};

const response2 = {
    month: "Жовтень",
    tariff: 30,
    previousVolume: 170,
    currentVolume: 160,
    consumedVolume: 20,
    amountDue: 600,
    paid: 600,
    debt: 60,
};

const response3 = {
    month: "Листопад",
    tariff: 30,
    previousVolume: 170,
    currentVolume: 160,
    consumedVolume: 5,
    amountDue: 150,
    paid: 150,
    debt: 60,
};
const Measurer = ({ response }) => {

    let height, backgroundColor;

    if (response.consumedVolume > 12) {
        height = '100%';
        backgroundColor = '#504E76';
    } else if (response.consumedVolume > 6) {
        height = '90%';
        backgroundColor = '#C4C3E3';
    } else {
        height = '80%';
        backgroundColor = '#FDF8E2';
    }

    return (
        <div className="ml-12 p-12 pb-12" style={{ borderTopLeftRadius: "60px", borderTopRightRadius: "60px", height: height, backgroundColor: backgroundColor }}>
            <Typography className='underline' variant='h5'>{response.month}</Typography>

            <Typography className='' variant='h4'>• Тариф: {response.tariff} грн/куб.м</Typography>
            <Typography className='' variant='h6'>• Попередні: {response.previousVolume} куб.м</Typography>
            <Typography className='' variant='h6'>• Поточні: {response.currentVolume} куб.м</Typography>
            <Typography className='' variant='h6'>• Спожитий обсяг: {response.consumedVolume} куб.м</Typography>
            <br />
            <hr />
            <br />
            <Typography className='' variant='h6'>До сплати: {response.amountDue} грн</Typography>
            <Typography className='' variant='h5'>Сплачено: {response.paid} грн</Typography>
            <Typography className='' variant='h6'>Заборгованість: {response.debt} грн</Typography>
        </div>
    );
}

const MeasurersMyPayments = () => {
    const navigate = useNavigate();
    useEffect(() => {
    }, []);
    return (
        <div className=''>
            <div>
                <div className='ml-12 p-2 pl-28 border-l-indigo-500' style={{ position: "absolute", border:"3px white solid", borderLeftColor:"black" }}>
                    <Typography variant="h5" component="div" className="font-bold mb-4">
                        Постачальник Прат “міськенерго”
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Рахунок IBAN: <span className="font-mono">UA3354567818512345612</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Номер особового рахунку: <span className="font-mono">1189651756</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Адреса: м.Харків, вул.Симоненка, 5Б, кв.15
                    </Typography>
                </div>
                <Typography className='my-6 py-16' variant='h2' style={{ textAlign: "center" }}>Вода</Typography>
                <div className='grid grid-cols-3 gap-4' style={{ alignItems: "end", minHeight: "450px" }}>
                    <Measurer response={response1} />
                    <Measurer response={response2} />
                    <Measurer response={response3} />
                </div>
            </div>
            <div>
                <div className='ml-12 p-2 pl-28 border-l-indigo-500' style={{ position: "absolute", border:"3px white solid", borderLeftColor:"black" }}>
                    <Typography variant="h5" component="div" className="font-bold mb-4">
                        Постачальник Прат “міськенерго”
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Рахунок IBAN: <span className="font-mono">UA3354567818512345612</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Номер особового рахунку: <span className="font-mono">1189651756</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Адреса: м.Харків, вул.Симоненка, 5Б, кв.15
                    </Typography>
                </div>
                <Typography className='my-6 py-16' variant='h2' style={{ textAlign: "center" }}>Газ</Typography>
                <div className='grid grid-cols-3 gap-4' style={{ alignItems: "end", minHeight: "450px" }}>
                    <Measurer response={response1} />
                    <Measurer response={response2} />
                    <Measurer response={response3} />
                </div>
            </div>
            <div>
                <div className='ml-12 p-2 pl-28 border-l-indigo-500' style={{ position: "absolute", border:"3px white solid", borderLeftColor:"black" }}>
                    <Typography variant="h5" component="div" className="font-bold mb-4">
                        Постачальник Прат “міськенерго”
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Рахунок IBAN: <span className="font-mono">UA3354567818512345612</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                        Номер особового рахунку: <span className="font-mono">1189651756</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Адреса: м.Харків, вул.Симоненка, 5Б, кв.15
                    </Typography>
                </div>
                <Typography className='my-6 py-16' variant='h2' style={{ textAlign: "center" }}>Електроенергія</Typography>
                <div className='grid grid-cols-3 gap-4' style={{ alignItems: "end", minHeight: "450px" }}>
                    <Measurer response={response1} />
                    <Measurer response={response2} />
                    <Measurer response={response3} />
                </div>
            </div>
        </div>
    );
};

const MeasurersMyMeasurer = () => {
    const [formData, setFormData] = useState({
        number: "",
        warm: "",
        cold: "",
        data: "",
        previous: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <div className='grid grid-cols-2 gap-4'>
            <div className='ml-12'>
                <img style={{ float: "right" }} src={water}>
                </img>
            </div>
            <form className="p-24 pl-0 mt-8 mb-2" onSubmit={handleSubmit}>
                <Typography className='mb-6' variant='h3' style={{ textAlign: "center" }}>Вода</Typography>
                <div className="mb-1 flex flex-col gap-6">
                    <div className="mb-1 flex flex-row gap-6">
                        <Input type="text" size="lg"
                            placeholder="UA99999999999999"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.number} onChange={handleChange} />

                        <Input type="text" size="lg"
                            placeholder="125"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={formData.warm} onChange={handleChange} />
                    </div>
                    <div className="mb-1 flex flex-row gap-6">
                        <Input type="text" size="lg"
                            placeholder="12.12.2024"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="firstname" value={formData.date} onChange={handleChange} />

                        <Input type="text" size="lg"
                            placeholder="80"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="middlename" value={formData.cold} onChange={handleChange} />
                    </div>
                    <div className="mb-1 flex flex-row gap-6">
                        <Textarea size="lg"
                            placeholder="Попередні показники"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.previous} onChange={handleChange} />
                    </div>
                </div>
                <Button className="mt-12 from-lime-600 to-light-green-500 text-white text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }} type="submit" variant="gradient">
                    Відправити
                </Button>
            </form>
            <form className="p-24 pr-0 mt-8 mb-2" onSubmit={handleSubmit}>
                <Typography className='mb-6' variant='h3' style={{ textAlign: "center" }}>Газ</Typography>
                <div className="mb-1 flex flex-col gap-6">
                    <div className="mb-1 flex flex-row gap-6">
                        <Input type="text" size="lg"
                            placeholder="UA99999999999999"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.number} onChange={handleChange} />

                        <Input type="text" size="lg"
                            placeholder="125"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={formData.warm} onChange={handleChange} />
                    </div>
                    <div className="mb-1 flex flex-row gap-6">
                        <Textarea size="lg"
                            placeholder="Попередні показники"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.previous} onChange={handleChange} />
                    </div>
                </div>
                <Button className="mt-12 from-lime-600 to-light-green-500 text-white text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }} type="submit" variant="gradient">
                    Відправити
                </Button>
            </form>
            <div className='mr-12'>
                <img style={{ float: "left" }} src={fire}>
                </img>
            </div>
            <div className='ml-12'>
                <img style={{ float: "right" }} src={light}>
                </img>
            </div>
            <form className="p-24 pl-0 mt-8 mb-2" onSubmit={handleSubmit}>
                <Typography className='mb-6' variant='h3' style={{ textAlign: "center" }}>Електроенергія</Typography>
                <div className="mb-1 flex flex-col gap-6">
                    <div className="mb-1 flex flex-row gap-6">
                        <Input type="text" size="lg"
                            placeholder="UA99999999999999"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.number} onChange={handleChange} />

                        <Input type="text" size="lg"
                            placeholder="125"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={formData.warm} onChange={handleChange} />
                    </div>
                    <div className="mb-1 flex flex-row gap-6">
                        <Textarea size="lg"
                            placeholder="Попередні показники"
                            className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.previous} onChange={handleChange} />
                    </div>
                </div>
                <Button className="mt-12 from-lime-600 to-light-green-500 text-white text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }} type="submit" variant="gradient">
                    Відправити
                </Button>
            </form>
        </div>
    );
};


const Measurers = () => {
    const [measurers, setMeasurers] = useState([]);
    const token = localStorage.getItem('token');
    const [selectedImage, setSelectedImage] = useState(null);
    const accountId = localStorage.getItem('accountId');
    const navigate = useNavigate();

    useEffect(() => {
        /*const fetchMeasurers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/measurers/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMeasurers(response.data.measurers);
            } catch (error) {
                console.error('Ошибка получения счетов:', error);
            }
        };

        fetchMeasurers();*/
    }, []);

    const handleClick = (imageId) => {
        setSelectedImage(imageId);
    };

    const handleMeasurerClick = async (measurerId) => {
        try {
            localStorage.setItem("measurerId", measurerId);
            navigate(`/user/measurer/${measurerId}`);
        } catch (error) {
            console.error('Ошибка получения данных по счету:', error);
        }
    };

    return (
        <div className="mx-auto px-4 rounded-3xl">
            <div className="flex items-center mx-6 my-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/neighbours'}>
                    Лічільники
                </Link>
            </div>
            <div className="about-section">
                <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>ЛІЧІЛЬНИКИ</Typography>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='ml-12'>
                    <button onClick={() => { handleClick(1) }}>
                        <Typography color={selectedImage === 1 ? "white" : "black"} className='ml-12 mt-6' variant='h2' style={{ position: "absolute", zIndex: "1" }}>Мої платежі</Typography>
                        <img className={`${selectedImage === 1 ? 'selected' : ''}`} style={{ borderTopLeftRadius: "60px", borderBottomRightRadius: "60px" }} src={second}>
                        </img>
                    </button>
                </div>
                <div className='mr-12'>
                    <button onClick={() => { handleClick(2) }}>
                        <Typography color={selectedImage === 2 ? "white" : "black"} className='ml-12 mt-6' variant='h2' style={{ position: "absolute", zIndex: "1" }}>Внески показнеків</Typography>
                        <img className={`${selectedImage === 2 ? 'selected' : ''}`} style={{ borderBottomLeftRadius: "60px", borderTopRightRadius: "60px" }} src={third}>
                        </img>
                    </button>
                </div>
                <div className='ml-12'>
                    <Typography>— це сума коштів, яку мешканець сплачує на підтримку будинку та його обслуговування. Це можуть бути щомісячні внески за комунальні послуги, ремонт, обслуговування ліфтів, охорону та інші спільні витрати ОСББ.</Typography>
                </div>
                <div className='mr-12'>
                    <Typography>— це платежі, які мешканці сплачують відповідно до фактичних показників лічильників (наприклад, за електроенергію, воду, газ), що відображають індивідуальне споживання кожної квартири.</Typography>
                </div>
            </div>
            <div className="component-container">
                {selectedImage === 1 ? <MeasurersMyPayments /> : <></>}
                {selectedImage === 2 ? <MeasurersMyMeasurer /> : <></>}
            </div>
        </div>
    );
};

export default Measurers;