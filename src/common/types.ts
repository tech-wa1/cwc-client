export interface IQuestion {
    id: number;
    question: string;
    description?: string;
    question_type: number;
    response_labels: Array<IResponseLabel> | [];
}

export interface IResponseLabel {
    id: number;
    label: string;
    value: number;
}

export interface IResponse {
    question: number;
    survey: string;
    participant: string;
    answer: number;
}

export interface ICoreValue {
    id: number;
    status: boolean;
    title: string;
    description: string;
}

export interface ICoreValueAnswer {
    value: number,
    answer: number
}