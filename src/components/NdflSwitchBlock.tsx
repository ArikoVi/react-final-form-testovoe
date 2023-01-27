import { Field } from 'react-final-form';
import FormBS from 'react-bootstrap/Form';
import '../styles/ndfl-switch-block.scss';

export interface NdflSwitchBlockProps {
    haveNdfl: boolean,
}

export default function NdflSwitchBlock (props: NdflSwitchBlockProps) {
    return (
        <div className='ndfl-switch-block'>
            <p className={`ndfl-switch-block_item ${props.haveNdfl ? "gray" : ""}`}>Указать с НДФЛ</p>
            <Field name="haveNdfl">
                {({ input }) => (
                    <FormBS>
                        <FormBS.Check
                            name="haveNdfl"
                            type="switch"
                            id="custom-switch"
                            defaultChecked={props.haveNdfl}
                            onChange={date => input.onChange(date)}
                        />
                    </FormBS>
                )}
            </Field>
            <p className={`ndfl-switch-block_item ${props.haveNdfl ? "" : "gray"}`}>Без НДФЛ</p>
        </div>
    )
}