import { ConfigProvider, Segmented } from "antd"

interface IOption {
    id?: number | string;
    label: JSX.Element | string;
    value: string | number;
}

interface ILikertScale {
    options: Array<IOption>;
    onChange: (answer: number) => void;
    value: number
}

const likertTheme = {
    "components": {
        "Segmented": {
            "itemSelectedBg": "rgb(73, 165, 154)",
            "itemSelectedColor": "rgb(255, 255, 255)",
            "trackPadding": 1,
            "controlHeight": 47,
            "controlPaddingHorizontal": 25,
            "itemHoverColor": "rgb(73, 165, 154)",
            "trackBg": "#F0F0F0"
        }
    }
}

const LikertScale = (props: ILikertScale) => {

    const options = props.options.map(opt => {
        return {
            label: (
                <div className="lg:w-32 p-3 h-5 lg:h-8 flex items-center justify-center text-base font-bold ">
                    <div>{opt.label}</div>
                </div>
            ),
            value: opt.value,
        }
    })

    const onSegmentChange = (selectedOption: number | string) => {
        props.onChange(Number(selectedOption))
    }

    return (
        <ConfigProvider theme={likertTheme}>
            <div className="gradient-control hidden lg:block" key={`lksd${props.value || 0}`}>
                <Segmented defaultValue={props.value || 1} options={options} block onChange={onSegmentChange} />
            </div>
            <div className="gradient-control flex flex-col gap-3 justify-center items-center lg:hidden my-6">
                <Segmented vertical defaultValue={props.value || 1} options={options} block onChange={onSegmentChange} />
            </div>
        </ConfigProvider>
    )
}

export default LikertScale