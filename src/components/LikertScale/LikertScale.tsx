import { CheckCircleOutlined } from "@ant-design/icons";
import "./likertScale.css";
import { useEffect, useState } from "react";

interface IOption {
    id?: number | string;
    label: JSX.Element | string;
    value: number;
    icon_url?: string;
}

interface ILikertScale {
    options: Array<IOption>;
    onChange: (answer: number) => void;
    value: number
}

const LikertScale = (props: ILikertScale) => {

    const [activeOption, setActiveOption] = useState<number>()

    const handleOptionSelect = (option: IOption) => {
        setActiveOption(option.value)
        props.onChange(option.value)
    }

    useEffect(() => {
        setActiveOption(props.value)
    }, [props.value])

    return (
        <div className="flex-col flex lg:flex-row items-start lg:items-center justify-start">
            {props.options.map((option, index) => (
                <div key={option.id} className="my-3 lg:mr-3 w-full lg:w-auto">
                    <div
                        className={`relative lg:h-56 lg:w-40 border border-solid border-slate-200 rounded-2xl p-2 shadow-lg hover:bg-colorSecondary cursor-pointer text-colorText hover:text-white flex items-center lg:block ${option.value === activeOption ? 'active shadow-xl' : ''}`}
                        onClick={() => handleOptionSelect(option)}
                        tabIndex={index}
                        onKeyUp={event => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleOptionSelect(option)
                            }
                        }}
                    >
                        {
                            option.value === activeOption && (
                                <CheckCircleOutlined className="text-colorPrimary text-2xl absolute top-2 right-2" />
                            )
                        }
                        <div className="flex items-center justify-center w-10 lg:w-20 p-5 lg:p-5 lg:py-7 lg:m-auto">
                            <img className="w-full" src={option.icon_url} alt="option image" />
                        </div>
                        <div className='text-3xl lg:text-center font-thin' >
                            {option.label}
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default LikertScale