import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";


interface ITextField {
    onChange: (answer: string) => void;
    defaultValue: string;
    placeholder: string;
    rows?: number;
}


const TextField = (props: ITextField) => {

    const handleOnChange = (val: string) => {
        setValue(val)
        props.onChange(val)
    }

    const [value, setValue] = useState("")

    useEffect(() => {
        setValue(props.defaultValue)
    }, [props.defaultValue])

    return (
        <div className="w-full lg:w-[800px] gradient-control">
            <TextArea className="border-slate-300 border-2" rows={props.rows || 4} placeholder={props.placeholder} value={value} onChange={(e) => handleOnChange(e.target.value)} />
        </div>

    )
}

export default TextField