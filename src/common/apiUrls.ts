export const verifySurveyUrl = (id: string) => `/survey/${id}/valid`
export const loginUrl = "/survey/participants/login"
export const acceptTncUrl = (id: string) => `/survey/${id}/tnc`
export const getSUrveyUrl = (id: string, pid: string) => `/survey/${id}/participant/${pid}`
export const completeSurveyUrl = "/survey/complete"