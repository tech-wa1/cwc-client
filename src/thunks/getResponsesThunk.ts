import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { getResponseUrl } from "../common/apiUrls"

interface IGetResponsesThunk {
    survey: string,
    participant: string
}
// interface IGetResponsesThunk {
//     survey: string,
//     participant: string,
//     question: number,
//     response: number
// }

const getResponsesThunk = createAsyncThunk(
    'survey/getresponse',
    // if you type your function argument here
    async (data: IGetResponsesThunk) => {
        const response = await get(getResponseUrl(data.survey, data.participant))
        return response.data
    }
)

export default getResponsesThunk