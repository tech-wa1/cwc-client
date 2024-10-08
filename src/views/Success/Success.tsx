import wa1Logo from "./../../assets/wa1_logo.svg";

const Success = () => {

    return (
        <section className="mt-24 h-96 text-colorText font-roboto flex flex-col items-center">
            <div className="flex lg:w-6/12 items-center text-center gap-5 flex-col text-sm lg:text-base p-5">
                <div className="text-2xl lg:text-3xl font-bold">Thank You!</div>
                <div className="text-lg lg:text-xl">You have completed the Assessment.</div>
                <div>Your feedback can help the leadership team take better  decisions on how to make your workplace an amazing place to grow.</div>
                <div>Rest assured, your feedback will be anonymous and your personal information will not be shared with the management team.</div>
            </div>

            <div className='w-32 sm:w-48 absolute bottom-6 right-10'>
                <img src={wa1Logo} alt="competitive wellness logo" className='w-full' />
            </div>
        </section>

    )
}

export default Success