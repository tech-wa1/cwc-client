import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { acceptTncUrl } from "../common/apiUrls"


interface IAcceptTnc {
    id: string;
    pid: string;
}

const acceptTnc = createAsyncThunk(
    'survey/acceptTnc',
    // if you type your function argument here
    async (data: IAcceptTnc) => {
        const response = await get(acceptTncUrl(data.id, data.pid))
        return response.data
    },
)

export default acceptTnc