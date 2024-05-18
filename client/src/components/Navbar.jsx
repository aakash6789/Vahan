import React,{useState} from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import useMediaQuery from "../hooks/useMediaQuery.jsx"
const Navbar = () => {
  
  const isAboveSmallScreens = useMediaQuery("(min-width:640px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  return (
    <div>
     <header className="bg-white">
      {isAboveSmallScreens?<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img> */}
        <img className="h-8 w-auto" src={logo} alt=""></img>
      </a>
    </div>
   
    <div className="flex gap-x-12 max-lg:gap-x-6 max-lg:text-[0.3rem]">
      

      <NavLink to='' style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none'
      })}><a href="#" className="text-sm max-lg:text-[0.7rem] font-semibold leading-6 text-gray-900 hover:underline-offset-2 hover:underline to-black">Create Table</a></NavLink>
      <NavLink to='/view-tables' style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none'
      })}> <a href="#" className="text-sm max-lg:text-[0.7rem] font-semibold leading-6 text-gray-900 hover:underline-offset-2 hover:underline to-black">View Tables</a></NavLink>
     
      <a href="#" className="text-sm max-lg:text-[0.7rem] font-semibold leading-6 text-gray-900">Marketplace</a>
      <a href="#" className="text-sm max-lg:text-[0.7rem] font-semibold leading-6 text-gray-900">Company</a>
      <a href="#" className="text-sm max-lg:text-[0.7rem] font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
  
    </div>
  </nav>:<div className="sm:hidden" role="dialog" aria-modal="true">

<div className="  "></div>
<div className=" right-0  w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
  <div className="flex items-center justify-between">
    <a href="#" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img> */}
      <img className="h-8 w-auto" src={logo} alt=""></img>
    </a>
    {!isMenuToggled && ( <button onClick={()=>setIsMenuToggled(!isMenuToggled)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor" aria-hidden="true">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>)}
    {isMenuToggled && (<button onClick={()=>setIsMenuToggled(!isMenuToggled)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
      <span className="sr-only">Close menu</span>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor" aria-hidden="true">
        <path  d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>)}
    
    
  </div>
  <div className="mt-6 flow-root">
   {isMenuToggled && (<div className="-my-6 divide-y divide-gray-500/10">
      <div className="space-y-2 py-6">
       
       <NavLink to=''><a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Create Table</a></NavLink> 
       <NavLink to='/view-tables'> <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">View Table</a></NavLink>    
        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
      </div>
      <div className="py-6">
        <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
      </div>
    </div>)} 
  </div>
</div>
</div>}
 
</header>
    </div>
  )
}

export default Navbar