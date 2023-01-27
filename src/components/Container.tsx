import { Form } from 'react-final-form';
import '../styles/container.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import createDecorator from 'final-form-calculate';
import AmountField from './AmountField';
import AmountRadioBlock from './AmountRadioBlock';
import NdflSwitchBlock from './NdflSwitchBlock';
import ResultsBlock from './ResultsBlock';
import React from 'react'

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

export interface ReactCreditCardProps {
    haveNdfl: boolean,
    salaryEBDA: number,
    ndfl: number,
    sum: string,
    money: string,
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
            salary: (value: string, allValues: any) => allValues?.haveNdfl ? Number(value?.replace(/\s/g, '')) : Number(value?.replace(/\s/g, '')) - (Number(value?.replace(/\s/g, '')) * percentNdfl / 100),
            salaryEBDA: (value: string, allValues: any) => allValues?.haveNdfl ? Math.round(Number(value?.replace(/\s/g, '')) / (1 - percentNdfl / 100)) - Number(value?.replace(/\s/g, '')) : Number(value) * percentNdfl / 100,
            ndfl: (value: string, allValues: any) => allValues?.haveNdfl ? Math.round(Number(value?.replace(/\s/g, '')) / (1 - percentNdfl / 100)) : Number(value?.replace(/\s/g, '')),
        },
    },
    {
        field: 'haveNdfl',
        updates: {
            salary: (value: string, allValues: any) => allValues.haveNdfl ? Number(allValues.money?.replace(/\s/g, '')) : Number(allValues.money?.replace(/\s/g, '')) - Number((allValues.money?.replace(/\s/g, '')) * percentNdfl / 100),
            salaryEBDA: (value: string, allValues: any) => allValues.haveNdfl ? Math.round(Number(allValues.money?.replace(/\s/g, '')) / (1 - percentNdfl / 100)) - Number(allValues.money?.replace(/\s/g, '')) : Number(allValues.money?.replace(/\s/g, '')) * percentNdfl / 100,
            ndfl: (value: string, allValues: any) => allValues.haveNdfl ? Math.round(Number(allValues.money?.replace(/\s/g, '')) / (1 - percentNdfl / 100)) : Number(allValues.money?.replace(/\s/g, '')),
        },
    }
)

export default function Container() {

    return (
        <div className="container">
            <div className="container_content gradient-border" id="box">
                <p className="container_title gray">Сумма</p>
                <Form onSubmit={onSubmit}
                    decorators={[calculator]}
                    initialValues={{ haveNdfl: true }}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="container_block">
                                <AmountRadioBlock />
                                {values.sum !== "МРОТ" && 
                                (<React.Fragment>
                                <NdflSwitchBlock haveNdfl={values.haveNdfl} />
                                <AmountField sum={values.sum} />
                                <ResultsBlock
                                    salaryEBDA={values.salaryEBDA}
                                    ndfl={values.ndfl}
                                    sum={values.sum}
                                    money={values.money}
                                    salary={values.salary}
                                    percentNdfl={percentNdfl} />
                                    </React.Fragment>)}
                            </div>
                            {/* <div>{JSON.stringify(values)}</div> */}
                        </form>
                    )}
                />
            </div>
        </div>
    );
}

