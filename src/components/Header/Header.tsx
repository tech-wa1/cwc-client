import { Modal } from 'antd';
import wa1Logo from './../../assets/wa1_logo.svg';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

const Header = () => {

    const [showInstructions, setShowInstructions] = useState(false)

    const setModalOpen = (val: boolean) => {
        setShowInstructions(val)
    }

    return (
        <>
            <section className="h-16 flex justify-between items-center font-roboto">
                <div className='w-40 px-20 py-5'>
                    <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
                </div>
                <nav className='mr-20 text-sm'>
                    <menu>
                        <div className='text-colorText cursor-pointer' onClick={() => setModalOpen(true)}>Instructions</div>
                    </menu>
                </nav>
            </section>
            <Modal open={showInstructions} width={1000} style={{ top: 20 }} onCancel={() => setModalOpen(false)} footer={false}>
                <div className='font-roboto p-5'>
                    <div className='text-2xl'>Instructions </div>
                    <div className='text-lg'>
                        <ul>
                            <li className='p-2'>
                                There are no right or wrong answers—your authentic opinion matters most. Your unique perspectives will provide valuable insights.
                            </li>
                            <li className='p-2'>
                                Please read each question carefully. Select the option that best represents your view.
                            </li>
                            <li className='p-2'>
                                The survey should take approximately 15 minutes to complete. Please submit by deadline date.
                            </li>
                            <li className='p-2'>
                                Your progress is shown at the top of each page. Use the Next and Back Buttons for navigation. Avoid using your browser buttons to navigate.
                            </li>
                            <li className='p-2'>
                                Questions marked with the icon  <InfoCircleOutlined />  will provide additional information about the question and its expected outcomes.
                            </li>
                            <li className='p-2'>
                                At the end of the survey, click Submit to ensure your responses are recorded.
                            </li>
                            <li className='p-2'>
                                Your individual responses will remain confidential and will only be used in aggregate form.
                            </li>
                            <li className='p-2'>
                                For technical issues, contact <a href="mailto:support@workingas1.com">support@workingas1.com</a>. For questions about survey content, contact <a href="mailto:team@workingas1.com">team@workingas1.com</a>.
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Header