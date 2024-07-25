import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { setResponseUrl } from "../common/apiUrls"


interface ISetResponsesThunk {
    survey: string,
    participant: string,
    question: number,
    answer: number
}

const setResponsesThunk = createAsyncThunk(
    'survey/setResponse',
    // if you type your function argument here
    async (data: ISetResponsesThunk) => {
        const response = await post(setResponseUrl, data)
        return response.data
    }
)

export default setResponsesThunk