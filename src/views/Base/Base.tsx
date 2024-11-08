import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Outlet, useParams } from 'react-router-dom';
import verifySurvey from '../../thunks/verifyThunk';
import { RootState } from '../../store/store';
import Four0Four from '../../components/four0Four/four0Four';
import Header from '../../components/Header/Header';

const Base = () => {

    const dispatch = useAppDispatch()
    const { id, pid } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const isSurveyValid = useAppSelector((root: RootState) => root.cwc.isValidSurvey)

    useEffect(() => {
        verifySurveyValidity()
    }, [])


    const verifySurveyValidity = async () => {
        if (!pid || !id) {
            return
        }

        await dispatch(verifySurvey({
            survey_id: id,
            participant_id: pid
        }))
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center w-full h-[80vh] text-colorText text-lg font-roboto">Validating Assessment...</div>
            )}

            {
                !isLoading && isSurveyValid && (
                    <>
                        <Header></Header>
                        <div className='px-10 lg:px-20'>
                            <Outlet />
                        </div>
                    </>
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