import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay';
import { Field } from 'react-final-form';
import '../styles/amount-radio-block.scss';
import { useEffect } from 'react'

export default function AmountRadioBlock() {
    const radioVal: Array<string> = ['Оклад за месяц', "МРОТ", "Оплата за день", "Оплата за час"];
    const radio: any = [];

    const [show, setShow] = useState(false);
    const target = useRef(null);

    useEffect(() => {
        console.log(show);
        setShow(!show); 

    }, []);

    // const closeHandler = (e: any) => {

    //     // e.preventDefault();
    //     // console.log("closed click");
    //     // console.log(show);
    //     // console.log(!show);
    //     show = !show;

    //     // setShow(show => !show); 
    //     console.log(show);

    // }

    const tooltip = (
        <Tooltip id="overlay-example">
            <strong>МРОТ</strong> - минимальный размер оплаты труда. Разный для разных регионов.
        </Tooltip>
    )

    radioVal.map(item => {

        if (item === "МРОТ") {
            radio.push(
                <>
                    <label className="amount-radio-block_item">
                        <Field name="sum"
                            component="input"
                            type="radio"
                            value={item}></Field>
                        {' '}
                        <strong>{item}</strong>
                        <OverlayTrigger
                            key={"bottom"}
                            placement={"bottom"}
                            overlay={tooltip}
                        >
                            <div className={`amount-radio-block_icon ${!show ? "info" : "cancel"}`} ref={target} onClick={() => {
                                console.log(show);
                                setShow(!show);
                                console.log(show);
                            }} >
                            </div>
                        </OverlayTrigger>
                    </label>
                    <Overlay target={target.current} show={show} placement="bottom">
                        {tooltip}
                    </Overlay>
                </>
            )
        } else {
            radio.push(
                <label className="amount-radio-block_item">
                    <Field name="sum"
                        component="input"
                        type="radio"
                        value={item}></Field>
                    {' '}
                    <strong>{item}</strong>
                </label>

            )
        }
    })

    return (
        <div className="amount-radio-block">
            {radio}
        </div>
    )
}