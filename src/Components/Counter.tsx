import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";

const StartCounterValue = 0
const MinCounterValue = 0
const MaxCounterValue = 5

export const Counter = () => {

    const [startValue, setStartValue] = useState(StartCounterValue)
    const [minValue, setMinValue] = useState(MinCounterValue)
    const [maxValue, setMaxValue] = useState(MaxCounterValue)

    const [minInput, setMinInput] = useState(minValue)
    const [maxInput, setMaxInput] = useState(maxValue)

    const [error, setError] = useState(false)

    const [onChangeBtnDisable, setOnChangeBtnDisable] = useState(false)
    const [enterValueMessage, setEnterValueMessage] = useState(false)

    useEffect(() => {
        let valueAsString = localStorage.getItem("counterValue")
        if (valueAsString) {
            let parsedValue = JSON.parse(valueAsString)
            setStartValue(parsedValue)
        }
    }, [])
    useEffect(() => localStorage.setItem("counterValue", JSON.stringify(startValue)), [startValue])

    useEffect(() => {
        let valueAsString = localStorage.getItem("minInputValue")
        if (valueAsString) {
            let parsedValue = JSON.parse(valueAsString)
            setMinInput(parsedValue)
        }
    }, [])
    useEffect(() => localStorage.setItem("minInputValue", JSON.stringify(minInput)), [minInput])

    useEffect(() => {
        let valueAsString = localStorage.getItem("maxInputValue")
        if (valueAsString) {
            let parsedValue = JSON.parse(valueAsString)
            setMaxInput(parsedValue)
        }
    }, [])
    useEffect(() => localStorage.setItem("maxInputValue", JSON.stringify(maxInput)), [maxInput])

    useEffect(() => {
        if (inputsOnchangeParameters) {
            setOnChangeBtnDisable(true)
            setEnterValueMessage(true)
        } else {
            setOnChangeBtnDisable(false)
            setEnterValueMessage(false)
        }
    }, [minInput, maxInput])
    useEffect(() => inputsDisableConditions ? setError(true) : setError(false), [minInput, maxInput])

    const inputsOnchangeParameters = minInput !== minValue || maxInput !== maxValue;
    const inputsDisableConditions = minInput < 0 || maxInput <= minInput
    const enterMessage = enterValueMessage && "enter values and press 'set'"
    const errorMessage = error && "Incorrect value!"
    const maxInputClasses = `${s.inputs} ${s.minInput} ${maxInput <= minInput ? s.InputErr : ""}`
    const minInputClasses = `${s.inputs} ${s.maxInput} ${minInput < 0 || minInput === maxInput ? s.InputErr : ""}`
    const countClasses = `${startValue >= maxValue ? s.settingsOnChangeMessage : ""} ${errorMessage ? s.errorMessage : ""}`
    const countValueClasses = `${!errorMessage && !enterMessage ? s.countValue : ""}`

    const setMinMaxValue = () => {
        setStartValue(minInput)
        setMaxValue(maxInput)
        setOnChangeBtnDisable(false)
        setEnterValueMessage(false)
    }

    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMaxInput(JSON.parse(e.currentTarget.value))
    const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMinInput(JSON.parse(e.currentTarget.value))

    return (
        <div className={s.counter}>
            <div className={s.settingsScreen}>
                <div className={s.mixMaxValues}>
                    <span>Max value:</span>
                    <input
                        value={maxInput}
                        onChange={onChangeMaxInputHandler}
                        className={maxInputClasses}
                        type={"number"}/>
                    <span>Min value:</span>
                    <input
                        value={minInput}
                        onChange={onChangeMinInputHandler}
                        className={minInputClasses}
                        type={"number"}/>
                </div>
                <div className={s.setButton}>
                    <SuperButton
                        callback={setMinMaxValue}
                        disabled={inputsDisableConditions}
                    >
                        set
                    </SuperButton>
                </div>
            </div>
            <div className={s.counterScreen}>
                <div className={s.count}>
                    <div
                        className={countClasses}>
                        <span className={countValueClasses}>{errorMessage ? errorMessage : enterMessage ? enterMessage : startValue}</span>
                    </div>
                </div>
                <div className={s.counterButtons}>
                    <div className={s.buttons}>
                        <div className={s.incButton}>
                            <SuperButton callback={() => setStartValue(startValue + 1)}
                                         disabled={startValue >= maxValue || onChangeBtnDisable}>inc</SuperButton>
                        </div>
                        <div className={s.resetButton}>
                            <SuperButton callback={() => setStartValue(minInput)}
                                         disabled={startValue === StartCounterValue || onChangeBtnDisable}>reset</SuperButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
