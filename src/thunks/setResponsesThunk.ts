import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { setResponseUrl, setValueResponseUrl } from "../common/apiUrls"
import { ICoreValueAnswer } from "../common/types"


interface ISetResponsesThunk {
    survey: string,
    participant: string,
    question: number,
    answer: number | ICoreValueAnswer[],
}

interface ISetTextFieldResponsesThunk {
    survey: string,
    participant: string,
    question: number,
    answer?: null,
    answer_text: string
}

// interface ISetValueResponsesThunk {
//     survey: string,
//     participant: string,
//     question: number,
//     answer: number | ICoreValueAnswer[],
// }

export const setResponsesThunk = createAsyncThunk(
    'survey/setResponse',
    // if you type your function argument here
    async (data: ISetResponsesThunk) => {
        const response = await post(setResponseUrl, data)
        return response.data
    }
)

export const setTextFieldResponsesThunk = createAsyncThunk(
    'survey/setTextResponse',
    // if you type your function argument here
    async (data: ISetTextFieldResponsesThunk) => {
        const response = await post(setResponseUrl, data)
        return response.data
    }
)


// exportconst setValueResponsesThunk = createAsyncThunk(
//     'survey/setValueResponse',
//     // if you type your function argument here
//     async (data: ISetValueResponsesThunk) => {
//         const response = await post(setValueResponseUrl, data)
//         return response.data
//     }
// )
