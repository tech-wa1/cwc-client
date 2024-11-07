import { Progress } from 'antd'
import { useAppSelector } from '../../hooks/hooks'
import { RootState } from '../../store/store'

const ProgressBar = () => {

    const surveyPercent = useAppSelector((root: RootState) => root.cwc.surveyPercentage)

    return (
        <div>
            <div className='font-roboto text-xs float-right text-slate-500'>{surveyPercent.toFixed(0)}%</div>
            <Progress percent={surveyPercent} showInfo={false} className="" />
        </div>
    )
}

export default ProgressBar