import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { acceptTncUrl } from "../common/apiUrls"


const acceptTnc = createAsyncThunk(
    'survey/acceptTnc',
    // if you type your function argument here
    async (id: string) => {
        const response = await get(acceptTncUrl(id))
        return response.data
    },
)

export default acceptTnc