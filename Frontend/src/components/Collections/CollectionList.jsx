import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../OSBB/OSBB.css";
import "../Main/Main.css";
import { StopCircleIcon} from "@heroicons/react/24/solid";
import { Typography } from '@material-tailwind/react';
const CollectionListForm = () => {
    return (
        <div style={{height:"100%"}}>
            <div className="flex items-center ml-10 mt-5">
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                    Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collections'}>
                    Збори&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Link>
                <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/collList'}>
                    Список
                </Link>
            </div>
            <div className="mx-auto px-16 rounded-3xl">
                <div className="about-section">
                    <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Збори</Typography>
                </div>
                <div className='clDiv'>
                    <Typography style={{ fontFamily: 'Philosopher' }} className='pb-12' variant='h2'>СПИСОК ЗБОРІВ</Typography>
                    {/*collections.map((collection) => (*/
                        <div className="collection backColor p-8 rounded-3xl">
                            <Typography className='p-3' variant='h2'>{/*collection.title*/}Назва</Typography>
                            <Typography className='px-5' color='white'><StopCircleIcon className="h-4 w-4 d"/> Дата початку: {/*collection.date*/}</Typography>
                            <Typography className='px-5' color='white'><StopCircleIcon className="h-4 w-4 d"/> Дата закінчення: {/*collection.date*/}</Typography>
                            <Typography className='px-5' color='white'><StopCircleIcon className="h-4 w-4 d"/> Загальна сума: {/*collection.date*/}</Typography>
                            <Typography className='px-5' color='white'><StopCircleIcon className="h-4 w-4 d"/> Зібрана сума: {/*collection.date*/}</Typography>
                            <Typography className='p-3'>{/*collection.description*/}Цей збір коштів спрямований на ремонт даху в нашому будинку. Поточний стан потребує термінових ремонтних робіт для забезпечення безпеки та комфорту мешканців. Зібрані кошти будуть використані для заміни покрівлі та покращення водовідведення, що допоможе запобігти подальшому руйнуванню конструкції будинку.</Typography>
                        </div>
                    /*))*/}
                </div>
            </div>
        </div>
    )
}
export default CollectionListForm;