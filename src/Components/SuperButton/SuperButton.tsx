import React from 'react';

type SuperButtonType = {
    callback: ()=>void
    children?: React.ReactNode
    disabled?: boolean

}

export const SuperButton: React.FC<SuperButtonType> = (props) => {
    const {callback, children, disabled,  ...otherprops} = props

    const onClickCallback = () => callback()


    return <button onClick={onClickCallback} disabled={disabled}>{children}</button>

};

