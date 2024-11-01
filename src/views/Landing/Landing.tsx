import { Button, Checkbox } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"
import { useState } from "react"
import acceptTnc from "../../thunks/tncThunk"

const Landing = () => {
    const { id, pid } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)

    const [tncLocal, setTncLocal] = useState(tncAccepted)

    const handleTermsChange = () => {
        setTncLocal(!tncLocal)
    }

    const handleNext = async () => {
        if (!pid || !id) {
            return
        }
        if (!tncLocal) {
            alert("Accept Terms & Conditions to continue.")
            return
        }
        const resp = await dispatch(acceptTnc({ pid: pid }))
        if (acceptTnc.fulfilled.match(resp)) {
            navigate(`../instructions/`)
        } else {
            alert("T&C check failed...Please contact Admin")
        }

    }

    return (
        <section className="font-roboto text-colorText py-5">
            <div className="text-5xl py-5">Hey There...</div>
            <div className="text-3xl">Welcome to the Competitive <span className="text-colorPrimary">Wellness</span> Assessment</div>
            <div className="lg:w-[900px] text-lg">
                <p className="py-1">
                    We're excited to have you take part in this assessment about how we can make our workplace better for everyone.
                </p>
                <p className="py-1">
                    We believe four key areas make a business thrive:
                </p>
                <ul>
                    <li>
                        <span className="font-bold">Communication : </span> How well we talk to each other.
                    </li>
                    <li>
                        <span className="font-bold">Capacity : </span> How much work we can handle.
                    </li>
                    <li>
                        <span className="font-bold">Capability : </span> How good we are at our jobs.
                    </li>
                    <li>
                        <span className="font-bold">Connection : </span> How well we work together as a team.
                    </li>
                </ul>
                <p className="py-1">
                    This assessment will help us understand how these pieces fit together in your daily work life. Your answers will show us what's working well and where we can improve.
                    By sharing your insights, you'll help us create a place where everyone can do their best and grow together.
                </p>
                <p className="py-1">
                    Ready to begin? Let's get started!
                </p>
            </div>
            <div className="rounded-lg w-[600px] py-5">
                <Checkbox defaultChecked={tncLocal} onChange={handleTermsChange} className="">I have read and agreed to the <Link to="/tnc" target="_blank">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link></Checkbox>
            </div>
            <div className="py-5">
                <Button size="large" className="p-8 px-20" type="primary" disabled={!tncLocal} onClick={handleNext}>Next</Button>
            </div>
        </section>
    )
}

export default Landing