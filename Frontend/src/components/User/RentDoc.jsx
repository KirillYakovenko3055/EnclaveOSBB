import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from "react-router-dom";

const ContractComponent = () => {
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
                <Typography variant='h3' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Документи Оренди</Typography>
            </div>
            <div style={{ margin: '0 auto', maxWidth: '800px', fontFamily: 'Arial, sans-serif' }}>

                <Typography variant="h7" className="p-2" >Місто Харків</Typography>
                <Typography variant="p" className="p-2">“10” жовтня 2024 року</Typography >

                <Typography variant="h5" className="p-2">Орендодавець:</Typography>
                <Typography variant="p" className="p-2">
                    ОСББ “The Enclave”, що діє на підставі Статуту, надалі іменується "Орендодавець", з однієї сторони,
                </Typography >

                <Typography variant="h5" className="p-2">Орендар:</Typography>
                <Typography variant="p" className="p-2">
                    Фізична особа Шевченко Іван Олександрович, що проживає за адресою: м. Харків, вул. Симоненка, 56, кв. 15, надалі іменується "Орендар", з іншої сторони, уклали цей Договір про наступне:
                </Typography >

                <Typography variant="h5" className="p-2">1. Предмет Договору</Typography>
                <Typography variant="p" className="p-2">
                    1.1. Орендодавець передає, а Орендар приймає у тимчасове користування нерухоме майно, що знаходиться за адресою: м. Київ, вул. Шевченка, 23, кв. 12, загальною площею 75 кв.м (далі "Об'єкт").
                </Typography >
                <Typography variant="p" className="p-2">
                    1.2. Об'єкт використовується виключно для проживання Орендаря та членів його родини.
                </Typography >

                <Typography variant="h5" className="p-2">2. Термін дії Договору</Typography>
                <Typography variant="p" className="p-2">
                    2.1. Даний договір набуває чинності з моменту його підписання і діє до “10” жовтня 2025 року.
                </Typography >
                <Typography variant="p" className="p-2">
                    2.2. Договір може бути продовжений за взаємною згодою сторін.
                </Typography >

                <Typography variant="h5" className="p-2">3. Орендна плата</Typography>
                <Typography variant="p" className="p-2">
                    3.1. Орендар сплачує Орендодавцю орендну плату у розмірі 12,000 грн на місяць, що підлягає сплаті до 10 числа кожного місяця.
                </Typography >
                <Typography variant="p" className="p-2">
                    3.2. Оплата здійснюється на рахунок Орендодавця, реквізити якого вказані в цьому договорі.
                </Typography >

                <Typography variant="h5" className="p-2">4. Права та обов'язки сторін</Typography>
                <Typography variant="p" className="p-2">4.1. Орендодавець:</Typography >
                <ul className="p-2">
                    < li className="px-8">• Передає Орендарю об'єкт у належному технічному стані.</li>
                    < li className="px-8">• Забезпечує можливість користування об'єктом протягом усього строку оренди.</li>
                </ul>
                <Typography variant="p" className="p-2">4.2. Орендар:</Typography >
                <ul className="p-2">
                    < li className="px-8">• Своєчасно сплачує орендну плату.</li>
                    < li className="px-8">• Не має права передавати об'єкт третім особам без згоди Орендодавця.</li>
                </ul>

                <Typography variant="h5" className="p-2">5. Відповідальність сторін</Typography>
                <Typography variant="p" className="p-2">
                    5.1. У разі порушення умов цього договору сторони несуть відповідальність відповідно до чинного законодавства України.
                </Typography >
                <Typography variant="p" className="p-2">
                    5.2. У разі несвоєчасної сплати орендної плати Орендар сплачує пеню у розмірі ___% від суми заборгованості за кожен день прострочення.
                </Typography >

                <Typography variant="h5" className="p-2">6. Припинення Договору</Typography>
                <Typography variant="p" className="p-2">
                    6.1. Договір може бути розірваний за згодою сторін або у випадках, передбачених законодавством.
                </Typography >
                <Typography variant="p" className="p-2">
                    6.2. Орендодавець має право розірвати договір в односторонньому порядку у разі порушення Орендарем умов цього договору.
                </Typography >

                <Typography variant="h5" className="p-2">7. Форс-мажор</Typography>
                <Typography variant="p" className="p-2">
                    7.1. Сторони звільняються від відповідальності за часткове або повне невиконання своїх зобов'язань за цим договором у разі настання форс-мажорних обставин (стихійні лиха, війна, страйки, дії державної заборони тощо).
                </Typography >

                <Typography variant="h5" className="p-2">8. Інші умови</Typography>
                <Typography variant="p" className="p-2">
                    8.1. Будь-які зміни та доповнення до цього договору дійсні лише в письмовій формі та після підписання обома сторонами.
                </Typography >
                <Typography variant="p" className="p-2">
                    8.2. Договір складено у двох оригінальних примірниках, по одному для кожної зі сторін.
                </Typography >

                <Typography variant="h5" className="p-2">Реквізити сторін:</Typography>
                <Typography variant="p" className="p-2"><strong>Орендодавець:</strong></Typography >
                <Typography variant="p" className="p-2">ОСББ “The Enclave”</Typography >
                <Typography variant="p" className="p-2">Адреса: м. Харків, вул. Шевченка, 23, кв. 12</Typography >
                <Typography variant="p" className="p-2">Телефон: +38 (056) 123 45 67</Typography >
                <Typography variant="p" className="p-2">Розрахунковий рахунок: EN355500011988</Typography >

                <Typography variant="p" className="p-2"><strong>Орендар:</strong></Typography >
                <Typography variant="p" className="p-2">Шевченко Іван Олександрович</Typography >
                <Typography variant="p" className="p-2">Адреса: м. Харків, вул. Симоненка, 56, кв. 15</Typography >
                <Typography variant="p" className="p-2">Телефон: +38 (099) 555-88-98</Typography >
                <Typography variant="p" className="p-2">Розрахунковий рахунок: UA1234567890123456</Typography >

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div>
                        <Typography variant="p" className="p-2">Підпис:</Typography >
                        <Typography variant="p" className="p-2">Голова ОСББ (Іваненко І.І.)</Typography >
                    </div>
                    <div>
                        <Typography variant="p" className="p-2">Підпис:</Typography >
                        <Typography variant="p" className="p-2">Орендар (Шевченко І.О.)</Typography >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractComponent;