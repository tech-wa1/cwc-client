import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, Modal, Popover, Progress } from "antd"
import LikertScale from "../../components/LikertScale/LikertScale"
import SliderScale from "../../components/SliderScale/SliderScale"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"
import { updateSurveyProgress } from "../../store/cwcSlice"
import { useEffect, useState } from "react"
import completeSurveyThunk from "../../thunks/completeSurveyThunk"
import setResponsesThunk from "../../thunks/setResponsesThunk"
import { ICoreValueAnswer, IQuestion } from "../../common/types"
import wa1Logo from './../../assets/wa1_logo.svg';
import CoreValueScale from "../../components/CoreValueScale/CoreValueScale"

const defaultOptions = [{
    label: 'No',
    value: 'no'
},
{
    label: 'Probably',
    value: 'probably'
},
{
    label: 'Likely',
    value: 'likely'
}]




const Assessment = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { qindex } = useParams()
    const { id } = useParams()

    let current_question_num: number = 1 //defaults to first question
    if (qindex) {
        current_question_num = parseInt(qindex)
    }
    const current_qa_index: number = current_question_num - 1 //defaults to first question
    const surveyPercent = useAppSelector((root: RootState) => root.cwc.surveyPercentage)
    const questions = useAppSelector((root: RootState) => root.cwc.questions)
    const responses = useAppSelector((root: RootState) => root.cwc.responses)
    const pid = useAppSelector((root: RootState) => root.cwc.pid)
    const coreValues = useAppSelector((root: RootState) => root.cwc.coreValues);

    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [answers, setAnswers] = useState<Array<number | ICoreValueAnswer[]>>([])



    const handleControlChange = (answer: number | ICoreValueAnswer[]) => {
        const answersCopy = [...answers]
        answersCopy[current_qa_index] = answer
        setAnswers(answersCopy)
    }



    useEffect(() => {
        const tempAnswers: number[] = []
        responses && responses.length > 0 && responses.map(res => {
            tempAnswers.push(res.answer || 1)
        })
        setAnswers(tempAnswers)
    }, [])

    const getQuestionControl = (currentQuestion: IQuestion) => {
        if (!currentQuestion) {
            return
        }
        if (currentQuestion.question_type === 1) {
            return <LikertScale value={answers[current_qa_index] as number} options={currentQuestion.response_labels || defaultOptions} onChange={handleControlChange} key={`lsi${currentQuestion.id}`} />
        } else if (currentQuestion.question_type === 2) {
            return <SliderScale defaultValue={answers[current_qa_index] as number} onChange={handleControlChange} key={`sci${currentQuestion.id}`} />
        } else if (currentQuestion.question_type === 3) {
            return <CoreValueScale currentAnswers={answers[current_qa_index] as ICoreValueAnswer[]} coreValues={coreValues} key={`sci${currentQuestion.id}`} onChange={handleControlChange} />
        } else {
            return <div key={`invalid${currentQuestion.id}`} >Invalid control component. Please contact the assessment administrator</div>
        }
    }

    const questionControls = questions.map(questionItem => getQuestionControl(questionItem))



    const moveToNext = () => {
        if (questions.length > current_question_num) {
            navigate(`../${current_question_num + 1}`)
            dispatch(updateSurveyProgress((current_question_num + 1) * (100 / questions.length)))
        } else if (questions.length === current_question_num) {
            navigate('../thankyou')
        }

    }

    const handleSubmit = () => {
        setShowSubmitModal(true)
    }

    const getDefaultValue = (questionType: number) => {
        if (questionType === 3) {
            return coreValues.map(value => {
                return {
                    value: value.id,
                    answer: 1
                }
            })
        }
        return 1
    }

    const handleNext = async (isSubmit: Boolean = false) => {
        if (!current_question_num || !id || !questions[current_qa_index].id) {
            return
        }
        // if the answer was modified make an API call to update the response
        const resp = await dispatch(setResponsesThunk({
            survey: id,
            participant: pid,
            question: Number(questions[current_qa_index].id),
            answer: answers[current_qa_index] || getDefaultValue(questions[current_qa_index].question_type),
            questionType: questions[current_qa_index].question_type === 3 ? "value_rating_scale" : "rating_scale"
        }))
        if (setResponsesThunk.fulfilled.match(resp)) {
            isSubmit ? handleSubmit() : moveToNext()
        }

    }

    const goBack = () => {
        if (!current_question_num || current_question_num <= 1) {
            return
        }
        navigate(`../${current_question_num - 1}`)
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


    return (
        <section>
            {current_question_num && current_question_num > 0 && current_question_num <= questions.length && (
                <>
                    <div className="ptop-progress">
                        <Progress percent={surveyPercent} showInfo={false} className="fixed top-0 left-0" />
                    </div>
                    <section className="m-3 font-roboto">
                        <div className="py-2 h-20">
                            {
                                current_question_num > 1 && (
                                    <Button type="text" className="p-3" onClick={goBack}>
                                        <ArrowLeftOutlined className="text-lg" />
                                    </Button>
                                )
                            }
                        </div>
                        <div className="flex items-center justify-center text-colorText" key={`qc${current_question_num}`}>

                            <div className="min-h-96 flex flex-col justify-center items-center p-8 border border-solid border-slate-200 rounded-2xl bg-gray-300 bg-opacity-10">
                                <div className="flex items-center m-auto justify-center lg:w-10/12">
                                    <div className="text-base lg:text-xl font-bold text-center">
                                        {questions[current_question_num - 1].question}
                                    </div>
                                    {
                                        questions[current_question_num - 1].description && (
                                            <Popover content={questions[current_question_num - 1].description}>
                                                <div className="ml-2 cursor-pointer">
                                                    <InfoCircleOutlined />
                                                </div>
                                            </Popover>
                                        )
                                    }
                                </div>
                                <div className="flex items-center m-auto justify-center w-full">
                                    {
                                        questionControls[current_question_num - 1]
                                    }
                                </div>
                                <div className="flex items-center m-auto justify-center w-full">
                                    {
                                        current_question_num < questions.length ? (
                                            <Button type="primary" size="large" className="px-10 h-12" onClick={() => handleNext(false)}>Next</Button>
                                        ) : (
                                            <Button type="primary" size="large" className="px-10 h-12" onClick={() => handleNext(true)}>Submit Survey</Button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='w-32 sm:w-48 float-right m-20'>
                            <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
                        </div>
                    </section>
                </>
            )}
            <Modal title="Confirm Submission" open={showSubmitModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure?</p>
                <p>You will not be able to make changes after submission</p>
            </Modal>
        </section>
    )
}

export default Assessment