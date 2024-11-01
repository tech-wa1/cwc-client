import { Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"
import acceptTnc from "../../thunks/tncThunk"
import { InfoCircleOutlined } from "@ant-design/icons"

const Instructions = () => {
    const { id, pid } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)

    const handleNext = async () => {
        if (!pid || !id) {
            return
        }
        if (!tncAccepted) {
            alert("Accept Terms & Conditions to continue.")
            return
        }
        const resp = await dispatch(acceptTnc({ pid: pid }))
        if (acceptTnc.fulfilled.match(resp)) {
            navigate(`../1/`)
        } else {
            alert("T&C check failed...Please contact Admin")
        }

    }

    return (
        <section className="font-roboto text-colorText py-5">
            <div className="text-5xl py-5">Before we Begin...</div>
            <div className="text-3xl">Here are some instructions for the assessment</div>
            <div className="lg:w-[900px]">
                <ul>
                    <li className='p-2'>
                        There are no right or wrong answers—your authentic opinion matters most. Your unique perspectives will provide valuable insights.
                    </li>
                    <li className='p-2'>
                        Please read each question carefully. Select the option that best represents your view.
                    </li>
                    <li className='p-2'>
                        The survey should take approximately 10 minutes to complete. Please submit by deadline date.
                    </li>
                    <li className='p-2'>
                        Your progress is shown at the top of each page. Use the Next and Back Buttons for navigation. Avoid using your browser buttons to navigate.
                    </li>
                    <li className='p-2'>
                        Questions marked with the icon  <InfoCircleOutlined />  will provide additional information about the question and its expected outcomes.
                    </li>
                    <li className='p-2'>
                        At the end of the survey, click Submit to ensure your responses are recorded.
                    </li>
                    <li className='p-2'>
                        Your individual responses will remain confidential and will only be used in aggregate form.
                    </li>
                    <li className='p-2'>
                        For technical issues, contact <a href="mailto:support@workingas1.com">support@workingas1.com</a>. For questions about survey content, contact <a href="mailto:team@workingas1.com">team@workingas1.com</a>.
                    </li>
                    <li>
                        You can find these instructions through out the assessment on the top right corner.
                    </li>
                </ul>
            </div>
            <div className="py-5">
                <Button size="large" className="p-8 px-20" type="primary" onClick={handleNext}>Begin Assessment</Button>
            </div>
        </section>
    )
}

export default Instructions