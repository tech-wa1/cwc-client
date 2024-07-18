import { Button, Input } from 'antd';
import cwLogo from './../../assets/CT-cropped.svg';
import wa1Logo from './../../assets/wa1_logo.svg';
import { ChangeEvent, useState } from 'react';
import loginParticipant from '../../thunks/loginThunk';
import { useAppDispatch } from '../../hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [email, setEmail] = useState('')
    const [invalidUser, setInvalidUser] = useState(false)

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleLogin = async () => {
        const data = {
            email: email,
            survey: id || ""
        }
        const resp = await dispatch(
            loginParticipant(data)
        )

        if (loginParticipant.rejected.match(resp)) {
            setInvalidUser(true)
        } else if (loginParticipant.fulfilled.match(resp)) {
            setInvalidUser(false)
            navigate("../assessment")
        }
    }

    return (
        <section className='flex flex-col items-center justify-center h-[98vh] relative'>
            <div className='w-64 sm:w-96'>
                <img src={cwLogo} alt="competitive wellness logo" className='w-full' />
            </div>
            <div className='w-64 sm:w-96 m-12'>
                <div className='py-2'>
                    <Input type='text' placeholder='email@domain.com' className='h-12 text-md' onChange={changeEmail}></Input>
                    {invalidUser && (
                        <div className='text-red-500 text-xs py-2 font-roboto text-right'>Participant not found</div>
                    )}
                </div>
                <div className='py-2'>
                    <Button className="w-full h-12 text-lg" type="primary" size="large" onClick={handleLogin}>Log In</Button>
                </div>
            </div>
            <div className='w-32 sm:w-48 absolute bottom-6 right-10'>
                <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
            </div>
        </section>
    )
}

export default Login