import React, { useState } from 'react';
import "./OSBB.css"
import "../Main/Main.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom";
import {
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { Button, Typography } from '@material-tailwind/react';
const TariphesForm = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="flex items-center mx-10 my-5">
            <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
            </Link>
            <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/tariphes'}>
                Тарифи
            </Link>
        </div>
            <div className="about-section">
                <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }} >ТАРИФИ</Typography>
                <Typography variant='h3'>Обирай тариф, що підходить для твого ОСББ.</Typography>
            </div>
            <div className="holderT">
                <div className="cardTariph rounded-3xl" style={{ background: 'white',border:'solid 1px #A3B565' }}>
                    <div style={{ background: '#A3B565' }} className="cardT rounded-3xl">
                        <Typography variant='h1' color='white'>Спілкування</Typography>
                        <Typography color='gray' variant='h5'>безкоштовно</Typography>
                    </div>
                    <div className='cardT A'>
                        <Typography variant='h1' color='white' style={{fontSize:"96px"}}>0,00</Typography>
                        <Typography variant='h3' color='white'>грн/м2</Typography>
                    </div>
                    <div className='Tlist'>
                        <div className='Titem'>
                             </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Проведення загальних/установчих зборів з використанням електронних підписів</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Месенджер з ідентифікованими користувачами</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Окремі розділи для оголошень, обговорень, опитувань та голосувань</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Пошук сусіда за номером квартири, поверху, підʼзду і навіть автомобіля</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Заявки на виконання завдань для правління</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Довідник потрібних контактів</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Документи об’єднання</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Кабінет для правління ОСББ</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Персональний кабінет мешканця у мобільному застосунку</Typography>
                        </div>
                        <div className='Titem'>
                            <Button onClick={() => navigate("/payment")} className="mt-12 text-black text-2xl rounded-2xl font-thin" fullWidth color='green' variant="gradient">
                                Підключити
                            </Button>
                        </div>
                        <div className='Titem'>
                             </div>
                    </div>
                </div>
                <div className="cardTariph rounded-3xl" style={{ background: 'white',border:'solid 1px #A3B565' }}>
                    <div style={{ background: '#A3B565' }} className="cardT rounded-3xl">
                        <Typography  variant='h1' color='white'>Фінанси</Typography>
                        <Typography color='gray' variant='h5'>*тарифікація розраховується відповідно від загальної площі та типу нерухомості.</Typography>
                    </div>
                    <div className='cardT A'>
                        <Typography variant='h1' color='white' style={{fontSize:"96px"}}>0,13</Typography>
                        <Typography variant='h3' color='white'>грн/м2</Typography>
                    </div>
                    <div className='Tlist'>
                        <div className='Titem'>
                             </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Можливості тарифу “Спілкування”</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Інфографіка фінансового стану</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Інструменти по роботі з боржниками</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Аналітика взаєморозрахунків</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Автоматичне формування та розсилка квитанцій</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Демонстрація стану особового рахунку</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Оплата квитанцій в застосунку</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Звіт по руху коштів ОСББ в реальному часі</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Кабінет для правління, бухгалтера та мешканців</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Тестовий період 14 днів безкоштовно</Typography>
                        </div>
                        <div className='Titem'>
                            <Button onClick={() => navigate("/payment")} className="mt-12 text-black text-2xl rounded-2xl font-thin" fullWidth color='green' variant="gradient">
                                Підключити
                            </Button>
                        </div>
                        <div className='Titem'>
                             </div>
                    </div>
                </div>
                <div className="cardTariph rounded-3xl" style={{ background: 'white',border:'solid 1px #A3B565' }}>
                    <div style={{ background: '#A3B565' }} className="cardT rounded-3xl">
                        <Typography  variant='h1' color='white'>Бухгалтерія</Typography>
                        <Typography color='gray' variant='h5'>Вартість тарифу "Фінанси" складає 10 коп./м2 (-30% знижка)</Typography>
                    </div>
                    <div className='cardT A'>
                        <Typography variant='h1' color='white' style={{fontSize:"96px"}}>10</Typography>
                        <Typography variant='h3' color='white'>грн/м2</Typography>
                    </div>
                    <div className='Tlist'>
                        <div className='Titem'>
                             </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Можливості тарифів “Спілкування” та “Фінанси”</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Ведення особових рахунків</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Ведення первинної документації ОСББ</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Ведення кадрового обліку та зарплати</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Ведення взаєморозрахунків з контрагентами</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Фінансова та податкова звітність</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Ведення та відображення на рахунках бухобліку діяльності ОСББ</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Здійснення контролю за змінами чинного законодавства</Typography>
                        </div>
                        <div className='Titem'>
                            <span><CheckBadgeIcon className="h-8 w-8 d"></CheckBadgeIcon></span>
                            <Typography color='gray' variant='h5'>Відповідальність за ведення бухгалтерського обліку в ОСББ регламентована договором</Typography>
                        </div>
                        <div className='Titem'>
                            <Button onClick={() => navigate("/payment")} className="mt-12 text-black text-2xl rounded-2xl font-thin" fullWidth color='green' variant="gradient">
                                Підключити
                            </Button>
                        </div>
                        <div className='Titem'>
                             </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TariphesForm;