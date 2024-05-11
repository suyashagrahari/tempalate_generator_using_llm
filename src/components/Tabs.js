import React from 'react'
import Right from "../images/right.png"
const Tabs = () => {
  return (
    <>
    <div className='flex flex-row gap-10 justify-center flex-wrap mt-16'>
        <div className='flex flex-row gap-2 items-center justify-center w-[366px] h-[87px] bg-white rounded-xl text-tab-text-col'>
            <img src={Right} alt="Right icon" />
            Professional templates
        </div>
        <div className='flex flex-row gap-2 items-center justify-center w-[366px] h-[87px] bg-white rounded-xl text-tab-text-col'>
            <img src={Right} alt="Right icon" />
            Personalizable
        </div>
        <div className='flex flex-row gap-2 items-center  justify-center w-[366px] h-[87px] bg-white rounded-xl text-tab-text-col'>
            <img src={Right} alt="Right icon" />
            Save time
        </div>
    </div>
    </>
  )
}

export default Tabs