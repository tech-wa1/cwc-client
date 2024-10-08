import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, Checkbox } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import acceptTnc from "../../thunks/tncThunk"
import { RootState } from "../../store/store"
import { useState } from "react"

const Instructions = () => {

    const { id, pid } = useParams()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)

    const [tncLocal, setTncLocal] = useState(tncAccepted)

    const handleTermsChange = () => {
        setTncLocal(!tncLocal)
    }

    const handleStartSurvey = async () => {
        if (!pid) {
            return
        }
        if (!tncLocal) {
            alert("Accept Terms & Conditions to continue.")
            return
        }
        const resp = await dispatch(acceptTnc({ pid: pid }))
        if (acceptTnc.fulfilled.match(resp)) {
            navigate(`/${id}/assessment/${pid}/1`)
        } else {
            alert("T&C check failed...Please contact Admin")
        }

    }

    return (
        <section className="m-3 font-roboto text-colorText text-sm lg:text-base lg:m-10">
            <div className="flex border-solid border-0 border-b border-colorPrimary lg:fixed w-full bg-white top-0 left-0">
                <div className="py-2 lg:p-5 lg:w-9/12 text-xl font-bold lg:text-3xl lg:flex items-center">Welcome to your company's <div className="text-colorPrimary px-2 inline"> Wellness</div> Check</div>
                <div className="p-3 lg:w-3/12 hidden lg:block">
                    <Button className="w-full h-12" type="primary" size="large" disabled={!tncLocal} onClick={handleStartSurvey}>Start Survey</Button>
                    <Checkbox defaultChecked={tncLocal} className="lg:text-xs py-2 text-left" onChange={handleTermsChange}>I have read and agreed to the
                        <Link to="/tnc" target="_blank"> Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>
                    </Checkbox>
                </div>
            </div>

            <div className="lg:flex lg:pt-24 items-start justify-evenly lg:m-auto">
                <div className="py-2 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">About</h3>
                    <p className="py-1 text-justify">
                        In the modern workplace, fostering a high functioning business hinge on several critical business performance drivers: <div className="font-bold">communication, capacity, capability and connection.</div>
                    </p>

                    <p className="py-1 text-justify">
                        These elements not only promote the success of employees and teams but also ensure that the business stays aligned with its overarching goals and values.
                    </p>

                    <p className="py-1 text-justify">
                        The Competitive Wellness Assessment evaluates these essential components, providing insights into how they collectively shape the workplace environment. By examining communication, capacity, capability, and connection, the assessment identifies areas of strength and opportunities for improvement, ultimately helping organizations enhance engagement, boost productivity, and drive sustainable growth.
                    </p>
                </div>
                <div className="py-3 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">Instructions</h3>
                    <ul className="px-3 tracking-wide">
                        <li className="py-1 text-justify">This confidential assessment is designed to gather your honest feedback to help drive meaningful improvements. Your unique perspectives are invaluable, and your input will provide us with essential insights. Remember, there are no right or wrong answers—what matters most is your genuine opinion.</li>
                        <li className="py-1 text-justify">Please read each question thoroughly and choose the option that best reflects your perspective.</li>
                        <li className="py-1 text-justify">The survey typically takes around 15 minutes to complete. We recommend finishing it in one sitting for the best experience.</li>
                        <li className="py-1 text-justify">Your progress is shown at the top of each page. Use the
                            <Button type="primary" size="small" className="px-5 h-6 mx-2 text-xs">Next</Button>
                            button to move forward and
                            <div className="border border-solid border-slate-300 mx-2 inline-block rounded-lg p-0 ">
                                <ArrowLeftOutlined className="p-1 px-2 text-sm" />
                            </div>
                            button to navigate back. Please avoid using your browser's navigation buttons to move through the survey.</li>
                        <li className="py-1 text-justify">Questions marked with the icon <InfoCircleOutlined /> will offer additional details about the question and its intended outcomes.</li>
                        <li className="py-1 text-justify">At the end of the survey, please click
                            <Button type="primary" size="small" className="px-5 h-6 mx-2 text-xs">Submit</Button>
                            to ensure your responses are recorded.</li>
                        <li className="py-1 text-justify">Your individual responses will be kept confidential and will only be utilized in aggregate form.</li>
                        <li className="py-1 text-justify">For technical issues, contact <a href="mailto:support@workingas1.com">support@workingas1.com</a>. For questions
                            about survey content, contact <a href="mailto:team@workingas1.com">team@workingas1.com</a>.</li>
                        <li className="py-1 text-justify">Please remember that your honest feedback is invaluable and will play a significant role in enhancing the workplace.</li>
                    </ul>
                </div>
            </div>
            <div className="py-3 lg:p-3 lg:hidden">
                <Checkbox defaultChecked={tncLocal} className="lg:text-xs py-2 text-left" onChange={handleTermsChange}>I have read and agreed to the <Link to="/tnc" target="_blank">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link></Checkbox>
            </div>
            <div className="py-3 w-full lg:hidden">
                <Button className="w-full h-12" type="primary" size="large" disabled={!tncLocal} onClick={handleStartSurvey}>Start Survey</Button>
            </div>
        </section >
    )
}

export default Instructions