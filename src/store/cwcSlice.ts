import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import verifySurvey from '../thunks/verifyThunk'
import loginParticipant from '../thunks/loginThunk'
import acceptTnc from '../thunks/tncThunk'
import getSurveyThunk from '../thunks/getSurveyThunk'
import { IQuestion, IResponse, ICoreValue } from '../common/types'
import completeSurveyThunk from '../thunks/completeSurveyThunk'
import getResponsesThunk from '../thunks/getResponsesThunk'
import getClientValuesThunk from '../thunks/getClientValuesThunk'

export interface CwcState {
    isValidSurvey: boolean,
    pid: string,
    clientId: string,
    tncAccepted: boolean,
    questions: Array<IQuestion>,
    survey_active: boolean,
    surveyPercentage: number,
    surveyCompleted: boolean,
    responses: Array<IResponse>,
    coreValues: Array<ICoreValue>
}

const initialState: CwcState = {
    isValidSurvey: false,
    pid: localStorage.getItem("pid") || "",
    clientId: "",
    tncAccepted: false,
    questions: [],
    survey_active: false,
    surveyPercentage: 0,
    surveyCompleted: false,
    responses: [],
    coreValues: []
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
            state.questions = action.payload.questions.sort(function (a: IQuestion, b: IQuestion) {
                return a.id - b.id;
            });
            state.survey_active = !!action.payload.is_active
            state.tncAccepted = !!action.payload.participant.tnc_accepted
            state.surveyCompleted = !!action.payload.participant.survey_complete
            state.clientId = action.payload.client
        })
        builder.addCase(completeSurveyThunk.fulfilled, (state) => {
            state.surveyCompleted = true
        })
        builder.addCase(getResponsesThunk.fulfilled, (state, action) => {
            state.responses = action.payload
        })
        builder.addCase(getClientValuesThunk.fulfilled, (state, action) => {
            state.coreValues = action.payload
        })
    }
})

export const { updateSurveyProgress } = cwcSlice.actions

export default cwcSlice.reducer