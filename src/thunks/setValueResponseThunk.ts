import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { setValueResponseUrl } from "../common/apiUrls"
import { ICoreValueAnswer } from "../common/types"


interface ISetValueResponsesThunk {
    survey: string,
    participant: string,
    question: number,
    answer: number | ICoreValueAnswer[],
}

const setValueResponsesThunk = createAsyncThunk(
    'survey/setValueResponse',
    // if you type your function argument here
    async (data: ISetValueResponsesThunk) => {
        const response = await post(setValueResponseUrl, data)
        return response.data
    }
)

export default setValueResponsesThunk