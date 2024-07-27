export const verifySurveyUrl = (id: string) => `/survey/${id}/valid`
export const loginUrl = "/survey/participants/login"
export const acceptTncUrl = (id: string, pid: string) => `/survey/${id}/tnc/${pid}`
export const getSUrveyUrl = (id: string, pid: string) => `/survey/${id}/participant/${pid}`
export const getResponseUrl = (id: string, pid: string) => `/survey/${id}/response/${pid}`
export const setResponseUrl = 'survey/response'
export const completeSurveyUrl = "/survey/complete"