import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";


export const Counter = () => {

    let minCounterValue = 0
    let maxCounterValue = 5
    const [minValue, setMinValue] = useState<number>(minCounterValue)
    const [maxValue, setMaxValue] = useState<number>(maxCounterValue)

    const [minInput, setMinInput] = useState(minValue)
    const [maxInput, setMaxInput] = useState(maxValue)

    useEffect(() => {
        let valueAsString = localStorage.getItem("counterValue")
        if (valueAsString) {
            let parsedValue = JSON.parse(valueAsString)
            setMinValue(parsedValue)
        }
    }, [])
    useEffect(() => localStorage.setItem("counterValue", JSON.stringify(minValue)), [minValue])


    const setMinMaxValue = () => {
        setMinValue(minInput)
        setMaxValue(maxInput)
    }

    const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMinInput(JSON.parse(e.currentTarget.value))
    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMaxInput(JSON.parse(e.currentTarget.value))


    return (
        <div className={s.counter}>
            <div className={s.settings}>
                Min:
                <input value={minInput} onChange={onChangeMinInputHandler} className={s.inputs} type={"number"}/>
                Max:
                <input  value={maxInput} onChange={onChangeMaxInputHandler} className={s.inputs} type={"number"}/>
                <div className={s.setButton}><SuperButton callback={setMinMaxValue}>set</SuperButton></div>
            </div>
            <div className={s.counterScreen}>
                <div className={s.count}>
                    <div className={minValue >= maxValue ? s.countError : s.countNoError}>
                        <span>{minValue}</span>
                    </div>
                </div>
                <div className={s.buttons}>
                    <SuperButton callback={() => setMinValue(minValue + 1)}
                                 disabled={minValue >= maxValue}>inc</SuperButton>
                    <SuperButton callback={() => setMinValue(minCounterValue)}
                                 disabled={minValue === minCounterValue}>reset</SuperButton>
                </div>
            </div>

        </div>
    );
};
