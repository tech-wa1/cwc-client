import { ConfigProvider, Slider, SliderSingleProps } from "antd";

const sliderTheme = {
    "components": {
        "Slider": {
            "controlSize": 10,
            "handleSize": 20,
            "railSize": 12,
            "handleColor": "rgb(73, 165, 154)",
            "trackBg": "rgb(73, 165, 154)",
            "dotSize": 2
        }
    }
}

const SliderScale = () => {
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

    return (
        <ConfigProvider theme={sliderTheme}>
            <div className="w-full lg:w-[800px] gradient-control">
                <Slider marks={marks} step={1} defaultValue={2} max={10} min={1} />
            </div>
        </ConfigProvider>

    )
}

export default SliderScale