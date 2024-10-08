import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { acceptTncUrl } from "../common/apiUrls"


interface IAcceptTnc {
    pid: string;
}

const acceptTnc = createAsyncThunk(
    'survey/acceptTnc',
    // if you type your function argument here
    async (data: IAcceptTnc) => {
        const response = await post(acceptTncUrl, {
            participant_id: data.pid
        })
        return response.data
    },
)

export default acceptTnc