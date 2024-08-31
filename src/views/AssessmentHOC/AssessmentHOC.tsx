import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import getSurveyThunk from "../../thunks/getSurveyThunk"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../store/store"
import getResponsesThunk from "../../thunks/getResponsesThunk"
import Success from "../Success/Success"
import getClientValuesThunk from "../../thunks/getClientValuesThunk"
import { updatePid } from "../../store/cwcSlice"

const AssessmentHOC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id, pid } = useParams()

    const [loadingSurvey, setLoadingSurvey] = useState(true)
    const isSurveyActive = useAppSelector((root: RootState) => root.cwc.survey_active)
    const tncAccepted = useAppSelector((root: RootState) => root.cwc.tncAccepted)
    const surveyCompleted = useAppSelector((root: RootState) => root.cwc.surveyCompleted)

    const clientId = useAppSelector((root: RootState) => root.cwc.clientId)


    const getSurveyDetail = async () => {
        if (!pid) {
            return
        }
        const resp = await dispatch(getSurveyThunk({ id: id || "", pid }))
        await dispatch(getResponsesThunk({ survey: id || "", participant: pid }))
        setLoadingSurvey(false)
        if (getSurveyThunk.fulfilled.match(resp)) {
            navigate("./start")
        }
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
        if (!pid) {
            navigate("../login")
        } else {
            dispatch(updatePid(pid))
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