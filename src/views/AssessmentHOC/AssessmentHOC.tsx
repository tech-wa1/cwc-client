import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import getSurveyThunk from "../../thunks/getSurveyThunk"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../store/store"
import getResponsesThunk from "../../thunks/getResponsesThunk"
import Success from "../Success/Success"
import getClientValuesThunk from "../../thunks/getClientValuesThunk"

const AssessmentHOC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [loadingSurvey, setLoadingSurvey] = useState(true)
    const isSurveyActive = useAppSelector((root: RootState) => root.cwc.survey_active)
    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)
    const surveyCompleted = useAppSelector((root: RootState) => root.cwc.surveyCompleted)
    const pid = useAppSelector((root: RootState) => root.cwc.pid) || localStorage.getItem("pid") || ""
    const clientId = useAppSelector((root: RootState) => root.cwc.clientId)

    const { id } = useParams()

    const getSurveyDetail = async () => {
        const resp = await dispatch(getSurveyThunk({ id: id || "", pid }))
        await dispatch(getResponsesThunk({ survey: id || "", participant: pid }))
        setLoadingSurvey(false)
        if (getSurveyThunk.fulfilled.match(resp)) {
            if (resp.payload.participant.tnc_accepted) {
                navigate("1")
            } else {
                navigate("start")
            }
        }
        // get response
    }

    const getClientValues = () => {
        dispatch(getClientValuesThunk({ id: clientId || "" }))
    }

    useEffect(() => {
        checkParticipant()
        setLoadingSurvey(true)
        getSurveyDetail()
    }, [])

    //Get core values when client id is updated
    useEffect(() => {
        getClientValues()
    }, [clientId])

    useEffect(() => {
        if (tncAccepted) {
            navigate("1")
        }
    }, [navigate, tncAccepted])



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
                    <Success />
                )
            }
        </>
    )
}

export default AssessmentHOC