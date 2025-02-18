import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Textarea,
} from "@material-tailwind/react";
import {
    BanknotesIcon,
    CreditCardIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";

function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(" ");
    } else {
        return value;
    }
}

function formatExpires(value) {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function CheckoutForm() {
    const [type, setType] = React.useState("card");
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardExpires, setCardExpires] = React.useState("");
    const [checkout, setCheckout] = useState(false);

    return (
        <div className="cellDivX">
            <Card className="w-full max-w-[24rem] min-h-[47rem]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 grid from-lime-600 to-light-green-500 place-items-center px-4 py-8 text-center"
                    variant="gradient"
                    color="green"
                >
                    <div className="mb-4 h-20 p-6">
                        <CreditCardIcon className="h-10 w-10"/>
                    </div>
                </CardHeader>
                <CardBody>
                    <Tabs value={type} className="">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="card" onClick={() => setType("card")}>
                                Pay with Card
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            className=""
                            animate={{
                                initial: {
                                    x: type === "card" ? 400 : -400,
                                },
                                mount: {
                                    x: 0,
                                },
                                unmount: {
                                    x: type === "card" ? 400 : -400,
                                },
                            }}
                        >
                            <TabPanel value="card" className="p-0">
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}