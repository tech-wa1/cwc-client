import { InfoCircleOutlined } from "@ant-design/icons";
import SliderScale from "../SliderScale/SliderScale";
import { Popover } from "antd";
import { ICoreValue, ICoreValueAnswer } from "../../common/types";
import { useEffect, useState } from "react";


interface ICoreValueScaleProps {
	coreValues: Array<ICoreValue>,
	onChange: (answer: ICoreValueAnswer[]) => void,
	currentAnswers: ICoreValueAnswer[]
}

const CoreValueScale = ({ coreValues, currentAnswers, onChange }: ICoreValueScaleProps) => {

	const initialScore = coreValues.map(value => {
		return {
			value: value.id,
			answer: 1
		}
	})

	const [valueScores, setValueScore] = useState(initialScore)

	useEffect(() => {
		currentAnswers && currentAnswers.length > 0 && setValueScore(currentAnswers)
	}, [currentAnswers])



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
		onChange(newValueScore)
	};

	const getPopOverContent = (description: string) => (
		<div>
			{description}
		</div>
	)

	const getCurrentScoreById = (id: number) => {
		const res = valueScores.filter(valueScore => valueScore.value === id)[0]
		if (res) {
			return res.answer
		}
		return 1
	}

	return (
		<div className="p-3 w-full lg:w-auto">
			{(!coreValues || coreValues.length <= 0) && (
				<div>Core values not found</div>
			)}
			{coreValues.length > 0 &&
				coreValues.map((coreValue) => (
					<div className="flex flex-col lg:flex-row lg:mx-3 my-10 items-center lg:justify-start w-full lg:w-auto" key={`cvi${coreValue.id}`}>
						<div className="lg:w-36">
							{coreValue.title}
							<span className="ml-2 cursor-pointer">
								<Popover content={getPopOverContent(coreValue.description)} overlayStyle={{
									width: "80vw"
								}}>
									<InfoCircleOutlined />
								</Popover>
							</span>
						</div>

						<div className="lg:ml-16 w-full" key={`ev${getCurrentScoreById(coreValue.id)}`}>
							<SliderScale
								defaultValue={getCurrentScoreById(coreValue.id)}
								onChange={(answer: number) => handleControlChange(coreValue.id, answer)}
								key={`cval${coreValue.id}`}
							/>
						</div>
					</div>
				))}
		</div>
	);
};

export default CoreValueScale;
