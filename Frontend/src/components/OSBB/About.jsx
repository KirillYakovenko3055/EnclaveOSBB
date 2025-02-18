import React from 'react';
import "./OSBB.css"
import "../Main/Main.css"
import {Link } from "react-router-dom";
import { Typography } from '@material-tailwind/react';
export default function AboutForm() {
        return (
            <div className="mx-auto px-4 rounded-3xl">
                <div className="flex items-center mx-6 my-5">
                    <Link className='text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
                        Головна&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                    </Link>
                    <Link className='underline text-base text-gray-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/about'}>
                        Правління
                    </Link>
                </div>
                <div className="about-section">
                    <Typography variant='h1' style={{ color: "#A3B565", fontFamily: 'Philosopher' }}>Наша Организация</Typography>
                </div>
                <div className="holder px-56">
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/medium-shot-man-with-freckles_23-2149359573.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Глава ОСББ</Typography>
                            <Typography color='black' variant='h3'>Алексій Алексійович</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/portrait-woman_23-2147626503.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Бухгалтер</Typography>
                            <Typography color='black' variant='h3'>Вероніка Антарска</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/close-up-handsome-man-portrait_23-2148677648.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Участник ОСББ</Typography>
                            <Typography color='black' variant='h3'>Алексій Завскій</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                </div>

                <div className="holder px-56">
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/professional-beautiful-cosmetologist-with-cute-smile_144627-12796.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Участник ОСББ</Typography>
                            <Typography color='black' variant='h3'>Владислава Мешска</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/portrait-beautiful-woman-with-make-up_23-2148780014.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Участник ОСББ</Typography>
                            <Typography color='black' variant='h3'>Катерина Груска</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                    <div className="cardPerson mx-auto px-4">
                        <img className="imgProf" src='https://img.freepik.com/free-photo/close-up-smiley-beautiful-woman-posing_23-2148877752.jpg?semt=ais_hybrid' alt="" />
                        <div className="p-6">
                            <Typography style={{ color: "#A3B565", fontFamily: 'Philosopher' }} variant='h1'>Участник ОСББ</Typography>
                            <Typography color='black' variant='h3'>Марія Кейзановська</Typography>
                            <Typography color='gray' variant='h4'>+380(97) 898-89-13</Typography>
                        </div>
                    </div>
                </div>
            </div>
        )
}