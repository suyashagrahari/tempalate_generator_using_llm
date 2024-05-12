import React from 'react';

const Cards = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl sm:font-bold font-semibold title-font text-gray-900 mb-12 text-center">Explore other free tools</h1>

        <div className="flex flex-wrap justify-center">
          <div className=" sm:p-4 md:w-1/3 w-full">
            <div className="h-full bg-footer-col p-8 rounded-2xl">
              <div className='flex flex-col sm:gap-5 '>
                <p className="leading-relaxed mb-3 md:text-3xl sm:text-2xl text-xl text-black sm:font-semibold font-bold text-wrap">Free job description generator</p>
                <p className="leading-relaxed mb-6">Turn your drab JDs into powerful JeDisr</p>
                <button className='bg-button-col w-full md:w-[250px] md:h-[57px] sm:w-[200px] sm:h-[45px] w-[150px] h-[35px]  rounded-lg text-white sm:text-base  text-sm font-semibold'>
                  Get started now
                </button>
              </div>
            </div>
          </div>

          <div className="sm:p-4 pt-10 md:w-1/3 w-full">
            <div className="h-full bg-footer-col p-8 rounded-2xl">
              <div className='flex flex-col gap-2'>
                <p className="leading-relaxed mb-3 md:text-3xl sm:text-2xl text-xl text-black sm:font-semibold font-bold text-wrap">Free Interview Questions Generator</p>
                <p className="leading-relaxed mb-6">Generate interview questions for any job role and seniority in seconds</p>
                <button className='bg-button-col w-full md:w-[250px] md:h-[57px] sm:w-[200px] sm:h-[45px] w-[150px] h-[35px]  rounded-lg text-white sm:text-base  text-sm font-semibold'>
                  Get started now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
