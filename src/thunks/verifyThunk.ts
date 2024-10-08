import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { verifySurveyUrl } from "../common/apiUrls"


interface IVerifySurvey {
    survey_id: string;
    participant_id: string
}

const verifySurvey = createAsyncThunk(
    'survey/verify',
    // if you type your function argument here
    async (data: IVerifySurvey) => {
        const response = await post(verifySurveyUrl, data)
        return response.data
    },
)

export default verifySurvey
