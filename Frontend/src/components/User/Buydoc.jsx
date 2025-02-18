import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from "react-router-dom";

const ContractComponent = () => {
    return (<div>
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
            <Typography variant='h3' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Документи ОСББ</Typography>
        </div>
        <div style={{ margin: '0 auto', maxWidth: '800px', fontFamily: 'Arial, sans-serif' }}>
            <Typography variant="h7" className="p-2" >Місто Харків</Typography>
            <Typography variant="p" className="p-2">“10” жовтня 2024 року</Typography >

            <Typography variant="h5" className="p-2">Продавець:</Typography>
            <Typography variant="p" className="p-2">
                фізична особа Олексій Сергійович Петров, що діє на підставі паспорта серія КВ 123456, виданого Голосіївським РВ УМВС у м. Харків, надалі іменується "Продавець", з однієї сторони,
            </Typography>

            <Typography variant="h5" className="p-2" > Покупець:</Typography >
            <Typography variant="p" className="p-2">
                фізична особа Іван Олександрович Шевченко, що діє на підставі паспорта серія АН 651234, виданого Деснянським РВ УМВС у м. Харків, надалі іменується "Покупець", з іншої сторони, уклали цей Договір про наступне:
            </Typography>

            <Typography variant="h5" className="p-2" > 1. Предмет Договору</Typography >
            <Typography variant="p" className="p-2">
                1.1. Продавець передає у власність, а Покупець приймає у власність квартиру, що знаходиться за адресою: м. Харків, вул. Симоненка, 56, кв. 15, загальною площею 85 кв. м.
            </Typography>
            <Typography variant="p" className="p-2">
                1.2. Об'єкт передається разом із правом на користування спільними приміщеннями та земельною ділянкою, якщо це передбачено законодавством.
            </Typography>

            <Typography variant="h5" className="p-2" > 2. Ціна об'єкта та порядок розрахунків</Typography>
            <Typography variant="p" className="p-2" >
                2.1.Загальна ціна квартири становить 5 200 000 грн(п'ять мільйонів двісті тисяч гривень).
            </Typography >
            <Typography variant="p" className="p-2">
                2.2. Покупець зобов'язується сплатити Продавцю зазначену суму шляхом:
            </Typography>
            <ul className="p-2">
                < li className="px-8">• Безготівкового банківського переказу на рахунок Продавця;</li>
                < li className="px-8">• Перша виплата: здійснюється у розмірі 1 250 000 грн кожного 15-го та 30-го жовтня 2024 року;</li>
                < li className="px-8">• Кінцева сума до сплати: до 30 жовтня 2024 року.</li>
            </ul>
            <Typography variant="p" className="p-2">2.3. Витрати, пов'язані з оформленням цього договору, бере на себе Покупець.</Typography>

            <Typography variant="h5" className="p-2" > 3. Права та обов'язки сторін</Typography>
            <Typography variant="p" className="p-2" > 3.1.Продавець:</Typography >
            <ul className="p-2">
                < li className="px-8">• Гарантує, що на момент підписання цього договору квартира не перебуває під заставою, арештом або будь-якими іншими обтяженнями.</li>
                < li className="px-8">• Передає Покупцеві квартиру у належному технічному стані.</li>
                < li className="px-8">• Передає Покупцеві всі документи, що підтверджують право власності на квартиру, після отримання повної суми оплати.</li>
            </ul>
            <Typography variant="p" className="p-2">3.2. Покупець:</Typography>
            <ul className="p-2">
                < li className="px-8">• Зобов'язується сплатити Продавцю зазначену в п. 2.1 суму у встановлений термін.</li>
                < li className="px-8">• Приймає квартиру у власність після отримання всіх необхідних документів та після передачі ключів від квартири.</li>
            </ul>

            <Typography variant="h5" className="p-2" > 8. Відповідальність сторін</Typography >
            <Typography variant="p" className="p-2">
                8.1. У разі порушення умов цього договору сторони несуть відповідальність відповідно до чинного законодавства України.
            </Typography>
            <Typography variant="p" className="p-2">
                8.2. У разі несвоєчасної оплати Покупець сплачує Продавцю пеню у розмірі 0.5% від суми заборгованості за кожен день прострочення.
            </Typography>

            <Typography variant="h5" className="p-2" > 5. Передача квартири</Typography >
            <Typography variant="p" className="p-2">
                5.1. Квартира передається Покупцеві на підставі акта прийому-передачі, який підписується обома сторонами. Передача квартири відбудеться 30 жовтня 2024 року.
            </Typography>

            <Typography variant="h5" className="p-2" > 6. Форс - мажор</Typography >
            <Typography variant="p" className="p-2">
                6.1. Сторони звільняються від відповідальності за часткове або повне невиконання своїх зобов'язань за цим договором у разі настання форс-мажорних обставин (стихійні лиха, війна, страйки, дії державної заборони тощо).
            </Typography>

            <Typography variant="h5" className="p-2" > 7. Інші умови</Typography >
            <Typography variant="p" className="p-2">
                7.1. Будь-які зміни та доповнення до цього договору дійсні лише в письмовій формі та після підписання обома сторонами.
            </Typography>
            <Typography variant="p" className="p-2">
                7.2. Договір складено у двох оригінальних примірниках, по одному для кожної зі сторін.
            </Typography>

            <Typography variant="h5" className="p-2" > Реквізити сторін:</Typography >
            <Typography variant="p" className="p-2"><strong>Продавець:</strong></Typography>
            <Typography variant="p" className="p-2">Ім'я: Олексій Сергійович Петров</Typography>
            <Typography variant="p" className="p-2">Адреса: м. Харків, вул. Симоненка, 56, кв. 15</Typography>
            <Typography variant="p" className="p-2">Телефон: +38 (098) 123-45-67</Typography>
            <Typography variant="p" className="p-2">Розрахунковий рахунок: UA9874567890123555</Typography>

            <Typography variant="p" className="p-2"><strong>Покупець:</strong></Typography>
            <Typography variant="p" className="p-2">Ім'я: Іван Олександрович Шевченко</Typography>
            <Typography variant="p" className="p-2">Адреса: м. Харків, вул. Симоненка, 85, кв. 32</Typography>
            <Typography variant="p" className="p-2">Телефон: +38 (099) 555-88-98</Typography>
            <Typography variant="p" className="p-2">Розрахунковий рахунок: UA1234567890123456</Typography>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div>
                    <Typography variant="p" className="p-2">Підпис:</Typography>
                    <Typography variant="p" className="p-2">Продавець (Петров О.С.)</Typography>
                </div>
                <div>
                    <Typography variant="p" className="p-2">Підпис:</Typography>
                    <Typography variant="p" className="p-2">Покупець (Шевченко І.О.)</Typography>
                </div>
            </div>
        </div >
    </div>
    );
};

export default ContractComponent;