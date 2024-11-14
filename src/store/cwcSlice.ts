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
import { setResponsesThunk, setTextFieldResponsesThunk, setValueResponsesThunk } from '../thunks/setResponsesThunk'

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
        },
        updatePid: (state, action: PayloadAction<string>) => {
            localStorage.setItem("pid", action.payload)
            state.pid = action.payload
        },
        updateResponses: (state, action: PayloadAction<Array<IResponse>>) => {
            state.responses = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifySurvey.fulfilled, (state, action) => {
            state.isValidSurvey = true
            state.survey_active = !!action.payload.survey_active
            state.tncAccepted = !!action.payload.tnc_accepted
            state.surveyCompleted = !!action.payload.survey_complete
        })
        builder.addCase(verifySurvey.rejected, (state) => {
            state.isValidSurvey = false
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
                return a.q_index - b.q_index;
            });
            state.clientId = action.payload.client_id
        })
        builder.addCase(completeSurveyThunk.fulfilled, (state) => {
            state.surveyCompleted = true
        })
        builder.addCase(getResponsesThunk.fulfilled, (state, action) => {
            let data = action.payload.responses
            if (action.payload.value_responses && action.payload.value_responses.length > 0) {
                const valuesResponse = {
                    question: action.payload.value_responses[0].question,
                    survey: action.payload.value_responses[0].question,
                    participant: action.payload.value_responses[0].question,
                    answer: action.payload.value_responses
                }
                data = [...data, valuesResponse]
            }

            state.responses = data

        })
        builder.addCase(getClientValuesThunk.fulfilled, (state, action) => {
            state.coreValues = action.payload
        })
        builder.addCase(setResponsesThunk.fulfilled, (state, action) => {
            let data = action.payload.responses
            if (action.payload.value_responses && action.payload.value_responses.length > 0) {
                const valuesResponse = {
                    question: action.payload.value_responses[0].question,
                    survey: action.payload.value_responses[0].question,
                    participant: action.payload.value_responses[0].question,
                    answer: action.payload.value_responses
                }
                data = [...data, valuesResponse]
            }

            state.responses = data
        })
        builder.addCase(setTextFieldResponsesThunk.fulfilled, (state, action) => {
            let data = action.payload.responses
            if (action.payload.value_responses && action.payload.value_responses.length > 0) {
                const valuesResponse = {
                    question: action.payload.value_responses[0].question,
                    survey: action.payload.value_responses[0].question,
                    participant: action.payload.value_responses[0].question,
                    answer: action.payload.value_responses
                }
                data = [...data, valuesResponse]
            }

            state.responses = data
        })
        builder.addCase(setValueResponsesThunk.fulfilled, (state, action) => {
            let data = action.payload.responses
            if (action.payload.value_responses && action.payload.value_responses.length > 0) {
                const valuesResponse = {
                    question: action.payload.value_responses[0].question,
                    survey: action.payload.value_responses[0].question,
                    participant: action.payload.value_responses[0].question,
                    answer: action.payload.value_responses
                }
                data = [...data, valuesResponse]
            }

            state.responses = data
        })
    }
})

export const { updateSurveyProgress, updatePid, updateResponses } = cwcSlice.actions

export default cwcSlice.reducer