import { ConfigProvider, Slider, SliderSingleProps } from "antd";
import RangeScaleButton from "../RangeScaleButton/RangeScaleButton";


interface ISliderScale {
    onChange: (answer: number) => void;
    defaultValue: number
}

const sliderTheme = {
    "components": {
        "Slider": {
            "controlSize": 10,
            "handleSize": 20,
            "railSize": 6,
            "handleColor": "rgb(73, 165, 154)",
            "trackBg": "rgb(73, 165, 154)",
            "dotSize": 1
        }
    }
}

const SliderScale = (props: ISliderScale) => {
    const marks: SliderSingleProps['marks'] = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
    };


    const handleOnChange = (val: number) => {
        props.onChange(val)
    }

    return (
        <ConfigProvider theme={sliderTheme}>
            <div className="hidden lg:block w-full lg:w-[800px] gradient-control" key={`sld${props.defaultValue || 0}`}>
                <Slider marks={marks} step={1} defaultValue={props.defaultValue} max={10} min={1} onChangeComplete={handleOnChange} />
            </div>
            <div className="lg:hidden w-full lg:w-[800px] gradient-control" key={`sld${props.defaultValue || 0}`}>
                <RangeScaleButton />
            </div>
        </ConfigProvider>

    )
}

export default SliderScale