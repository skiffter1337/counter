import React from 'react';
import s from "./SettingsScreen.module.css"
import {SuperButton} from "../SuperButton/SuperButton";

export const SettingsScreen = () => {
    return (
        <div className={s.settings}>
            <div className={s.inputs}>
                <span>Max value</span>
                <input className={s.minValueInput} type={"number"}/>
                <span>Min value</span>
                <input className={s.maxValueInput} type={"number"}/>
            </div>
            <div className={s.setButton}><SuperButton callback={() => {}}>set</SuperButton></div>
        </div>
    );
};

