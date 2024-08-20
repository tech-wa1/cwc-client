import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, Checkbox, Radio } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import acceptTnc from "../../thunks/tncThunk"
import { RootState } from "../../store/store"
import { useState } from "react"

const Instructions = () => {

    const { id } = useParams()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)
    const pid = useAppSelector((root: RootState) => root.cwc.pid)

    const [tncLocal, setTncLocal] = useState(tncAccepted)

    const handleTermsChange = () => {
        setTncLocal(!tncLocal)
    }

    const handleStartSurvey = async () => {
        if (!tncLocal) {
            alert("Accept Terms & Conditions to continue.")
            return
        }
        const resp = await dispatch(acceptTnc({ id: id || "", pid: pid || "" }))
        if (acceptTnc.fulfilled.match(resp)) {
            navigate(`/${id}/assessment/1`)
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
                    <Checkbox defaultChecked={tncLocal} className="lg:text-xs py-2 text-left" onChange={handleTermsChange}>I have read and agreed to the <Link to="/tnc" target="_blank">Terms & Conditions</Link></Checkbox>
                </div>
            </div>

            <div className="lg:flex lg:pt-24 items-start justify-evenly lg:m-auto">
                <div className="py-2 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">About</h3>
                    <p className="py-1 text-justify">
                        In the modern workplace, fostering a high functioning business hinge on several critical business performance drivers: communication, capacity, capability and connection.
                    </p>

                    <p className="py-1 text-justify">
                        These elements not only drive employee and team success but also ensure that the business remains aligned with its overarching goals and values.
                    </p>

                    <p className="py-1 text-justify">
                        This Competitive Wellness assesment reports on these essential components, providing insights into how they collectively shape the workplace environment in mastering engagement, productivity and growth.
                    </p>
                </div>
                <div className="py-3 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">Instructions</h3>
                    <ul className="px-3 tracking-wide">
                        <li className="py-1 text-justify">This confidential assessment seeks your honest feedback to
                            drive positive change. Your unique perspectives will provide
                            valuable insights. There are no right or wrong answers—your
                            authentic opinion matters most.</li>
                        <li className="py-1 text-justify">Please read each question carefully. Select the option that best
                            represents your view.</li>
                        <li className="py-1 text-justify">Your participation is voluntary, and you can exit or pause the survey at
                            any time. Use the provided link to return later if needed.</li>
                        <li className="py-1 text-justify">The survey should take approximately 15 minutes to complete. Please
                            submit by deadline date.</li>
                        <li className="py-1 text-justify">Your progress is shown at the top of each page. Use the
                            <Button type="primary" size="small" className="px-5 h-6 mx-2 text-xs">Next</Button>
                            button to move forward and
                            <div className="border border-solid border-slate-300 mx-2 inline-block rounded-lg p-0 ">
                                <ArrowLeftOutlined className="p-1 px-2 text-sm" />
                            </div>
                            button to navigate back. Avoid using your browser buttons to navigate.</li>
                        <li className="py-1 text-justify">Questions marked with the icon <InfoCircleOutlined /> will provide additional
                            information about the question and its expected outcomes.</li>
                        <li className="py-1 text-justify">At the end of the survey, click
                            <Button type="primary" size="small" className="px-5 h-6 mx-2 text-xs">Submit</Button>
                            to ensure your responses are
                            recorded.</li>
                        <li className="py-1 text-justify">Your individual responses will remain confidential and will only be used
                            in aggregate form.</li>
                        <li className="py-1 text-justify">For technical issues, contact <a href="mailto:support@workingas1.com">support@workingas1.com</a>. For questions
                            about survey content, contact <a href="mailto:team@workingas1.com">team@workingas1.com</a>.</li>
                        <li className="py-1 text-justify">Remember, your honest feedback is valuable and will contribute
                            to workplace improvements.</li>
                    </ul>
                </div>
            </div>
            <div className="py-3 lg:p-3 lg:hidden">
                <Checkbox defaultChecked={tncLocal} className="lg:text-xs py-2 text-left" onChange={handleTermsChange}>I have read and agreed to the <Link to="/tnc" target="_blank">Terms & Conditions</Link></Checkbox>
            </div>
            <div className="py-3 w-full lg:hidden">
                <Button className="w-full h-12" type="primary" size="large" disabled={!tncLocal} onClick={handleStartSurvey}>Start Survey</Button>
            </div>
        </section >
    )
}

export default Instructions