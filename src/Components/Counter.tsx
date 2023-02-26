import React, {useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";
import {SettingsScreen} from "./SettingsScreen/SettingsScreen";

export const Counter = () => {

    const startCounterValue = 0
    const maxCounterValue = 5
    const [maxValue, setMaxValue] = useState<number>(maxCounterValue)
    const [startValue, setStartValue] = useState<number>(startCounterValue)

    useEffect(() => {
        let valueAsString= localStorage.getItem("counterValue")
        if (valueAsString) {
            let parsedValue = JSON.parse(valueAsString)
            setStartValue(parsedValue)
        }
    }, [])
    useEffect(() => localStorage.setItem("counterValue", JSON.stringify(startValue)), [startValue])



    return (
        <div className={s.counter}>

            <SettingsScreen/>

            <div className={s.counterScreen}>
                <div className={s.count}>
                    <div className={startValue >= maxCounterValue ? s.countError : s.countNoError}>
                        <span>{startValue}</span>
                    </div>
                </div>
                <div className={s.buttons}>
                    <SuperButton callback={() => setStartValue(startValue + 1)}
                                 disabled={startValue >= maxCounterValue}>inc</SuperButton>
                    <SuperButton callback={() => setStartValue(startCounterValue)}
                                 disabled={startValue === startCounterValue}>reset</SuperButton>
                </div>
            </div>

        </div>
    );
};
