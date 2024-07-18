import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { verifySurveyUrl } from "../common/apiUrls"


const verifySurvey = createAsyncThunk(
    'survey/verify',
    // if you type your function argument here
    async (id: string) => {
        const response = await get(verifySurveyUrl(id))
        return response.data
    },
)

export default verifySurvey