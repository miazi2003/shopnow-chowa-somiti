import React from 'react';
import logo2 from "../../assets/logo.png"
const Navbar = () => {
    return (
      <div className="navbar bg-[#A8BBA3] shadow-sm text-black ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       
      </ul>
    </div>
   <a href="/"><img src={logo2} alt="" className='h-16 w-16' /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-semibold">
    <li><p>হোম</p></li> 
    <li><p>হিসাব</p></li> 
    <li><p>আমাদের তথ্য</p></li> 
    <li><p>সদস্যদের তথ্য</p></li>  
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn bg-yellow-300 text-black rounded-4xl">লগ আউট</a>
  </div>
</div>
    );
};

export default Navbar;