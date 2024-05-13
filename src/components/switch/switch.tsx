import React from 'react';
import './switch.scss';

export default function Switch() {
    return (
        <> <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
        </>

    )
}
