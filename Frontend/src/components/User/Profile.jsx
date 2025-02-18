import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accountId');
    const [user, setUser] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        address: "",
        apartment: "",
        city: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me/${accountId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userData = response.data;
                console.log(userData);
                const { person, account, city, street } = userData;
                console.log(street, city);
                localStorage.setItem("personId", person._id);

                setUser({
                    firstname: person.firstname.toUpperCase(),
                    middlename: person.middlename.toUpperCase(),
                    lastname: person.lastname.toUpperCase(),
                    address: `ВУЛ. ${street.name.toUpperCase()}`,
                    apartment: `${account.flatNum} КВАРТИРА`,
                    city: city.name.toUpperCase(),
                    image: account.img || "https://via.placeholder.com/150",
                    phone: person.phone,
                    email: person.email,
                    personalNumber: account.personalNumber,
                    area: `${account.totalArea}`
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload();
    };

    const handleEditClick = (type, value) => {
        navigate(`/user/update-contact/${type}`, { state: { initialData: value } });
    };

    return (
        <div>
            <div className="w-full flex justify-between px-10 mt-4">
                <div>
                    <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                        Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                    </Link>
                    <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/user/profile'}>
                        Профіль
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-base text-gray-500">
                    Вийти
                </button>
            </div>
            <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden w-64 h-64">
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-medium mt-8" style={{ fontFamily: "Philosopher" }}>
                    {user.firstname} {user.middlename} {user.lastname}
                </h2>
                <div className="line-container mt-12">
                    <div className="flex flex-col h-full items-center mx-4">
                        <span
                            className="bg-[#A3B565] w-40 h-20 px-4 m-5 py-2 rounded-2xl flex items-center text-center justify-center"
                            style={{ fontFamily: "Arsenal" }}
                        >
                            {user.address}
                        </span>
                    </div>
                    <div className="line"></div>
                    <div className="flex flex-col h-full items-center mx-4">
                        <span
                            className="bg-[#A3B565] w-40 h-20 px-4 m-5 py-2 rounded-2xl flex items-center text-center justify-center"
                            style={{ fontFamily: "Arsenal" }}
                        >
                            {user.apartment}
                        </span>
                    </div>
                    <div className="line"></div>
                    <div className="flex flex-col h-full items-center mx-4">
                        <span
                            className="bg-[#A3B565] w-40 h-20 px-4 m-5 py-2 rounded-2xl flex items-center text-center justify-center"
                            style={{ fontFamily: "Arsenal" }}
                        >
                            {user.city}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="vertical-line-container">
                    <div className="vertical-line"></div>
                </div>

                <div className="line-container">
                    <div className="line"></div>
                </div>

                <div className="infocontainer">
                    <div className="info-content">
                        <div>
                            <div className="info-label">Номер телефону</div>
                            <b className="info-value">{user.phone}</b>
                        </div>
                        <a
                            href="#"
                            onClick={() => handleEditClick("phone", user.phone)}
                            className="edit-link"
                        >
                            ЗМІНИТИ
                        </a>
                    </div>
                </div>

                <div className="line-container">
                    <div className="line"></div>
                </div>

                <div className="infocontainer">
                    <div className="info-content">
                        <div>
                            <div className="info-label">Пошта</div>
                            <div className="info-value">{user.email}</div>
                        </div>
                        <a
                            href="#"
                            onClick={() => handleEditClick("email", user.email)}
                            className="edit-link"
                        >
                            ЗМІНИТИ
                        </a>
                    </div>
                </div>
                <div className="line-container">
                    <div className="line"></div>
                </div>

                <div className="infocontainer">
                    <div className="info-content">
                        <div>
                            <div className="info-label">Особистий рахунок</div>
                            <div className="info-value">{user.personalNumber}</div>
                        </div>                        
                        <a
                            href="#"
                            onClick={() => navigate('/user')}
                            className="edit-link"
                        >
                            ЗМІНИТИ
                        </a>
                    </div>
                </div>
                <div className="line-container">
                    <div className="line"></div>
                </div>

                <div className="infocontainer">
                    <div className="info-content">
                        <div>
                            <div className="info-label">Площа</div>
                            <div className="info-value">{user.area}</div>
                        </div>
                    </div>
                </div>
                <div className="line-container">
                    <div className="line"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;