import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";


export const Counter = () => {

    let startCounterValue = 0
    let minCounterValue = 0
    let maxCounterValue = 5
    const [startValue, setStartValue] = useState<number>(startCounterValue)
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
        setStartValue(minInput)
        setMaxValue(maxInput)
    }

    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMaxInput(JSON.parse(e.currentTarget.value))
    const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMinInput(JSON.parse(e.currentTarget.value))



    return (
        <div className={s.counter}>
            <div className={s.settings}>
                Max:
                <input value={maxInput} onChange={onChangeMaxInputHandler} className={s.inputs} type={"number"}/>
                Min:
                <input value={minInput} onChange={onChangeMinInputHandler} className={s.inputs} type={"number"}/>
                <div className={s.setButton}><SuperButton callback={setMinMaxValue}>set</SuperButton></div>
            </div>
            <div className={s.counterScreen}>
                <div className={s.count}>
                    <div className={startValue >= maxValue ? s.countError : s.countNoError}>
                        <span>{startValue}</span>
                    </div>
                </div>
                <div className={s.buttons}>
                    <SuperButton callback={() => setStartValue(startValue + 1)}
                                 disabled={startValue >= maxValue}>inc</SuperButton>
                    <SuperButton callback={() => setStartValue(minInput)}
                                 disabled={startValue === startCounterValue}>reset</SuperButton>
                </div>
            </div>

        </div>
    );
};
