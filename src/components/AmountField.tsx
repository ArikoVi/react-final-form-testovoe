import React from "react";
import { Field, useForm, useFormState } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import '../styles/amount-field.scss';

export interface AmountFieldProps {
    sum: string;
}

export default function AmountField(props: AmountFieldProps) {
    const { change } = useForm();
    const {
        values: { money }
    } = useFormState();

    return (
        <div>
            <OnChange name="money">
                {(value, previous) => {
                    change("money", (value.replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/[^0-9\s]/g, '')));
                }}
            </OnChange>
            <Field
                className="amount-field"
                name="money"
                component="input"
                type="string"
                placeholder="Сумма"
                step='100'
                autocomplete="off"
            />
            <strong> ₽ {props.sum === "Оплата за день" ? 'в день' : ''}{props.sum === "Оплата за час" ? 'в час' : ''}</strong>
        </div>
    );
}