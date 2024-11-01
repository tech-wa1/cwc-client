// import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons"
// import { Button, Modal, Popover, Progress } from "antd"
// import LikertScale from "../../components/LikertScale/LikertScale"
// import SliderScale from "../../components/SliderScale/SliderScale"
// import { useNavigate, useParams } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
// import { RootState } from "../../store/store"
// import { updateSurveyProgress } from "../../store/cwcSlice"
// import { useEffect, useState } from "react"
// import completeSurveyThunk from "../../thunks/completeSurveyThunk"
// import setResponsesThunk from "../../thunks/setResponsesThunk"
// import { ICoreValueAnswer, IQuestion, IResponse } from "../../common/types"
// import wa1Logo from './../../assets/wa1_logo.svg';
// import CoreValueScale from "../../components/CoreValueScale/CoreValueScale"
// import setValueResponsesThunk from "../../thunks/setValueResponseThunk"
// import TextField from "../../components/TextField/TextField"

// const defaultOptions = [{
//     label: 'No',
//     value: 'no'
// },
// {
//     label: 'Probably',
//     value: 'probably'
// },
// {
//     label: 'Likely',
//     value: 'likely'
// }]




// const Assessment = () => {

//     const navigate = useNavigate()
//     const dispatch = useAppDispatch()
//     const { qindex } = useParams()
//     const { id } = useParams()

//     let current_question_num: number = 1 //defaults to first question
//     if (qindex) {
//         current_question_num = parseInt(qindex)
//     }
//     const current_qa_index: number = current_question_num - 1 //defaults to first question
//     const surveyPercent = useAppSelector((root: RootState) => root.cwc.surveyPercentage)
//     const questions = useAppSelector((root: RootState) => root.cwc.questions)
//     const responses = useAppSelector((root: RootState) => root.cwc.responses)
//     const pid = useAppSelector((root: RootState) => root.cwc.pid)
//     const coreValues = useAppSelector((root: RootState) => root.cwc.coreValues);

//     const [showSubmitModal, setShowSubmitModal] = useState(false)
//     const [loading, setLoading] = useState(true)
//     const [answers, setAnswers] = useState<Array<number | ICoreValueAnswer[] | string>>([])



//     const handleControlChange = (answer: number | ICoreValueAnswer[] | string) => {
//         const answersCopy = [...answers]
//         answersCopy[current_qa_index] = answer
//         setAnswers(answersCopy)
//     }


//     const getSortedAnswersByQuestionIndex = (questions: IQuestion[], responses: IResponse[]): (number | string)[] => {
//         const questionMap: { [key: number]: number } = {};

//         [...questions].forEach(q => {
//             questionMap[q.id] = q.q_index;
//         });

//         return [...responses]
//             .sort((a, b) => {
//                 const qIndexA = questionMap[a.question];
//                 const qIndexB = questionMap[b.question];
//                 return qIndexA - qIndexB;
//             })
//             .map(response => response.answer || response.answer_text || "");
//     }

//     useEffect(() => {
//         if (questions.length > 0 && responses.length > 0) {
//             const tempAnswers: Array<number | ICoreValueAnswer[] | string> = getSortedAnswersByQuestionIndex(questions, responses)
//             setAnswers(tempAnswers)
//         }
//         setLoading(false)
//     }, [responses, questions])


//     const moveToNext = () => {
//         if (questions.length > current_question_num) {
//             navigate(`../${current_question_num + 1}`)
//             dispatch(updateSurveyProgress((current_question_num + 1) * (100 / questions.length)))
//         } else if (questions.length === current_question_num) {
//             navigate('../thankyou')
//         }

//     }

//     const handleSubmit = () => {
//         setShowSubmitModal(true)
//     }

//     const getDefaultValue = () => {
//         return coreValues.map(cv => {
//             return {
//                 value: cv.id,
//                 answer: 1
//             }
//         })
//     }

//     const handleNext = async (isSubmit: Boolean = false) => {
//         if (!current_question_num || !id || !questions[current_qa_index].id) {
//             return
//         }

//         if (questions[current_qa_index].question_type.type === "value_rating_scale" && typeof answers[current_qa_index] != 'string') {

//             const resp = await dispatch(setValueResponsesThunk({
//                 survey: id,
//                 participant: pid,
//                 question: Number(questions[current_qa_index].id),
//                 answer: answers[current_qa_index] === undefined ? getDefaultValue() : answers[current_qa_index],
//             }))
//             if (setValueResponsesThunk.fulfilled.match(resp)) {
//                 isSubmit ? handleSubmit() : moveToNext()
//             }
//         } else if (questions[current_qa_index].question_type.type === "text_field" && typeof answers[current_qa_index] === 'string') {
//             const resp = await dispatch(setResponsesThunk({
//                 survey: id,
//                 participant: pid,
//                 question: Number(questions[current_qa_index].id),
//                 answer_text: answers[current_qa_index] === undefined ? "" : answers[current_qa_index],
//                 answer: null
//             }))
//             if (setResponsesThunk.fulfilled.match(resp)) {
//                 isSubmit ? handleSubmit() : moveToNext()
//             }
//         } else if (typeof answers[current_qa_index] != 'string') {
//             const resp = await dispatch(setResponsesThunk({
//                 survey: id,
//                 participant: pid,
//                 question: Number(questions[current_qa_index].id),
//                 answer: answers[current_qa_index] === undefined ? 1 : answers[current_qa_index],
//             }))
//             if (setResponsesThunk.fulfilled.match(resp)) {
//                 isSubmit ? handleSubmit() : moveToNext()
//             }
//         }



//     }

//     const goBack = () => {
//         if (!current_question_num || current_question_num <= 1) {
//             return
//         }
//         navigate(`../${current_question_num - 1}`)
//     }

//     const handleCancel = () => {
//         setShowSubmitModal(false)
//     }

//     const handleOk = async () => {
//         if (!id || !pid) {
//             return
//         }

//         const resp = await dispatch(completeSurveyThunk({
//             survey: id,
//             participant: pid
//         }))

//         if (completeSurveyThunk.fulfilled.match(resp)) {
//             handleNext()
//         }
//     }

//     const sortedResponseLabels = () => {
//         const resp_labls = [...questions[current_question_num - 1].response_label_set.response_labels || defaultOptions]
//         if (resp_labls.length > 0) {
//             return resp_labls.sort((a, b) => a.value - b.value)
//         }
//         return resp_labls
//     }


//     return (
//         <section>
//             {current_question_num && current_question_num > 0 && current_question_num <= questions.length && (
//                 <>
//                     <div className="">
//                         <Progress percent={surveyPercent} showInfo={false} className="fixed top-0 left-0" />
//                     </div>
//                     <section className="m-3 font-roboto">
//                         <div className="py-2 h-20">
//                             {
//                                 current_question_num > 1 && (
//                                     <Button type="text" className="p-3" onClick={goBack}>
//                                         <ArrowLeftOutlined className="text-lg" />
//                                     </Button>
//                                 )
//                             }
//                         </div>
//                         <div className="flex items-center justify-center text-colorText" key={`qc${current_question_num}`}>

//                             <div className="min-w-[90%] min-h-96 lg:min-w-[900px] flex flex-col justify-center items-center p-8 border border-solid border-slate-200 rounded-2xl bg-gray-300 bg-opacity-10">
//                                 <div className="flex items-center m-auto justify-center lg:w-10/12 h-20">
//                                     <div className="text-base lg:text-xl font-bold text-center">
//                                         {questions[current_question_num - 1].question}
//                                         {
//                                             questions[current_question_num - 1].description && (
//                                                 <Popover content={questions[current_question_num - 1].description}>
//                                                     <span className="ml-2 cursor-pointer">
//                                                         <InfoCircleOutlined />
//                                                     </span>
//                                                 </Popover>
//                                             )
//                                         }
//                                     </div>

//                                 </div>
//                                 {
//                                     !loading && (
//                                         <div className="flex items-center m-auto justify-center w-full">
//                                             {
//                                                 questions[current_question_num - 1].question_type.type === "likert_scale" && (
//                                                     <LikertScale value={answers[current_qa_index] as number} options={sortedResponseLabels()} onChange={handleControlChange} />
//                                                 )
//                                             }
//                                             {
//                                                 questions[current_question_num - 1].question_type.type === "rating_scale" && (
//                                                     <SliderScale defaultValue={answers[current_qa_index] as number} onChange={handleControlChange} />
//                                                 )
//                                             }
//                                             {
//                                                 questions[current_question_num - 1].question_type.type === "value_rating_scale" && (
//                                                     <CoreValueScale currentAnswers={answers[current_qa_index] as ICoreValueAnswer[]} coreValues={coreValues} onChange={handleControlChange} />
//                                                 )
//                                             }
//                                             {
//                                                 questions[current_question_num - 1].question_type.type === "text_field" && (
//                                                     <TextField placeholder={questions[current_question_num - 1].description || ""} onChange={handleControlChange} defaultValue={answers[current_qa_index] as string} />
//                                                 )
//                                             }

//                                         </div>
//                                     )
//                                 }

//                                 <div className="flex items-center m-auto justify-center w-full lg:h-20">
//                                     {
//                                         current_question_num < questions.length ? (
//                                             <Button type="primary" size="large" className="px-10 h-12" onClick={() => handleNext(false)}>Next</Button>
//                                         ) : (
//                                             <Button type="primary" size="large" className="px-10 h-12" onClick={() => handleNext(true)}>Submit Survey</Button>
//                                         )
//                                     }

//                                 </div>
//                             </div>
//                         </div>
//                         <div className='w-32 sm:w-48 m-auto my-20 lg:float-right lg:m-20'>
//                             <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
//                         </div>
//                     </section>
//                 </>
//             )}
//             <Modal title="Confirm Submission" open={showSubmitModal} onOk={handleOk} onCancel={handleCancel}>
//                 <p>Are you sure?</p>
//                 <p>You will not be able to make changes after submission</p>
//             </Modal>
//         </section>
//     )
// }

// export default Assessment