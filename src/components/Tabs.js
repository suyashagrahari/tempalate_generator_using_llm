import React from 'react'
import Right from "../images/right.png"
const Tabs = () => {
  return (
    <>
    <div className='flex flex-row gap-10 justify-center flex-wrap  mt-12'>
        <div className='flex sm:flex-row flex-col sm:text-lg font-medium text-sm gap-2 py-16 items-center justify-center w-[366px] h-[87px] bg-white rounded-xl text-black'>
            <img src={Right} alt="Right icon" className='md:w-10 w-8'/>
            Professional templates
        </div>
        <div className='flex sm:flex-row flex-col sm:text-lg  font-medium text-sm gap-2 py-16 items-center justify-center w-[366px] h-[87px] bg-white rounded-xl text-black '>
            <img src={Right} alt="Right icon" className='md:w-10 w-8' />
            Personalizable
        </div>
        <div className='flex sm:flex-row flex-col sm:text-lg  font-medium text-sm gap-2 py-16 items-center  justify-center w-[366px] h-[87px] bg-white rounded-xl text-black '>
            <img src={Right} alt="Right icon" className='md:w-10 w-8' />
            Save time
        </div>
    </div>
    </>
  )
}

export default Tabs