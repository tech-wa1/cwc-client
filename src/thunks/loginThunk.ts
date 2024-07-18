import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../common/api"
import { loginUrl } from "../common/apiUrls"

interface ILoginType {
    email: string,
    survey: string
}

const loginParticipant = createAsyncThunk(
    'participant/login',
    // if you type your function argument here
    async (data: ILoginType) => {
        console.log(data)
        const response = await post(loginUrl, data)

        localStorage.setItem("pid", response.data.id)
        return response.data
    },
)

export default loginParticipant