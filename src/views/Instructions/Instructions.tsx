import { InfoCircleOutlined } from "@ant-design/icons"
import { Button, Radio } from "antd"
import { Link } from "react-router-dom"

const Instructions = () => {
    return (
        <section className="m-3 font-roboto text-colorText text-sm lg:text-base lg:m-10">
            <div className="flex border-solid border-0 border-b border-colorPrimary">
                <div className="py-2 lg:py-5 lg:w-9/12 text-xl font-bold lg:text-3xl">Welcome to your company's <span className="text-colorPrimary">Wellness</span> Check</div>
                <div className="py-3 lg:w-3/12 hidden lg:block">
                    <Button className="w-full h-12" type="primary" size="large">Start Survey</Button>
                </div>
            </div>

            <div className="lg:flex items-start justify-evenly lg:m-auto">
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
            <div className="py-3 lg:p-3">
                <Radio className="lg:text-lg">I have read and agreed to the <Link to="/tnc">Terms & Conditions</Link></Radio>
            </div>
            <div className="py-3 w-full lg:hidden">
                <Button className="w-full h-12" type="primary" size="large">Start Survey</Button>
            </div>
        </section >
    )
}

export default Instructions