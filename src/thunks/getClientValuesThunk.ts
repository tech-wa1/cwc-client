import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "../common/api"
import { getClientValuesUrl } from "../common/apiUrls"

interface IGetClientValuesThunk {
    id: string,
}

const getClientValuesThunk = createAsyncThunk(
    'survey/getCoreValues',
    // if you type your function argument here
    async (data: IGetClientValuesThunk) => {
        if (!data.id) {
            return
        }
        const response = await get(getClientValuesUrl(data.id))
        return response.data
    }
)

export default getClientValuesThunk