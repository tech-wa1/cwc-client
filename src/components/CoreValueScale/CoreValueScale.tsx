
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ICoreValue, ICoreValueAnswer } from "../../common/types";
import { useEffect, useState } from "react";
import SliderScale from "../SliderScale/SliderScale";
import { Button } from "antd";


interface ICoreValueScaleProps {
	coreValues: Array<ICoreValue>,
	onChange: (answer: ICoreValueAnswer[]) => void,
	currentAnswers?: ICoreValueAnswer[] | null
}

const CoreValueScale = (props: ICoreValueScaleProps) => {

	const [activeOption, setActiveOption] = useState<ICoreValue>(props.coreValues[0])
	const [activeIndex, setActiveIndex] = useState(0)

	const initialScore = props.coreValues.map(value => {
		return {
			value: value.id,
			answer: 0
		}
	})

	const [valueScores, setValueScore] = useState(initialScore)

	useEffect(() => {
		if (props.coreValues && props.coreValues.length > 0) {
			setActiveOption(props.coreValues[0])
			setActiveIndex(0)
		}
	}, [props.coreValues])

	const selectOption = (value: ICoreValue, index: number) => {
		setActiveOption(value)
		setActiveIndex(index)
	}

	useEffect(() => {
		props.currentAnswers && props.currentAnswers.length > 0 && setValueScore(props.currentAnswers)
	}, [props.currentAnswers])

	const getCurrentScoreById = (id: number) => {
		const res = valueScores.filter(valueScore => valueScore.value === id)[0]
		if (res) {
			return res.answer
		}
		return 1
	}

	const handleControlChange = (id: number, answer: number) => {
		const newValueScore = valueScores.map(valueScore => {
			if (valueScore.value === id) {
				return {
					value: id,
					answer: answer
				}
			}
			return valueScore
		})
		setValueScore(newValueScore)
		props.onChange(newValueScore)
	};

	const moveToPrev = () => {
		setActiveOption(props.coreValues[activeIndex - 1])
		setActiveIndex(activeIndex - 1)

	}

	const moveToNext = () => {
		setActiveOption(props.coreValues[activeIndex + 1])
		setActiveIndex(activeIndex + 1)
	}

	const isCurrentValueScored = (id: number) => {
		const answerItem = valueScores.filter(vs => vs.value === id)[0]
		return answerItem.answer > 0
	}


	return (
		<section className="bg-colorSecondary w-full lg:w-10/12 rounded-lg flex items-center justify-center lg:border border-solid border-colorSecondary text-white">
			<div className="w-3/12 min-h-96 flex-col justify-center hidden lg:flex">
				{props.coreValues.map((coreValue, index) => (
					<div key={coreValue.id} onClick={() => selectOption(coreValue, index)} className={`px-10 py-5 w-full text-xl font-roboto cursor-pointer hover:text-colorPrimary ${activeOption && activeOption.id === coreValue.id ? 'bg-white text-colorPrimary' : ''}`}>
						<div className="flex items-center justify-start">
							<div className="px-2">
								<CheckCircleOutlined className={`${isCurrentValueScored(coreValue.id) ? 'text-colorPrimary' : ''}`} />
							</div>
							<div>
								{coreValue.title}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="w-full lg:w-9/12 bg-white rounded-lg min-h-96 text-colorSecondary">
				{
					activeOption && (
						<div className="p-3 py-3 lg:p-10">
							<div className="text-4xl font-thin">{activeOption.title}</div>
							<div className="text-lg py-2 text-slate-400">{activeOption.description}</div>
							<div className=" relative" key={`ev${getCurrentScoreById(activeOption.id)}`}>
								<SliderScale
									defaultValue={getCurrentScoreById(activeOption.id) || 1}
									onChange={(answer: number) => handleControlChange(activeOption.id, answer)}
									key={`cval${activeOption.id}`}
								/>
							</div>
							<div className="py-10 flex items-center justify-start gap-2">
								<Button type="default" className="text-2xl p-5" onClick={moveToPrev} disabled={activeIndex <= 0}>
									<ArrowLeftOutlined />
								</Button>
								<Button type="default" className="text-2xl p-5" onClick={moveToNext} disabled={activeIndex >= props.coreValues.length - 1}>
									<ArrowRightOutlined />
								</Button>
							</div>
						</div>
					)
				}

			</div>
		</section>
	);
};

export default CoreValueScale;
