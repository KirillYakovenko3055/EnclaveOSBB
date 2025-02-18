import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import "./Profile.css";
import {
    Card,
    Input,
    Button,
    Typography
} from "@material-tailwind/react";
import img from '../../assets/owl/2.png'

const ChangeProfile = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const personId = localStorage.getItem("personId");
    const location = useLocation();
    const initialData = location.state?.initialData || "";
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        input: type === "phone" ? initialData : initialData
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
        setSuccessMessage("");
    }, [type, initialData]);

    const handleChange = (e) => {
        const { value } = e.target;

        if (type === "phone") {
            if (!value.startsWith("+380")) {
                setFormData({ input: "+380" });
            }else {
                setFormData({ input: value });
            }
        } 
        else if(type === "area"){
            if (!value.endsWith("м²")) {
                setFormData({ input: `м²` });
            }else {
                setFormData({ input: value });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData.input);
            const data = formData.input;

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/updatecontact/${personId}`,
                { data: data },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                navigate('/user/profile');
            }
        } catch (error) {
            setErrorMessage("Не вдалося оновити інформацію.");
            setSuccessMessage("");
            console.error("Помилка оновлення інформації:", error);
        }
    };

    return (
        <div className="relative mb-20" style={{ textAlign: "center" }}>
            <div className="enterD centered relative p-5">
                <Card color="transparent" shadow={false}>
                    <div className="flex items-center ml-10">
                        <Link className='text-white' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                            Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                        </Link>
                        <Link className='text-white' size='sm' style={{ fontFamily: 'Arsenal', textDecoration: 'none' }} to={'/user/profile'}>
                            Профіль&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                        </Link>
                        <Link className='underline text-white' size='sm' style={{ fontFamily: 'Arsenal' }}>
                            Контактна інформація
                        </Link>
                    </div>
                    <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-gray-50 p-10 font-thin">
                        {type === "phone" ? "Оновити номер телефону" : null}
                        {type === "email" ? "Оновити пошту" : null}
                        {type === "personalNumber" ? "Оновити особистий рахунок" : null}
                        {type === "area" ? "Оновити площу" : null}
                    </Typography>
                    <center>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                                <div className="mb-1 flex flex-col gap-12">
                                    <Input
                                        type={type === "email" ? "email" : "text"}
                                        name="input"
                                        id="input"
                                        size="lg"
                                        className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                                        value={formData.input}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button className="mt-12 to-indigo-100 from-deep-purple-100 text-black text-2xl rounded-2xl font-thin" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="gradient">
                                    Змінити
                                </Button>
                            </form>
                    </center>
                </Card>
            </div>

            <img
                src={img}
                alt="Owl illustration"
                className="absolute top-24 right-16 w-70" style={{height: '26.8rem', marginRight: '20px', marginBottom: '20px'}}
            />
        </div>
    );
};

export default ChangeProfile;