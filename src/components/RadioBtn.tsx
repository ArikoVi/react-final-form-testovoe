import React from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/form.scss';
import FormBS from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";
//import "custom.scss";
import { useFormState } from 'react-final-form';
import createDecorator from 'final-form-calculate'
import { useState, useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';


const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

export interface ReactCreditCardProps {
    haveNdfl: boolean,
    salaryEBDA: number,
    ndfl: number,
    sum: string,
    money: number,
    salary: number
}

const percentNdfl = 13;

const onSubmit = async (values: ReactCreditCardProps) => {
    await sleep(300);
    window.alert(JSON.stringify(values));
}

const calculator: any = createDecorator(
    {
        field: 'money', //(money|haveNdfl)$/  подписаться на 2 ключа
        updates: {
            salary: (value: any, allValues: any) => allValues?.haveNdfl ? value : value - (value * percentNdfl / 100),
            salaryEBDA: (value: number, allValues: any) => allValues?.haveNdfl ? Math.round(value / (1 - percentNdfl / 100)) - value : value * percentNdfl / 100,
            ndfl: (value: number, allValues: any) => allValues?.haveNdfl ? Math.round(value / (1 - percentNdfl / 100)) : value,
        },
    },
    {
        field: 'haveNdfl',
        updates: {
            salary: (value: number, allValues: any) => allValues.haveNdfl ? allValues.money : allValues.money - (allValues.money * percentNdfl / 100),
            salaryEBDA: (value: number, allValues: any) => allValues.haveNdfl ? Math.round(allValues.money / (1 - percentNdfl / 100)) - allValues.money : allValues.money * percentNdfl / 100,
            ndfl: (value: number, allValues: any) => allValues.haveNdfl ? Math.round(allValues.money / (1 - percentNdfl / 100)) : allValues.money,
        },
    }
)

export default function RadioBtn() {

    //const formState = useFormState();
    const [visible, setIsVisible] = useState(false);

    const radioVal: Array<string> = ['Оклад за месяц', "МРОТ", "Оплата за день", "Оплата за час"];
    const radio: any = [];

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const tooltip = (
        <Tooltip id="overlay-example">
            <strong>МРОТ</strong> - минимальный размер оплаты труда. Разный для разных регионов.
        </Tooltip>
    )

    radioVal.map(item => {

        if (item === "МРОТ") {
            radio.push(
                <>
                    <label className="container_radio-item">
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
                            <div className={`icon ${!show ? "info" : "cancel"}`} ref={target} onClick={() => setShow(!show)} >
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
                <label className="container_radio-item">
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
        <div className="container">
            <div className="container_content gradient-border" id="box">
                <p className="container_title gray">Сумма</p>
                <Form onSubmit={onSubmit}
                    decorators={[calculator]}
                    initialValues={{ haveNdfl: true }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="container_block">
                                <div className="container_radio">
                                    {radio}
                                </div>
                                <div className='container_switch'>
                                    <p className={`container_switch-item ${values.haveNdfl ? "gray" : ""}`}>Указать с НДФЛ</p>
                                    <Field name="haveNdfl">
                                        {({ input }) => (
                                            <FormBS>
                                                <FormBS.Check
                                                    name="haveNdfl"
                                                    type="switch"
                                                    id="custom-switch"
                                                    defaultChecked={values.haveNdfl}
                                                    onChange={date => input.onChange(date)}
                                                />
                                            </FormBS>
                                        )}
                                    </Field>
                                    <p className={`container_switch-item ${values.haveNdfl ? "" : "gray"}`}>Без НДФЛ</p>
                                </div>
                                <div>
                                    <Field
                                        className="container_salary"
                                        name="money"
                                        component="input"
                                        type="number"
                                        placeholder="Сумма"
                                        step='100'
                                        autocomplete="off"
                                    /> <strong>₽ {values.sum === "Оплата за день" ? 'в день' : ''}{values.sum === "Оплата за час" ? 'в час' : ''}</strong>
                                </div>
                                <div className={`container_alert ${values.sum === "Оклад за месяц" && values.money ? "" : "disable"}`}>
                                    <Field
                                        className='disable'
                                        name="salary"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <Field
                                        className='disable'
                                        name="salaryEBDA"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <Field
                                        className='disable'
                                        name="ndfl"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <div className='component_results'><strong>{values.salary?.toLocaleString('ru')} ₽</strong> сотрудник будет получать на руки</div>
                                    <div className='component_results'><strong>{values.salaryEBDA?.toLocaleString('ru')} ₽</strong> НДФЛ, {percentNdfl}% от оклада</div>
                                    <div className='component_results'><strong>{values.ndfl?.toLocaleString('ru')} ₽</strong> за сотрудника в месяц</div>

                                </div>

                            </div>
                            {/* <div>{JSON.stringify(values)}</div> */}
                        </form>
                    )}
                />
            </div>
        </div>
    );
}

