import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { getSurveyUrl } from "../common/apiUrls"

interface IGetSurveyThunk {
    id: string,
}

const getSurveyThunk = createAsyncThunk(
    'survey/getSurvey',
    // if you type your function argument here
    async (data: IGetSurveyThunk) => {
        const response = await get(getSurveyUrl(data.id))
        return response.data
    }
)

export default getSurveyThunk