import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from "@material-tailwind/react";
import axios from 'axios';

const PersonalAccountDetails = () => {
  const token = localStorage.getItem('token');
  const { personalAccountId } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [owner, setOwner] = useState(null);
  const [residents, setResidents] = useState([]);
  const [saldos, setSaldos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/accountdetails/${personalAccountId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccountDetails(response.data);
      } catch (error) {
        console.error('Ошибка получения данных о лицевом счете:', error);
      }
    };

    const fetchOwnerAndResidents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/accountresidentsowners/${personalAccountId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOwner(response.data.owner);
        setResidents(response.data.residents || []);
      } catch (error) {
        console.error('Ошибка получения данных о владельце и жильцах:', error);
      }
    };

    const fetchSaldos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getSaldos/${personalAccountId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.setItem('personalAccountId', personalAccountId);
        setSaldos(response.data);
      } catch (error) {
        console.error('Ошибка получения данных о задолженностях:', error);
      }
    };

    fetchAccountDetails();
    fetchOwnerAndResidents();
    fetchSaldos();
  }, [personalAccountId, token]);

  const handleAddResidentClick = async (personalAccountId) => {
    try {
      localStorage.setItem("personalAccountId", personalAccountId);
      navigate(`/admin/add-Resident/${personalAccountId}`);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (!accountDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#544C76] p-8">
        <Typography variant="h4" color="white">Загрузка данных...</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#544C76] p-8">
      <Card className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" color="blue" className="text-[#544C76] mb-6">
          Детали лицевого счета
        </Typography>

        <ul className="mb-6">
          <li>
            <Typography variant="small" color="gray">
              Номер квартиры: {accountDetails.accountDetails.flatNum || "Неизвестно"}
            </Typography>
          </li>
          <li>
            <Typography variant="small" color="gray">
              Общая площадь: {accountDetails.accountDetails.totalArea || "Неизвестно"} м²
            </Typography>
          </li>
          <li>
            <Typography variant="small" color="gray">
              Отопительная площадь: {accountDetails.accountDetails.heatingArea || "Неизвестно"} м²
            </Typography>
          </li>
          <li>
            <Typography variant="small" color="gray">
              Лицевой номер: {accountDetails.accountDetails.personalNumber || "Неизвестно"}
            </Typography>
          </li>
          <li>
            <Typography variant="small" color="gray">
              Тип лицевого счета: {accountDetails.type?.name || "Неизвестно"}
            </Typography>
          </li>
        </ul>

        {owner ? (
          <div className="mb-6">
            <Typography variant="h5" className="text-[#544C76] mb-4">Владелец квартиры</Typography>
            <Typography variant="small" color="gray">ФИО: {owner.firstname} {owner.lastname}</Typography>
            <Typography variant="small" color="gray">Телефон: {owner.phone}</Typography>
            <Typography variant="small" color="gray">Email: {owner.email}</Typography>
          </div>
        ) : (
          <Typography variant="small" color="gray" className="mb-6">Владелец не найден</Typography>
        )}

        {residents.length > 0 ? (
          <div className="mb-6">
            <Typography variant="h5" className="text-[#544C76] mb-4">Жильцы квартиры</Typography>
            <ul className="space-y-2">
              {residents.map((resident) => (
                <li key={resident._id} className="text-gray-700">
                  {resident.firstname} {resident.lastname} — Телефон: {resident.phone}, Email: {resident.email}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="small" color="gray" className="mb-6">Жильцы не найдены</Typography>
        )}

        {saldos.length > 0 ? (
          <div className="mb-6">
            <Typography variant="h5" className="text-[#544C76] mb-4">Задолженности лицевого счета</Typography>
            <ul className="space-y-2">
              {saldos.map((saldo) => (
                <li key={saldo._id} className="text-gray-700">
                  Описание: {saldo.description}, Сумма: {saldo.sum}, Оплатить до: {saldo.date}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography variant="small" color="gray" className="mb-6">Задолженности не найдены</Typography>
        )}

        <div className="flex space-x-4">
          <Button
            className="rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg"
            onClick={() => navigate(`/admin/personal-account/addSaldo/${personalAccountId}`)}
          >
            Добавить задолженность
          </Button>

          <Button
            className="rounded-full bg-[#C4C3E3] text-[#544C76] font-bold text-lg px-6 py-2 shadow-lg"
            onClick={() => handleAddResidentClick(personalAccountId)}
          >
            Добавить проживающего
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PersonalAccountDetails;
