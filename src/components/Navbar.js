import React from 'react'
import logo from "../images/logo.png"
const Navbar = () => {
  return (
    <>
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="logo" />
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-5">
      <a className="mr-5 hover:text-gray-900">Product</a>
      <a className="mr-5 hover:text-gray-900">Solutions</a>
      <a className="mr-5 hover:text-gray-900">Tools</a>
      <a className="mr-5 hover:text-gray-900">Resources</a>
      <a className="mr-5 hover:text-gray-900">Company</a>
    </nav>
    <button className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 bg-button-col w-[158px] h-[48px] text-white flex justify-center">Request demo
      
    </button>
  </div>
</header>
    </>
  )
}

export default Navbar