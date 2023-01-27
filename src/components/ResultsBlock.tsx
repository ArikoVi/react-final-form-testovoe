import { Field } from 'react-final-form';
import '../styles/results-block.scss';

export interface ResultsBlockProps {
    salaryEBDA: number,
    ndfl: number,
    sum: string,
    money: string,
    salary: number,
    percentNdfl: number,
}

export default function ResultsBlock (props: ResultsBlockProps) {
    return (
        <div className={`results-block ${props.sum === "Оклад за месяц" && props.money ? "" : "disable"}`}>
                                    <Field
                                        className='results-block disable'
                                        name="salary"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <Field
                                        className='results-block disable'
                                        name="salaryEBDA"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <Field
                                        className='results-block disable'
                                        name="ndfl"
                                        component="input"
                                        type="number"
                                        disabled={true}
                                        visible={false}
                                    />
                                    <div className='results-block_item'><strong>{props.salary?.toLocaleString('ru')} ₽</strong> сотрудник будет получать на руки</div>
                                    <div className='results-block_item'><strong>{props.salaryEBDA?.toLocaleString('ru')} ₽</strong> НДФЛ, {props.percentNdfl}% от оклада</div>
                                    <div className='results-block_item'><strong>{props.ndfl?.toLocaleString('ru')} ₽</strong> за сотрудника в месяц</div>
                                </div>
    )

}