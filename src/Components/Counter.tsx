import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../Redux/store/store";
import {
    changeMaxInputAC,
    changeMinInputAC,
    disableButtonAC,
    incrementAC,
    resetAC,
    StateType
} from "../Redux/reducers/counterReducer";


const StartCounterValue = 0
const MinCounterValue = 0
const MaxCounterValue = 5

export const Counter = () => {

    const dispatch = useDispatch()
    const counterValues = useSelector<AppStoreType, StateType>((state) => state.counter)

    const [startValue, setStartValue] = useState(StartCounterValue)
    const [minValue, setMinValue] = useState(MinCounterValue)
    const [maxValue, setMaxValue] = useState(MaxCounterValue)

    const [minInput, setMinInput] = useState(minValue)
    const [maxInput, setMaxInput] = useState(maxValue)

    const [error, setError] = useState(false)

    const [onChangeBtnDisable, setOnChangeBtnDisable] = useState(false)
    const [enterValueMessage, setEnterValueMessage] = useState(false)

    // useEffect(() => {
    //     let valueAsString = localStorage.getItem("counterValue")
    //     if (valueAsString) {
    //         let parsedValue = JSON.parse(valueAsString)
    //         setStartValue(parsedValue)
    //     }
    // }, [])
    // useEffect(() => localStorage.setItem("counterValue", JSON.stringify(startValue)), [startValue])
    // useEffect(() => {
    //     let valueAsString = localStorage.getItem("minInputValue")
    //     if (valueAsString) {
    //         let parsedValue = JSON.parse(valueAsString)
    //         setMinInput(parsedValue)
    //     }
    // }, [])
    // useEffect(() => localStorage.setItem("minInputValue", JSON.stringify(minInput)), [minInput])
    // useEffect(() => {
    //     let valueAsString = localStorage.getItem("maxInputValue")
    //     if (valueAsString) {
    //         let parsedValue = JSON.parse(valueAsString)
    //         setMaxInput(parsedValue)
    //     }
    // }, [])
    // useEffect(() => localStorage.setItem("maxInputValue", JSON.stringify(maxInput)), [maxInput])
    // localstorage


    useEffect(() => {
        if (inputsOnchangeParameters) {
            dispatch(disableButtonAC())
            setEnterValueMessage(true)
        } else {
            setOnChangeBtnDisable(false)
            setEnterValueMessage(false)
        }
    }, [minInput, maxInput])

    useEffect(() => inputsDisableConditions ? setError(true) : setError(false), [minInput, maxInput])

    const inputsOnchangeParameters = counterValues.minInput !== counterValues.minValue || counterValues.maxInput !== counterValues.maxValue;
    const inputsDisableConditions = minInput < 0 || maxInput <= minInput

    const enterMessage = enterValueMessage && "enter values and press 'set'"
    const errorMessage = error && "Incorrect value!"

    const countValueVariants = errorMessage ? errorMessage : enterMessage ? enterMessage : startValue

    const maxInputClasses = `${s.inputs} ${s.minInput} ${maxInput <= minInput ? s.InputErr : ""}`
    const minInputClasses = `${s.inputs} ${minInput < 0 || minInput === maxInput ? s.InputErr : ""}`
    const countClasses = `${startValue >= maxValue ? s.settingsOnChangeMessage : ""} ${errorMessage ? s.errorMessage : ""}`
    const countValueClasses = `${!errorMessage && !enterMessage ? s.countValue : ""}`




    const setMinMaxValue = () => {
        setStartValue(minInput)
        setMaxValue(maxInput)
        setOnChangeBtnDisable(false)
        setEnterValueMessage(false)
    }

    const increment = () => {
        dispatch(incrementAC())
        // setStartValue(startValue + 1)
    }
     const reset = () => {
        dispatch(resetAC())
         // setStartValue(minInput)
    }

    const changeMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMaxInputAC(JSON.parse(e.currentTarget.value)))
    }
    const changeMinInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMinInputAC(JSON.parse(e.currentTarget.value)))
    }

    // const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMaxInput(JSON.parse(e.currentTarget.value))
    // const onChangeMinInputHandler = (e: ChangeEvent<HTMLInputElement>) => setMinInput(JSON.parse(e.currentTarget.value))

    return (
        <div className={s.counter}>
            <div className={s.settingsScreen}>
                <div className={s.mixMaxValues}>
                    <div className={s.maxInput}>
                        <span className={s.inputValue}>Max value:</span>
                        <input
                            value={maxInput}
                            onChange={changeMaxInput}
                            className={maxInputClasses}
                            type={"number"}/>
                    </div>
                    <div className={s.minInput}>
                        <span className={s.inputValue}>Min value: </span>
                        <input
                            value={minInput}
                            onChange={changeMinInput}
                            className={minInputClasses}
                            type={"number"}/>
                    </div>
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
                        <span
                            className={countValueClasses}>{countValueVariants}</span>
                    </div>
                </div>
                <div className={s.counterButtons}>
                    <div className={s.buttons}>
                        <div className={s.incButton}>
                            <SuperButton callback={increment}
                                         disabled={startValue >= maxValue || counterValues.buttonDisable}>inc</SuperButton>
                        </div>
                        <div className={s.resetButton}>
                            <SuperButton callback={reset}
                                         disabled={startValue === StartCounterValue || counterValues.buttonDisable}>reset</SuperButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
