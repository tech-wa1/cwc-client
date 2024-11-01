import { useEffect, useState } from "react"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import { IQuestion, IResponse } from "../../common/types"
import TextField from "../../components/TextField/TextField"
import { Button, Modal } from "antd"
// import setValueResponsesThunk from "../../thunks/setValueResponseThunk"
import { updateResponses, updateSurveyProgress } from "../../store/cwcSlice"
import { setResponsesThunk, setTextFieldResponsesThunk } from "../../thunks/setResponsesThunk"
import completeSurveyThunk from "../../thunks/completeSurveyThunk"
import SliderScale from "../../components/SliderScale/SliderScale"
import LikertScale from "../../components/LikertScale/LikertScale"


const defaultOptions = [{
    label: 'No',
    value: 0
},
{
    label: 'Probably',
    value: 1
},
{
    label: 'Likely',
    value: 2
}]

const Assessment = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const q_index = parseInt(useParams()?.qindex || "0");
    const { id } = useParams()
    // const currentQuestionIndex = q_index - 1;

    const questions = useAppSelector((root: RootState) => root.cwc.questions)
    const responses = useAppSelector((root: RootState) => root.cwc.responses)
    const pid = useAppSelector((root: RootState) => root.cwc.pid)
    const coreValues = useAppSelector((root: RootState) => root.cwc.coreValues)

    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null)
    const [currentQuestionResponse, setCurrentQuestionResponse] = useState<IResponse | null>(null)
    const [currentTextAnswer, setCurrentTextAnswer] = useState<string>("")
    const [currentNumberAnswer, setCurrentNumberAnswer] = useState<number>(0)

    useEffect(() => {
        let question: IQuestion | null = null
        if (questions.length > 0) {
            question = questions.filter((q) => q.q_index === q_index)[0]
        }
        if (!question) {
            return
        }
        setCurrentQuestion({ ...question })
        if (responses.length > 0) {
            const currentResponse = responses.filter((res) => res.question === question?.id)
            if (!currentResponse || currentResponse.length <= 0) {
                return
            }
            setCurrentQuestionResponse({ ...currentResponse[0] })
            if (question?.question_type.type === "text_field") {
                setCurrentTextAnswer(currentResponse[0].answer_text || "")
            } else {
                setCurrentNumberAnswer(currentResponse[0].answer || 1)
            }
        }
    }, [q_index])


    const handleTextFieldControlChange = (val: string) => {
        setCurrentTextAnswer(val)
    }

    const handleNumberFieldControlChange = (val: number) => {
        setCurrentNumberAnswer(val)
    }

    const getDefaultValue = () => {
        return coreValues.map(cv => {
            return {
                value: cv.id,
                answer: 1
            }
        })
    }

    const handleSubmit = () => {
        setShowSubmitModal(true)
    }

    const moveToNext = () => {
        if (questions.length > q_index) {
            navigate(`../${q_index + 1}`)
            dispatch(updateSurveyProgress((q_index + 1) * (100 / questions.length)))
        } else if (questions.length === q_index) {
            navigate('../thankyou')
        }

    }

    const updateValueInStore = (data: IResponse, q_type: string) => {
        const responsesCopy = responses.map(resp => {
            if (resp.question === data.question) {
                if (q_type === "text_field") {
                    const respCopy = { ...resp }
                    respCopy.answer_text = data.answer_text
                    return respCopy
                } else {
                    const respCopy = { ...resp }
                    respCopy.answer = data.answer
                    return respCopy
                }

            }
            return resp
        })

        dispatch(updateResponses([...responsesCopy]))
    }

    const handleNext = async (isSubmit: Boolean = false) => {
        if (!currentQuestion || !id) {
            return
        }

        if (currentQuestion.question_type.type === "text_field") {
            const data = {
                survey: id,
                participant: pid,
                question: Number(currentQuestion.id),
                answer_text: currentTextAnswer,
                answer: null
            }
            const resp = await dispatch(setTextFieldResponsesThunk(data))
            if (setTextFieldResponsesThunk.fulfilled.match(resp)) {
                updateValueInStore(data, currentQuestion.question_type.type)
                isSubmit ? handleSubmit() : moveToNext()
            }
        } else {
            const data = {
                survey: id,
                participant: pid,
                question: Number(currentQuestion.id),
                answer: currentNumberAnswer,
            }
            const resp = await dispatch(setResponsesThunk(data))
            if (setResponsesThunk.fulfilled.match(resp)) {
                updateValueInStore(data, currentQuestion.question_type.type)
                isSubmit ? handleSubmit() : moveToNext()
            }
        }

        //     if (currentQuestion.question_type.type === "value_rating_scale") {
        //         const resp = await dispatch(setValueResponsesThunk({
        //             survey: id,
        //             participant: pid,
        //             question: Number(currentQuestion.id),
        //             answer: currentAnswer,
        //         }))
        //         if (setValueResponsesThunk.fulfilled.match(resp)) {
        //             isSubmit ? handleSubmit() : moveToNext()
        //         }
        //     } else  else {
        //         const resp = await dispatch(setResponsesThunk({
        //             survey: id,
        //             participant: pid,
        //             question: Number(currentQuestion.id),
        //             answer: currentQuestionResponse === undefined ? 1 : currentQuestionResponse,
        //         }))
        //         if (setResponsesThunk.fulfilled.match(resp)) {
        //             isSubmit ? handleSubmit() : moveToNext()
        //         }
        //     }
    }



    const goBack = () => {
        if (q_index <= 1) {
            return
        }
        navigate(`../${q_index - 1}`)
    }

    const handleCancel = () => {
        setShowSubmitModal(false)
    }

    const handleOk = async () => {
        if (!id || !pid) {
            return
        }

        const resp = await dispatch(completeSurveyThunk({
            survey: id,
            participant: pid
        }))

        if (completeSurveyThunk.fulfilled.match(resp)) {
            handleNext()
        }
    }

    const sortedResponseLabels = () => {
        const resp_labls = currentQuestion ? [...currentQuestion.response_label_set.response_labels] : defaultOptions
        if (resp_labls.length > 0) {
            return resp_labls.sort((a, b) => (a.value as number) - (b.value as number))
        }
        return resp_labls
    }


    return (
        <section className="font-roboto text-colorText">
            <ProgressBar />
            <section className="question-box py-10">
                <div className="font-light text-4xl lg:w-[900px]">{currentQuestion?.question}</div>
                <div className="font-bold text-lg lg:w-[900px] my-5">{currentQuestion?.description}</div>
                <div>
                    {currentQuestion?.question_type.type === 'text_field' && (
                        <div>
                            <TextField placeholder={currentQuestion.description || ""} onChange={handleTextFieldControlChange} defaultValue={currentQuestionResponse?.answer_text || ""} rows={12} />
                        </div>
                    )}
                    {currentQuestion?.question_type.type === 'rating_scale' && (
                        <div className="mt-10 mb-20">
                            <SliderScale defaultValue={currentQuestionResponse?.answer as number} onChange={handleNumberFieldControlChange} />
                        </div>
                    )}
                    {currentQuestion?.question_type.type === 'likert_scale' && (
                        <div className="mt-10 mb-20">
                            <LikertScale value={currentQuestionResponse?.answer as number} options={sortedResponseLabels()} onChange={handleNumberFieldControlChange} />
                        </div>
                    )}
                </div>
                <div className="py-5">
                    <Button size="large" className="p-8 px-20 mx -5" onClick={goBack}>Back</Button>
                    <Button size="large" className="p-8 px-20 mx-5" type="primary" onClick={() => handleNext(false)}>Next</Button>
                </div>
            </section>
            <Modal title="Confirm Submission" open={showSubmitModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure?</p>
                <p>You will not be able to make changes after submission</p>
            </Modal>
        </section>
    )
}

export default Assessment