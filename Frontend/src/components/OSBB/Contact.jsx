import React, { useState } from 'react';
import "./OSBB.css"
import "../Main/Main.css"
import {Link } from "react-router-dom";
import axios from "axios";
import { Button, Input, Typography, Alert, Textarea } from '@material-tailwind/react';
const ContactForm = () => {

    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/contact`, 
                {
                    text: text,
                    email: email
                });
            if (response.data.success) {
                setMessage("Успішно Відправленно!");
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Ошибка відправлення");
        }
    };

    return (
        <div>
        <div className="flex items-center mx-10 my-5">
            <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
            </Link>
            <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/contacts'}>
                Контакти
            </Link>
        </div>
            <div class="row px-16">
                <div class="column">
                    <iframe class="maps left" src="https://maps.google.com/maps?q=Клочковська+17,Харьков&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                </div>
                <div class="column">
                    <div class="maps holderR centered" style={{ minWidth: "80%" }}>
                        <Typography style={{color:"#A3B565"}} variant='h1'>КОНТАКТУЙ З НАМИ</Typography>
                        <Typography style={{textAlign:"center"}} variant='h4'>Відправ свої пропозиції та побажання</Typography>
                        <div className="mt-4 flex flex-col gap-4">
                            <Input type="email" size="lg"
                                placeholder="Email@email.com"
                                className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <Textarea
                                size="lg"
                                placeholder="Hello! I want to speak with you."
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Button onClick={handleSubmit} className=" to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
                                ВІДПРАВИТИ
                            </Button>
                            {message && <p style={{ color: message.includes("отправлен") ? "green" : "red" }}>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactForm;