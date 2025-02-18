import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../OSBB/OSBB.css";
import { useNavigate } from 'react-router-dom';
import "../Main/Main.css";
import { StopCircleIcon } from "@heroicons/react/24/solid";
import { Typography, Button } from '@material-tailwind/react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const DebtForm = () => {
    const navigate = useNavigate();
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const [saldos, setSaldo] = useState([]);

    useEffect(() => {
        const fetchDebt = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getSaldos/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
                setSaldo(response.data);
            } catch (error) {
                console.error('Ошибка получения изображения диаграммы:', error);
            }
        };
        fetchDebt();
    }, []);

    const createPayment = async (reason, sum, saldoId) => {
        const stripe = await loadStripe("pk_test_51QEJB1HkYvylCFmApyRwNngumQdXp3fgjNrXRMlrAxSEmiU4SO8wX6YUxTs5Lb5ieg9BtEez8689HE2P6mIEbEZN000YB0Xmg8");

        const data = {
            reason: reason,
            price: sum,
            accountId: accountId,
            saldoId: saldoId
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/createpayment`, {body: data}, {headers: headers})
        
        const session = await response.data;

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if(result.error){
            console.log(result.error);
        }
    };

    const getDaysDifference = (dueDate) => {
        const currentDate = new Date(); 
        const targetDate = new Date(dueDate); 
        const timeDifference = targetDate - currentDate; 
        const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
        if (dayDifference > 0) {
            return `ще ${dayDifference} днів`;
        } else {
            return `пройшов ${Math.abs(dayDifference)} днів тому`;
        }
    };

    return (
        <div style={{ height: "100%" }}>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collections'}>
                    Фінанси&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collList'}>
                    Заборгованості
                </Link>
            </div>
            <div className="mx-auto px-16 rounded-3xl">
                <div className="about-section">
                    <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>ЗАБОРГОВАНОСТІ</Typography>
                </div>
                <div className='clDiv'>
                    <Typography style={{ fontFamily: 'Philosopher' }} className='pb-12' variant='h2'>Ваші заборгованості</Typography>
                    {
                        saldos.length > 0 ? ( saldos.map(saldo => (
                            <div className="collection p-8 rounded-3xl" key={saldo.id}>
                                <Typography className='px-5'>
                                    <StopCircleIcon className="h-4 w-4 d" /> Сума заборгованості: 
                                    <Typography style={{ display: "inline" }} as="a" color='orange'> {saldo.sum} грн</Typography>
                                </Typography>
                                <Typography className='px-5'>
                                    <StopCircleIcon className="h-4 w-4 d" /> Термін прострочки: {getDaysDifference(saldo.date)}
                                </Typography>
                                <Typography className='px-5'>
                                    <StopCircleIcon className="h-4 w-4 d" /> Причина: {saldo.description}
                                </Typography>
                                <Typography className='px-8'>*У вас є непогашений рахунок за {saldo.date} року. Це може призвести до накопичення додаткових штрафних санкцій або обмеження надання послуг.</Typography>
                                <Typography variant='h5' color='orange' className='p-3'>! Нагадування !</Typography>
                                <Typography className='px-3 underline'>Заборгованість необхідно погасити до { } року, щоб уникнути пені 1,5% за кожен прострочений місяць.</Typography>
                                <Button onClick={() => createPayment(saldo.description, saldo.sum, saldo._id)} className="mt-12 text-black text-2xl rounded-2xl font-thin" color='orange' style={{ fontFamily: 'Philosopher' }} variant="gradient">
                                    Погасити
                                </Button>
                            </div>
                        ))):(
                            <Typography variant='h1' style={{ color: "green", fontFamily: 'Philosopher' }}>Заборгованості відсутні</Typography>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default DebtForm;
