import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { completeSurveyUrl } from "../common/apiUrls"

interface ISurveyComplete {
    participant: string,
    survey: string
}

const completeSurveyThunk = createAsyncThunk(
    'survey/complete',
    // if you type your function argument here
    async (data: ISurveyComplete) => {
        const response = await post(completeSurveyUrl, data)
        return response.data
    },
)

export default completeSurveyThunk