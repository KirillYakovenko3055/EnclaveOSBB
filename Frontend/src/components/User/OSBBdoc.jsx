import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from "react-router-dom";
const StatuteComponent = () => {
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

                <Typography variant="h5" className="p-2">1. Загальні положення</Typography>
                <Typography variant="p" className="p-2">
                    1.1. Об’єднання співвласників багатоквартирного будинку (надалі — ОСББ) "THE ENCLAVE" створене відповідно до Закону України "Про об'єднання співвласників багатоквартирного будинку" з метою забезпечення і захисту прав співвласників, дотримання правил користування житловими і нежитловими приміщеннями та управління спільною власністю будинку.
                </Typography>
                <Typography variant="p" className="p-2">
                    1.2. ОСББ "THE ENCLAVE" є неприбутковою організацією, що здійснює свою діяльність відповідно до чинного законодавства України, цього Статуту, рішень Загальних зборів, а також інших нормативно-правових актів.
                </Typography>

                <Typography variant="h5" className="p-2">2. Мета та завдання ОСББ</Typography>
                <Typography variant="p" className="p-2">2.1. Основною метою діяльності ОСББ є забезпечення належного утримання спільного майна будинку, створення умов для ефективного використання майна співвласниками, організація спільного користування допоміжними приміщеннями, прибудинковою територією, комунікаціями та інфраструктурою будинку.</Typography>
                <Typography variant="p" className="p-2">2.2. Основні завдання ОСББ:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Управління та обслуговування спільного майна будинку та прилеглої території.</li>
                    <li className="px-8">• Ремонт, утримання та обслуговування внутрішніх систем будинку.</li>
                    <li className="px-8">• Організація благоустрою та комунальних послуг для співвласників.</li>
                    <li className="px-8">• Забезпечення безпеки та правопорядку у будинку.</li>
                    <li className="px-8">• Представлення інтересів співвласників у відносинах з державними та приватними органами.</li>
                </ul>

                <Typography variant="h5" className="p-2">3. Статус і права ОСББ</Typography>
                <Typography variant="p" className="p-2">3.1. ОСББ "THE ENCLAVE" є юридичною особою, має самостійний баланс, печатку та штампи, відкриває рахунки в банківських установах України.</Typography>
                <Typography variant="p" className="p-2">3.2. ОСББ має право:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Вести господарську діяльність у рамках, визначених Статутом та законодавством.</li>
                    <li className="px-8">• Надавати послуги співвласникам та отримувати за це плату.</li>
                    <li className="px-8">• Отримувати та розпоряджатися внесками, зборами та іншими надходженнями, передбаченими рішеннями Загальних зборів.</li>
                    <li className="px-8">• Укладати договори з фізичними та юридичними особами на постачання послуг, матеріалів та виконання робіт, необхідних для забезпечення утримання спільного майна.</li>
                    <li className="px-8">• Представляти інтереси співвласників у відносинах з третіми особами.</li>
                </ul>

                <Typography variant="h5" className="p-2">4. Членство в ОСББ</Typography>
                <Typography variant="p" className="p-2">4.1. Членами ОСББ є власники квартир та нежитлових приміщень у будинку "THE ENCLAVE".</Typography>
                <Typography variant="p" className="p-2">4.2. Членство в ОСББ є обов'язковим для всіх співвласників будинку.</Typography>
                <Typography variant="p" className="p-2">4.3. Права члена ОСББ:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Брати участь у Загальних зборах з правом голосу.</li>
                    <li className="px-8">• Вносити пропозиції щодо питань, які розглядаються на Загальних зборах.</li>
                    <li className="px-8">• Користуватися допоміжними приміщеннями будинку, його інфраструктурою, спільною власністю на рівних умовах з іншими співвласниками.</li>
                </ul>
                <Typography variant="p" className="p-2">4.4. Обов'язки члена ОСББ:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Дотримуватися Статуту та рішень органів управління ОСББ.</li>
                    <li className="px-8">• Своєчасно сплачувати внески та платежі, встановлені рішенням Загальних зборів.</li>
                    <li className="px-8">• Виконувати роботи, спрямовані на утримання спільного майна, та брати участь у благоустрої території.</li>
                    <li className="px-8">• Дотримуватися правил користування майном будинку та прибудинковою територією.</li>
                </ul>

                <Typography variant="h5" className="p-2">5. Органи управління ОСББ</Typography>
                <Typography variant="p" className="p-2">5.1. Органами управління ОСББ є:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Загальні збори — вищий орган управління.</li>
                    <li className="px-8">• Правління ОСББ — виконавчий орган.</li>
                    <li className="px-8">• Ревізійна комісія — контролюючий орган.</li>
                </ul>
                <Typography variant="p" className="p-2">5.2. Загальні збори співвласників:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Проводяться не рідше одного разу на рік.</li>
                    <li className="px-8">• Приймають рішення з основних питань діяльності ОСББ, включаючи визначення розміру внесків, затвердження бюджету, затвердження плану робіт.</li>
                </ul>
                <Typography variant="p" className="p-2">5.3. Правління ОСББ:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Обирається на Загальних зборах строком на 3 роки.</li>
                    <li className="px-8">• Організовує виконання рішень Загальних зборів, укладає договори, контролює діяльність підрядних організацій.</li>
                    <li className="px-8">• Приймає рішення щодо поточних питань управління будинком.</li>
                </ul>
                <Typography variant="p" className="p-2">5.4. Ревізійна комісія:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Контролює фінансово-господарську діяльність ОСББ.</li>
                    <li className="px-8">• Звітує перед Загальними зборами.</li>
                </ul>

                <Typography variant="h5" className="p-2">6. Фінансова діяльність ОСББ</Typography>
                <Typography variant="p" className="p-2">6.1. Джерела фінансування ОСББ включають:</Typography>
                <ul className="p-2">
                    <li className="px-8">• Обов'язкові внески співвласників.</li>
                    <li className="px-8">• Надходження від оренди спільного майна.</li>
                    <li className="px-8">• Платежі за додаткові послуги.</li>
                    <li className="px-8">• Інші надходження, передбачені законодавством.</li>
                </ul>
                <Typography variant="p" className="p-2">6.2. Всі надходження використовуються для утримання будинку та прибудинкової території, а також для забезпечення діяльності ОСББ.</Typography>

                <Typography variant="h5" className="p-2">7. Припинення діяльності ОСББ</Typography>
                <Typography variant="p" className="p-2">7.1. ОСББ може бути припинено шляхом ліквідації або реорганізації за рішенням Загальних зборів.</Typography>
                <Typography variant="p" className="p-2">7.2. У разі ліквідації, майно, що залишилося після задоволення вимог кредиторів, передається співвласникам пропорційно до їх часток у спільній власності.</Typography>

                <Typography variant="h5" className="p-2">8. Інші положення</Typography>
                <Typography variant="p" className="p-2">8.1. Зміни до цього Статуту можуть вноситися тільки за рішенням Загальних зборів співвласників.</Typography>
                <Typography variant="p" className="p-2">8.2. Цей Статут набуває чинності з моменту його державної реєстрації.</Typography>

                <Typography style={{ marginTop: '30px' }}>Підписи членів Правління ОСББ:</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Typography variant="p" className="p-2">Голова Правління (Петрович І.О)</Typography>
                    <Typography variant="p" className="p-2">Секретар Правління (Ковальчук О.П.)</Typography>
                    <Typography variant="p" className="p-2">Член Правління (Ткаченко Д.М.)</Typography>
                </div>
            </div>
        </div>
    );
};

export default StatuteComponent;