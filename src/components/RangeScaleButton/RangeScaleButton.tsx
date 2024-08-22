import { Button } from "antd"

const RangeScaleButton = () => {

    return (
        <div className="m-auto w-full flex flex-wrap items-center justify-center">
            {[...Array(5)].map((value, index) => (
                <Button type="default" className="p-5 text-lg bg-slate-50 m-3 text-slate-500">{index + 1}</Button>
            ))}
            {[...Array(5)].map((value, index) => (
                <Button type="default" className="p-5 text-lg bg-slate-50 m-3 text-slate-500">{index + 6}</Button>
            ))}
        </div>
    )
}

export default RangeScaleButton