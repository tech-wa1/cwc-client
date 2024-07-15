import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, Progress } from "antd"
import LikertScale from "../../components/LikertScale/LikertScale"
import SliderScale from "../../components/SliderScale/SliderScale"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

const questions = [
    {
        "id": 2,
        "question": "I understand our purpose and know how my work contributes to its success.",
        "description": "A sample question to test the models",
        "question_type": 1
    },
    {
        "id": 3,
        "question": "How much do you relate to the company’s vision and mission statement?",
        "description": "some description",
        "question_type": 1,
    },
    {
        "id": 4,
        "question": "How likely are you to recommend our company as a great place to work to a friend or colleague?",
        "description": "some description again",
        "question_type": 2,
        "response_labels": [
            {
                "id": 1,
                "label": "Strongly Disagree",
                "value": -2
            },
            {
                "id": 2,
                "label": "Strongly Agree",
                "value": 2
            },
            {
                "id": 3,
                "label": "Disagree",
                "value": -1
            },
            {
                "id": 4,
                "label": "Agree",
                "value": 1
            }
        ]
    }
]

const Assessment = () => {
    const navigate = useNavigate()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const getQuestionControl = () => {
        const currentQuestion = questions[currentQuestionIndex]
        if (currentQuestion.question_type === 2) {
            return <LikertScale options={currentQuestion.response_labels || defaultOptions} />
        } else if (currentQuestion.question_type === 1) {
            return <SliderScale />
        } else {
            return <div>Invalid control component. Please contact the assessment administrator</div>
        }
    }

    const handleNext = () => {
        if (questions.length > currentQuestionIndex + 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else if (questions.length - 1 === currentQuestionIndex) {
            navigate('../thankyou')
        }

    }

    return (
        <>
            <div className="ptop-progress">
                <Progress percent={30} showInfo={false} className="fixed top-0 left-0" />
            </div>
            <section className="m-3 font-roboto">
                <div className="py-2">
                    <Button type="text" className="p-3">
                        <ArrowLeftOutlined className="text-lg" />
                    </Button>
                </div>
                <div className="h-[80vh] flex items-center justify-center text-colorText">

                    <div className="h-96 flex flex-col justify-center ">
                        <div className="flex items-center m-auto justify-center lg:w-10/12">
                            <div className="text-base lg:text-xl font-bold text-center">
                                {questions[currentQuestionIndex].question}
                            </div>
                            <div className="ml-2">
                                <InfoCircleOutlined />
                            </div>
                        </div>
                        <div className="flex items-center m-auto justify-center w-full">
                            {
                                getQuestionControl()
                            }
                        </div>
                        <div className="flex justify-center my-16">
                            <Button type="primary" size="large" className="px-10 h-12" onClick={handleNext}>Next</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}

export default Assessment