import { InfoCircleOutlined } from "@ant-design/icons"
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
                    <Checkbox defaultChecked={tncLocal} className="lg:text-xs py-2 text-center" onChange={handleTermsChange}>I have read and agreed to the <Link to="/tnc" target="_blank">Terms & Conditions</Link></Checkbox>
                </div>
            </div>

            <div className="lg:flex lg:pt-24 items-start justify-evenly lg:m-auto">
                <div className="py-2 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">About</h3>
                    <p className="py-1">This is a template for designing wireframes when you want to present your document to clients.</p>
                    <p className="py-1">Mockups is made for low-fidelity, rapid idea generation. We believe it's best to use the Sketch Skin when you're working internally, within your team. However, when it comes time to present to clients, many people want to present something that doesn't have that Sketchy look. This template works well in those cases when you want to use the Wireframe Skin.</p>
                    <p className="py-1">Whether you work in an agency and need to present something a little cleaner to clients, or you work in a company that is going to present your ideas to stakeholders that want to see something polished, this</p>
                </div>
                <div className="py-3 lg:w-5/12">
                    <h3 className="text-colorPrimary lg:text-2xl">Instructions</h3>
                    <ul className="px-3 tracking-wide">

                        <li className="py-1">This confidential assessment seeks your honest feedback to
                            drive positive change. Your unique perspectives will provide
                            valuable insights. There are no right or wrong answers—your
                            authentic opinion matters most.</li>
                        <li className="py-1">Please read each question carefully. Select the option that best
                            represents your view.</li>
                        <li className="py-1">Your participation is voluntary, and you can exit or pause the survey at
                            any time. Use the provided link to return later if needed.</li>
                        <li className="py-1">The survey should take approximately 15 minutes to complete. Please
                            submit by [deadline date].</li>
                        <li className="py-1">Your progress is shown at the top of each page. Use the "Next" and
                            "Back" buttons to navigate, not your browser buttons.</li>
                        <li className="py-1">Questions marked with the icon <InfoCircleOutlined /> will provide additional
                            information about the question and its expected outcomes.</li>
                        <li className="py-1">At the end of the survey, click "Submit" to ensure your responses are
                            recorded.</li>
                        <li className="py-1">Your individual responses will remain confidential and will only be used
                            in aggregate form.</li>
                        <li className="py-1">For technical issues, contact <a href="mailto:support@workingas1.com">support@workingas1.com</a>. For questions
                            about survey content, contact <a href="mailto:team@workingas1.com">team@workingas1.com</a>.</li>
                        <li className="py-1">Remember, your honest feedback is valuable and will contribute
                            to workplace improvements.</li>
                    </ul>
                </div>
            </div>
            <div className="py-3 lg:p-3 lg:hidden">
                <Radio className="lg:text-lg" onChange={handleTermsChange}>I have read and agreed to the <Link to="/tnc">Terms & Conditions</Link></Radio>
            </div>
            <div className="py-3 w-full lg:hidden">
                <Button className="w-full h-12" type="primary" size="large" disabled={!tncLocal} onClick={handleStartSurvey}>Start Survey</Button>
            </div>
        </section >
    )
}

export default Instructions