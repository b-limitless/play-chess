import { ChangeEventHandler } from 'react';
import './switch.scss';

interface ISwitch {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Switch({ onChange }: ISwitch) {
    return (
        <> <label className="switch">
            <input type="checkbox" onChange={onChange} />
            <span className="slider round"></span>
        </label>
        </>

    )
}
