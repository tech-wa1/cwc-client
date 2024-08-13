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
		<div className="w-96 p-4">
			{description}
		</div>
	)

	const getCurrentScoreById = (id: number) => {
		return valueScores.filter(valueScore => valueScore.value === id)[0].answer
	}

	return (
		<div className="p-3">
			{(!coreValues || coreValues.length <= 0) && (
				<div>Core values not found</div>
			)}
			{coreValues.length > 0 &&
				coreValues.map((coreValue) => (
					<div className="flex mx-3 my-10 items-center justify-start" key={`cvi${coreValue.id}`}>
						<div>{coreValue.title}</div>
						<div className="ml-2 cursor-pointer">
							<Popover content={getPopOverContent(coreValue.description)}>
								<InfoCircleOutlined />
							</Popover>
						</div>
						<div className="ml-16" key={`ev${getCurrentScoreById(coreValue.id)}`}>
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