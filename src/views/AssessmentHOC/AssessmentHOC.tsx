import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import getSurveyThunk from "../../thunks/getSurveyThunk"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../store/store"
import { Button } from "antd"
import getResponsesThunk from "../../thunks/getResponsesThunk"

const AssessmentHOC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [loadingSurvey, setLoadingSurvey] = useState(true)
    const isSurveyActive = useAppSelector((root: RootState) => root.cwc.survey_active)
    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)
    const surveyCompleted = useAppSelector((root: RootState) => root.cwc.surveyCompleted)
    const pid = useAppSelector((root: RootState) => root.cwc.pid) || localStorage.getItem("pid") || ""

    const { id } = useParams()

    const getSurveyDetail = async () => {
        const resp = await dispatch(getSurveyThunk({ id: id || "", pid }))
        await dispatch(getResponsesThunk({ survey: id || "", participant: pid }))
        setLoadingSurvey(false)
        if (getSurveyThunk.fulfilled.match(resp)) {
            if (resp.payload.tnc_accepted) {
                navigate("1")
            } else {
                navigate("start")
            }
        }
        // get response
    }

    useEffect(() => {
        checkParticipant()
        setLoadingSurvey(true)
        getSurveyDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (tncAccepted) {
            navigate("1")
        }
    }, [navigate, tncAccepted])

    const goToLogin = () => {
        navigate("../login")
    }

    const checkParticipant = () => {
        const local_pid = localStorage.getItem("pid")
        if (!pid || !local_pid) {
            navigate("../login")
        }
    }

    return (
        <>
            {
                loadingSurvey && (
                    <div className="w-full h-[40vh] flex items-center justify-center text-colorText text-2xl">Loading Assessment...Please wait</div>
                )
            }

            {
                !loadingSurvey && isSurveyActive && !surveyCompleted && (
                    <Outlet />
                )
            }

            {
                !loadingSurvey && !isSurveyActive && (
                    <div className="w-full h-[40vh] flex items-center justify-center text-colorText text-2xl">This assessment is not active...Please contact Admin</div>
                )
            }

            {
                !loadingSurvey && isSurveyActive && surveyCompleted && (
                    <div className="h-[40vh] flex flex-col items-center justify-center text-roboto">
                        <div className="w-full flex items-center justify-center text-colorText text-2xl">You are all set...this assessment is complete</div>
                        <Button type="link" onClick={goToLogin}>Back to login</Button>
                    </div>
                )
            }
        </>
    )
}

export default AssessmentHOC