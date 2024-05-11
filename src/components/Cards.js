import React from 'react'

const Cards = () => {
  return (
    <>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Explore other free tools</h1>

    <div className="flex flex-wrap -m-4 justify-center">
      <div className="p-4 md:w-1/3 w-full">
        <div className="h-full bg-footer-col p-8 rounded-2xl">
            <div className='flex flex-col gap-5'>
            <p className="leading-relaxed mb-6 text-3xl font-medium text-wrap">Free job description generator</p>
          <p className="leading-relaxed mb-6">Turn your drab JDs into powerful JeDisr</p>
          <button className='bg-button-col w-[250px] h-[57px] rounded-xl text-white font-semibold'>
            Get started now
          </button>
            </div>
         
        </div>
      </div>

      <div className="p-4 md:w-1/3 w-full">
        <div className="h-full bg-footer-col p-8 rounded-2xl">
          <div className='flex flex-col gap-2'>
          <p className="leading-relaxed mb-6 text-3xl font-medium text-wrap">Free Interview Questions Generator</p>
          <p className="leading-relaxed mb-6">Generate interview questions for any job role and seniority in seconds</p>
          <button className='bg-button-col w-[250px] h-[57px] rounded-xl text-white font-semibold'>
            Get started now
          </button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Cards