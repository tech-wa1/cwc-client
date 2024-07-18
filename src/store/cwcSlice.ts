import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import verifySurvey from '../thunks/verifyThunk'
import loginParticipant from '../thunks/loginThunk'
import acceptTnc from '../thunks/tncThunk'
import getSurveyThunk from '../thunks/getSurveyThunk'
import { IQuestion } from '../common/types'
import completeSurveyThunk from '../thunks/completeSurveyThunk'

export interface CwcState {
    isValidSurvey: boolean,
    pid: string,
    tncAccepted: boolean,
    questions: Array<IQuestion>,
    survey_active: boolean,
    surveyPercentage: number,
    surveyCompleted: boolean
}

const initialState: CwcState = {
    isValidSurvey: false,
    pid: "",
    tncAccepted: false,
    questions: [],
    survey_active: false,
    surveyPercentage: 0,
    surveyCompleted: false
}

export const cwcSlice = createSlice({
    name: 'cwc',
    initialState,
    reducers: {
        updateSurveyProgress: (state, action: PayloadAction<number>) => {
            state.surveyPercentage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifySurvey.fulfilled, (state, action) => {
            state.isValidSurvey = action.payload.valid || false
        })
        builder.addCase(loginParticipant.fulfilled, (state, action) => {
            state.pid = action.payload.id || ""
            state.surveyCompleted = !!action.payload.survey_complete
        })
        builder.addCase(loginParticipant.rejected, (state) => {
            state.pid = ""
        })
        builder.addCase(acceptTnc.fulfilled, (state) => {
            state.tncAccepted = true
        })
        builder.addCase(getSurveyThunk.fulfilled, (state, action) => {
            state.questions = action.payload.questions
            state.survey_active = !!action.payload.is_active
            state.tncAccepted = !!action.payload.tnc_accepted
            state.surveyCompleted = !!action.payload.survey_complete
        })
        builder.addCase(completeSurveyThunk.fulfilled, (state) => {
            state.surveyCompleted = true
        })
    }
})

export const { updateSurveyProgress } = cwcSlice.actions

export default cwcSlice.reducer