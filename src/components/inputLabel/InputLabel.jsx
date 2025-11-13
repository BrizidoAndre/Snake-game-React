import {useId} from "react";

export const InputLabel = ({children,value,setValue, type = 'text'}) => {

    const inputId =useId();

    return(
        <div className={'container-input'}>
            <label htmlFor={inputId}>{children}</label>
            <input type={type} id={inputId} value={value} onChange={setValue}/>
        </div>
    )
}