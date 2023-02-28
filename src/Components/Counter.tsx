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
        setOnChangeBtnDisable(false)
        setEnterValueMessage(false)
    }


    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxInput(JSON.parse(e.currentTarget.value))

    }
    const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMinInput(JSON.parse(e.currentTarget.value))
    }

    const inputsDisableConditions = minInput < 0 || maxInput <= minInput


    const [error, setError] = useState(false)

    useEffect(() => {
        minInput < 0 || maxInput <= minInput ? setError(true) : setError(false)
    }, [minInput, maxInput])

    const errorMessage = error && "Incorrect value!"


    const [onChangeBtnDisable, setOnChangeBtnDisable] = useState(false)
    const [enterValueMessage, setEnterValueMessage] = useState(false)

    useEffect(() => {
        if (minInput != minValue || maxInput != maxValue) {
            setOnChangeBtnDisable(true)
            setEnterValueMessage(true)
        } else {
            setEnterValueMessage(false)
        }
    }, [minInput, maxInput])

    const enterMessage = enterValueMessage && "enter values and press 'set'"

    return (
        <div className={s.counter}>
            <div className={s.settings}>
                Max:
                <input
                    value={maxInput}
                    onChange={onChangeMaxInputHandler}
                    className={`${s.inputs} ${maxInput <= minInput ? s.maxInputErr : ""}`}
                    type={"number"}/>
                Min:
                <input
                    value={minInput}
                    onChange={onChangeMinInputHandler}
                    className={`${s.inputs} ${minInput < 0 || minInput === maxInput ? s.minInputErr : ""}`}
                    type={"number"}/>
                <div className={s.setButton}><SuperButton callback={setMinMaxValue}
                                                          disabled={inputsDisableConditions}>set</SuperButton></div>
            </div>
            <div className={s.counterScreen}>
                <div className={s.count}>
                    <div className={`${startValue >= maxValue ? s.countError : ""} ${errorMessage ? s.errorMessage : ""}`}>
                        <span>{errorMessage ? errorMessage : enterMessage ? enterMessage : startValue}</span>
                    </div>
                </div>
                <div className={s.buttons}>
                    <SuperButton callback={() => setStartValue(startValue + 1)}
                                 disabled={startValue >= maxValue || onChangeBtnDisable}>inc</SuperButton>
                    <SuperButton callback={() => setStartValue(minInput)}
                                 disabled={startValue === startCounterValue || onChangeBtnDisable}>reset</SuperButton>
                </div>
            </div>

        </div>
    );
};
