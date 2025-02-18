import React, { Component } from 'react';
import "./OSBB.css"
import "../Main/Main.css"
import {
    details,
    summary,
    AccordionBody,
} from "@material-tailwind/react";
import { Typography } from '@material-tailwind/react';
export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="back1 FAQP">
                    <div className=" px-5 py-24 mx-auto">
                        <div className="text-center mb-20">
                            <Typography variant='h1' style={{color:"#A3B565"}} className="text-center">
                                Часто задавані питання
                            </Typography>
                        </div>
                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                            <div className="w-full lg:w-1/2 px-4 py-2">
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    1. Як стати членом ОСББ?
                                    </summary >

                                    <Typography variant='medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500 rounded-md py-2 px-4">
                                    Щоб стати членом ОСББ, необхідно бути власником квартири в будинку, де створено ОСББ. Для цього потрібно підписати договір про участь в управлінні будинком і виконувати обов'язки, передбачені статутом ОСББ.
                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className=" bg-gray-200 rounded-md py-2 px-4">
                                    2. Як нараховуються внески на утримання будинку?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500 rounded-md py-2 px-4">
                                    Внески на утримання будинку розраховуються на основі затверджених загальними зборами ОСББ тарифів. Розмір внеску може залежати від площі квартири або кількості мешканців.                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    3. Що входить до складу комунальних послуг?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    Комунальні послуги включають в себе водопостачання, водовідведення, опалення, електроенергію для спільних приміщень, вивіз сміття та інші послуги, передбачені договором з ОСББ.
                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    4. Хто відповідає за ремонт спільних приміщень (дах, під'їзди, ліфти)?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    ОСББ відповідає за утримання і ремонт спільних приміщень будинку. Капітальні ремонти проводяться за рішенням загальних зборів і фінансуються з бюджету ОСББ.                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    5. Що робити, якщо я хочу продати квартиру?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    При продажу квартири необхідно повідомити ОСББ про зміну власника. Новий власник повинен буде підписати договір про участь в ОСББ і почати сплачувати внески відповідно до правил.                                    </Typography>
                                </details>
                            </div>
                            <div className="w-full lg:w-1/2 px-4 py-2">
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    6. Як я можу оплатити комунальні послуги?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    Ви можете оплатити комунальні послуги через банківські відділення, інтернет-банкінг або в терміналах самообслуговування. Реквізити для оплати вказані в квитанції.                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    7. Як часто проводяться загальні збори ОСББ?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    Загальні збори ОСББ проводяться не рідше одного разу на рік. Однак, за необхідності, можуть бути скликані позачергові збори для вирішення важливих питань.
                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    8. Що робити, якщо в квартирі виникли проблеми з водопостачанням чи електрикою?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                        Спочатку необхідно звернутися до голови ОСББ або до відповідального за технічне обслуговування. Якщо проблема стосується спільних комунікацій, її вирішуватимуть за рахунок ОСББ.                                     </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    9. Чи можуть співвласники ініціювати збори ОСББ?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    Так, співвласники можуть ініціювати позачергові збори ОСББ. Для цього потрібно подати письмове звернення до правління з відповідною кількістю підписів співвласників (відповідно до статуту).                                    </Typography>
                                </details>
                                <details className="mb-4">
                                    <summary className="  bg-gray-200 rounded-md py-2 px-4">
                                    10. Як подати скаргу або пропозицію до ОСББ?
                                    </summary >

                                    <Typography variant=' medium' className="min-h-28 my-2 bg-blue-gray-50 text-blue-gray-500  rounded-md py-2 px-4">
                                    Ви можете подати письмову скаргу або пропозицію до голови правління ОСББ. Її розглянуть на найближчих зборах або під час засідань правління.
                                    </Typography>
                                </details>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}