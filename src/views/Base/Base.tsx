import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Outlet, useParams } from 'react-router-dom';
import verifySurvey from '../../thunks/verifyThunk';
import { RootState } from '../../store/store';
import Four0Four from '../../components/four0Four/four0Four';

const Base = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const isSurveyValid = useAppSelector((root: RootState) => root.cwc.isValidSurvey)

    useEffect(() => {
        verifySurveyValidity()
    }, [])


    const verifySurveyValidity = async () => {
        await dispatch(verifySurvey(id || ""))
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center w-full h-[80vh] text-colorText text-lg font-roboto">Validating Assessment...</div>
            )}

            {
                !isLoading && isSurveyValid && (
                    <Outlet />
                )
            }

            {
                !isLoading && !isSurveyValid && (
                    <Four0Four />
                )
            }

        </>
    )
}

export default Base