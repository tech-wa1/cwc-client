import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { getSUrveyUrl } from "../common/apiUrls"

interface IGetSurveyThunk {
    id: string, pid: string
}

const getSurveyThunk = createAsyncThunk(
    'survey/getSurvey',
    // if you type your function argument here
    async (data: IGetSurveyThunk) => {
        const response = await get(getSUrveyUrl(data.id, data.pid))
        return response.data
    }
)

export default getSurveyThunk