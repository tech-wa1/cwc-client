import React, { useState, ChangeEvent, FormEvent } from 'react';
import { db } from './../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import wa1Logo from './../../assets/wa1_logo.svg';

const ClientFeedback: React.FC = () => {
    const [change, setChange] = useState<string>('');
    const [improvement, setImprovement] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log(e)
        e.preventDefault();

        try {
            // Add a new document with auto-generated ID to the "buskro_feedback" collection
            await addDoc(collection(db, 'buskro_feedback'), {
                change,
                improvement,
                feedback,
                timestamp: new Date(),
            });
            alert('Thank you. We have successfully captured your inputs!!');
            // Clear the form after submission
            setChange('');
            setImprovement('');
            setFeedback('');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setter(e.target.value);
        };

    return (
        <div className='w-full'>
            <div className='w-32 sm:w-48 m-auto mb-10'>
                <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
            </div>
            <div className='w-10/12 lg:w-7/12 text-colorText m-auto mt-10 font-roboto'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-colorText m-0 py-1'>Your Thoughts Matter!</h2>
                    <div className='font-thin'>We’d Love to Hear from You!</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='mt-10 text-sm font-bold mb-1'>
                            Change:
                        </div>

                        <textarea
                            className='w-11/12 rounded-lg shadow-sm p-2 h-28 border-slate-300'
                            value={change}
                            onChange={handleChange(setChange)}
                            rows={4}
                            cols={50}
                        />
                        <div className='mb-2 text-xs text-slate-500 flex items-start justify-start'>
                            <InfoCircleFilled className='m-2' />
                            <div className='my-1 w-11/12'>Share any new ideas or recommendations for changes that could benefit the company. Consider fresh approaches or innovations that might improve the current processes or strategies.</div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-10 text-sm font-bold mb-1'>
                            Improvement:
                        </div>
                        <textarea
                            className='w-11/12 rounded-lg shadow-sm p-2 h-28 border-slate-300'
                            value={improvement}
                            onChange={handleChange(setImprovement)}
                            rows={4}
                            cols={50}
                        />
                        <div className='mb-2 text-xs text-slate-500 flex items-start justify-start'>
                            <InfoCircleFilled className='m-2' />
                            <div className='my-1 w-11/12'>Provide feedback or ideas for enhancing existing processes or practices within the company. Focus on areas where fine-tuning could increase efficiency, productivity, or overall satisfaction.</div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-10 text-sm font-bold mb-1'>
                            Feedback:
                        </div>
                        <textarea
                            className='w-11/12 rounded-lg shadow-sm p-2 h-28 border-slate-300'
                            value={feedback}
                            onChange={handleChange(setFeedback)}
                            rows={4}
                            cols={50}
                        />
                        <div className='mb-2 text-xs text-slate-500 flex items-start justify-start'>
                            <InfoCircleFilled className='m-2' />
                            <div className='my-1 w-11/12'>Share your thoughts about this assessment, including what you liked or areas that could be improved. Your feedback helps us refine the assessment experience for you and others.</div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button htmlType="submit" type='primary' className='mt-10 w-48' size='large'>Submit</Button>
                    </div>

                </form>
            </div>
        </div >
    );
};

export default ClientFeedback;
