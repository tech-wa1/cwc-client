import { useEffect, useState } from "react"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import { ICoreValueAnswer, IQuestion, IResponse } from "../../common/types"
import TextField from "../../components/TextField/TextField"
import { Button, Modal } from "antd"
// import setValueResponsesThunk from "../../thunks/setValueResponseThunk"
import { updateResponses, updateSurveyProgress } from "../../store/cwcSlice"
import { setResponsesThunk, setTextFieldResponsesThunk, setValueResponsesThunk } from "../../thunks/setResponsesThunk"
import completeSurveyThunk from "../../thunks/completeSurveyThunk"
import SliderScale from "../../components/SliderScale/SliderScale"
import LikertScale from "../../components/LikertScale/LikertScale"
import CoreValueScale from "../../components/CoreValueScale/CoreValueScale"


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

    const questions = useAppSelector((root: RootState) => root.cwc.questions)
    const responses = useAppSelector((root: RootState) => root.cwc.responses)
    const pid = useAppSelector((root: RootState) => root.cwc.pid)
    const coreValues = useAppSelector((root: RootState) => root.cwc.coreValues)

    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null)
    const [currentTextAnswer, setCurrentTextAnswer] = useState<string>("")
    const [currentNumberAnswer, setCurrentNumberAnswer] = useState<number | null>(0)
    const [currentCoreValueAnswers, setCurrentCoreValueAnswers] = useState<ICoreValueAnswer[] | null>(null)

    const resetCurrentAnswers = () => {
        setCurrentTextAnswer("")
        setCurrentCoreValueAnswers(null)
        setCurrentNumberAnswer(null)
    }

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
            if (question?.question_type.type === "text_field") {
                setCurrentTextAnswer(currentResponse[0].answer_text || "")
            } else if (question?.question_type.type === "value_rating_scale") {
                setCurrentCoreValueAnswers(currentResponse[0].answer as ICoreValueAnswer[] || null)
            } else if (typeof currentResponse[0].answer === 'number') {
                setCurrentNumberAnswer(currentResponse[0].answer || null)
            } else {
                console.error("answer type is incorrect")
            }
        } else {
            resetCurrentAnswers()
        }
    }, [q_index])


    const handleTextFieldControlChange = (val: string) => {
        setCurrentTextAnswer(val)
    }

    const handleNumberFieldControlChange = (val: number) => {
        setCurrentNumberAnswer(val)
    }

    const handleValuesFieldControlChange = (coreValueAnswers: ICoreValueAnswer[]) => {
        setCurrentCoreValueAnswers(coreValueAnswers)
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
        } else if (currentQuestion.question_type.type === "value_rating_scale") {
            if (!currentCoreValueAnswers || currentQuestion?.question_type.type === "value_rating_scale" && !checkValuesScored()) {
                alert("Select your score for all core values.")
                return
            }
            const data = {
                survey: id,
                participant: pid,
                question: Number(currentQuestion.id),
                answer: currentCoreValueAnswers,
            }
            const resp = await dispatch(setValueResponsesThunk(data))
            if (setValueResponsesThunk.fulfilled.match(resp)) {
                updateValueInStore(data, currentQuestion.question_type.type)
                isSubmit ? handleSubmit() : moveToNext()
            }
        } else {
            if (!currentNumberAnswer) {
                alert("Please select a value")
                return false;
            }

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

    const checkValuesScored = () => {
        const pendingValues = currentCoreValueAnswers?.filter(cv => cv.answer <= 0)
        return pendingValues && pendingValues.length <= 0
    }


    return (
        <section className="font-roboto text-colorText">
            <ProgressBar />
            <section className="question-box py-10">
                <div className="font-light text-2xl lg:text-4xl w-full lg:w-[900px]">{currentQuestion?.question}</div>
                <div className="lg:font-bold text-sm lg:text-lg lg:w-[900px] my-2 lg:my-5">{currentQuestion?.description}</div>
                <div>
                    {currentQuestion?.question_type.type === 'text_field' && (
                        <div className="mt-10 mb-20">
                            <TextField placeholder={currentQuestion.description || ""} onChange={handleTextFieldControlChange} defaultValue={currentTextAnswer} rows={12} />
                        </div>
                    )}
                    {currentQuestion?.question_type.type === 'rating_scale' && (
                        <div className="lg:mt-10 mb-20">
                            <SliderScale defaultValue={currentNumberAnswer} onChange={handleNumberFieldControlChange} />
                        </div>
                    )}
                    {currentQuestion?.question_type.type === 'likert_scale' && (
                        <div className="mt-10 mb-20">
                            <LikertScale value={currentNumberAnswer} options={sortedResponseLabels()} onChange={handleNumberFieldControlChange} />
                        </div>
                    )}
                    {currentQuestion?.question_type.type === 'value_rating_scale' && (
                        <div className="mt-10 mb-20">
                            <CoreValueScale coreValues={coreValues} currentAnswers={currentCoreValueAnswers} onChange={handleValuesFieldControlChange} />
                        </div>
                    )}
                </div>
                <div className="py-5">
                    <Button size="large" className="p-8 lg:px-20 mr-5" onClick={goBack}>Back</Button>
                    {(q_index < questions.length) ? (
                        <Button size="large" className="p-8 lg:px-20 mr-5" type="primary" onClick={() => handleNext(false)}>Next</Button>
                    ) : (
                        <Button size="large" className="p-8 lg:px-20 mr-5" type="primary" onClick={() => handleNext(true)}>Submit</Button>
                    )}

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