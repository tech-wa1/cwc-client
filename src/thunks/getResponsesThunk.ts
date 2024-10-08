import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
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
        const response = await post(getResponseUrl, {
            survey_id: data.survey,
            participant_id: data.participant
        })
        return response.data
    }
)

export default getResponsesThunk