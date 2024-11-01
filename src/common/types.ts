export interface IQuestion {
    id: number;
    question: string;
    description?: string;
    question_type: IQuestionType;
    response_label_set: IResponseLabelSet;
    q_index: number;
}

export interface IResponseLabelSet {
    id: number,
    name: string,
    description: string,
    version: number,
    is_active: boolean,
    response_labels: Array<IResponseLabel>
}

export interface IQuestionType {
    id: number;
    type: string;
    label: string;
    description: string;
}

export interface IResponseLabel {
    id: number;
    label: string;
    value: number;
    icon_url: string;
}

export interface IResponse {
    question: number;
    survey: string;
    participant: string;
    answer?: number | null;
    answer_text?: string
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