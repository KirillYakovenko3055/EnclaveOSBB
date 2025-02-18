import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../OSBB/OSBB.css";
import "../Main/Main.css";
import {
    Button,
    Typography,
    Input
} from "@material-tailwind/react";

const ResidentDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [residentName, setResidentName] = useState([]);
    const [personalCode, setPersonalCode] = useState('');
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                console.log(login, email);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/accounts/${login}/${email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAccounts(response.data.accounts);
            } catch (error) {
                console.error('Ошибка получения счетов:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleAccountClick = async (accountId) => {
        localStorage.removeItem('pageReloaded');
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/account/${accountId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate(`/user/account/${accountId}`, { state: { accountData: response.data } });
        } catch (error) {
            console.error('Ошибка получения данных по счету:', error);
        }
    };

    const handleSubmit = async (e) => {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/sendcode/${personalCode}/${login}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        e.preventDefault();
        console.log("Personal Code:", personalCode);
    };

    return (
        <div className="card container mx-auto px-4 rounded-3xl">

            <div>



                <div className="form-section">
                    <Typography variant='h5' style={{ color: '#002000' }}>
                        Напишіть, будь ласка, код особового рахунку, який прийшов вам від управління:
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Input
                            value={personalCode}
                            onChange={(e) => setPersonalCode(e.target.value)}
                            label="Код особового рахунку"
                            required
                        />
                        <Button type="submit" className="mt-4" onClick={() => handleSubmit}>Підтвердити</Button>
                    </form>
                </div>



            </div>
            <div>
                <div className="about-section">
                    <Typography variant='h2' style={{ color: '#002000' }}>Ваші рахунки:</Typography>
                </div>
                <div className="holder">
                    {accounts.map(account => (
                        <div className="cont mx-auto px-4 rounded-3xl">
                            <div className="container">
                                <Typography variant='h4' key={account._id} onClick={() => handleAccountClick(account._id)} style={{ color: '#002000' }}>
                                    {account.personalNumber}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ResidentDashboard;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../OSBB/OSBB.css";
// import "../Main/Main.css";
// import {
//     Button,
//     Typography,
//     Input
// } from "@material-tailwind/react";

// const ResidentDashboard = () => {
//     const [accountId, setAccountId] = useState(null); // Account ID to check for binding
//     const [personalCode, setPersonalCode] = useState(''); // State for storing the input value
//     const token = localStorage.getItem('token');
//     const login = localStorage.getItem('login');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAccountBinding = async () => {
//             try {
//                 // Fetching data from backend to check if user has an account binding
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/accounts/${login}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 // Assuming the API returns account ID if user has an account bound
//                 if (response.data.accounts.length > 0) {
//                     setAccountId(response.data.accounts[0]._id); // Set the account ID if it exists
//                 }
//             } catch (error) {
//                 console.error('Ошибка проверки привязки аккаунта:', error);
//             }
//         };

//         fetchAccountBinding();
//     }, [login, token]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here, you can send the entered personalCode to backend for binding or other actions
//         console.log("Код особового рахунку:", personalCode);
//         // You can also handle API call to bind the account code here if necessary
//     };

//     return (
//         <div className="card container mx-auto px-4 rounded-3xl">
//             <div className="about-section">
//                 <Typography variant='h2' style={{ color: '#002000' }}>Ваші рахунки:</Typography>
//             </div>

//             {accountId ? (
//                 <div className="account-info">
//                     <Typography variant='h4' style={{ color: '#002000' }}>
//                         Ваш прив'язаний рахунок: {accountId}
//                     </Typography>
//                 </div>
//             ) : (
//                 <div className="form-section">
//                     <Typography variant='h5' style={{ color: '#002000' }}>
//                         Напишіть, будь ласка, код особового рахунку, який прийшов вам від управління:
//                     </Typography>
//                     <form onSubmit={handleSubmit}>
//                         <Input
//                             value={personalCode}
//                             onChange={(e) => setPersonalCode(e.target.value)}
//                             label="Код особового рахунку"
//                             required
//                         />
//                         <Button type="submit" className="mt-4">Підтвердити</Button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResidentDashboard;
