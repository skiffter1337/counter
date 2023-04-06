import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Counter.module.css"
import {SuperButton} from "./SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../Redux/store/store";
import {
    changeMaxInputAC, changeMaxValueAC,
    changeMinInputAC, changeStartValueAC,
    disableButtonAC,
    incrementAC,
    resetAC, showMessageAC,
    StateType
} from "../Redux/reducers/counterReducer";


// const StartCounterValue = 0
// const MinCounterValue = 0
// const MaxCounterValue = 5

export const Counter = () => {

    const dispatch = useDispatch()
    const counterValues = useSelector<AppStoreType, StateType>((state) => state.counter)

    // const [startValue, setStartValue] = useState(StartCounterValue)
    // const [minValue, setMinValue] = useState(MinCounterValue)
    // const [maxValue, setMaxValue] = useState(MaxCounterValue)
    //
    // const [minInput, setMinInput] = useState(minValue)
    // const [maxInput, setMaxInput] = useState(maxValue)
    //
    const [error, setError] = useState(false)
    //
    // const [onChangeBtnDisable, setOnChangeBtnDisable] = useState(false)
    // const [enterValueMessage, setEnterValueMessage] = useState(false)

    // old state



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
            dispatch(disableButtonAC(true))
            dispatch(showMessageAC(true))
        } else {
            dispatch(disableButtonAC(false))
            dispatch(showMessageAC(false))
        }
    }, [counterValues.minInput, counterValues.maxInput])

    useEffect(() => inputsDisableConditions ? setError(true) : setError(false), [counterValues.minInput, counterValues.maxInput])

    const inputsOnchangeParameters = counterValues.minInput !== counterValues.minValue || counterValues.maxInput !== counterValues.maxValue;
    const inputsDisableConditions = counterValues.minInput < 0 || counterValues.maxInput <= counterValues.minInput
    const maxInputClasses = `${s.inputs}  ${counterValues.maxInput <= counterValues.minInput ? s.InputErr : ""}`
    const minInputClasses = `${s.inputs} ${counterValues.minInput < 0 || counterValues.minInput >= counterValues.maxInput ? s.InputErr : ""}`


    const showMessage = counterValues.showMessage && "enter values and press 'set'"
    const errorMessage = error && "Incorrect value!"

    const countValueVariants = errorMessage ? errorMessage : showMessage ? showMessage : counterValues.startValue



    const countClasses = `${counterValues.startValue >= counterValues.maxValue ? s.settingsOnChangeMessage : ""} ${errorMessage ? s.errorMessage : ""}`
    const countValueClasses = `${!errorMessage && !showMessage ? s.countValue : ""}`




    const setMinMaxValue = () => {
        dispatch(changeStartValueAC())
        dispatch(changeMaxValueAC())
        dispatch(disableButtonAC(false))
        dispatch(showMessageAC(false))
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
                            value={counterValues.maxInput}
                            onChange={changeMaxInput}
                            className={maxInputClasses}
                            type={"number"}/>
                    </div>
                    <div className={s.minInput}>
                        <span className={s.inputValue}>Min value: </span>
                        <input
                            value={counterValues.minInput}
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
                                         disabled={counterValues.startValue >= counterValues.maxValue  || counterValues.buttonDisable}>inc</SuperButton>
                        </div>
                        <div className={s.resetButton}>
                            <SuperButton callback={reset}
                                         disabled={counterValues.startValue === 0 || counterValues.buttonDisable}>reset</SuperButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
