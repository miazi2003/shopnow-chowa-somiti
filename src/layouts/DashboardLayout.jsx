import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import Footer from '../component/footer/Footer';
import { AuthContext } from '../context/AuthContext';
import PrivateRouter from '../router/PrivateRouter';
import logo from "../assets/logo.png";
import menu from "../assets/menus.png";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);


  let userEmail = user?.email;
 
   
  return (
    <div className="drawer lg:drawer-open flex min-h-screen">

      {/* Drawer toggle checkbox */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-[#edf7ea] gap-2 text-base-content min-h-full w-60 p-4 border-r-1 border-[#ccc]">
          <li>
            <NavLink to="/service" className='bg-yellow-600 text-white flex items-center'>
              <span className='text-2xl font-bold'>↵ </span> মেন্যু তে ফিরুন
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboardLayout/dashboard">ড্যাশবোর্ড</NavLink>
          </li>

          {/* Admin-only menu items */}
     { userEmail === "yeasinmiazi1997@gmail.com" &&



    <>
         
          <li>
                <NavLink to="/dashboardLayout/signIn">মেম্বার যুক্ত করুন</NavLink>
              </li>
              <li>
                <NavLink to="/dashboardLayout/deposit">সদস্যের নামে জমা যুক্ত করুন</NavLink>
              </li>
         </>
     }
             
          
        </ul>
      </div>

      {/* Main content */}
      <div className="drawer-content flex-1 flex flex-col min-h-screen">

        {/* Navbar */}
        <div className="navbar bg-[#A8BBA3] shadow-sm flex">
          <div className="flex-1 flex gap-4 items-center lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <img src={menu} className="w-6 h-6" alt="menu" />
            </label>
          </div>

          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">
              <img src={logo} className="w-16 h-16" alt="logo" />
            </a>
          </div>

          <div className="flex-1 flex justify-end">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Dynamic page content */}
        <div className="flex-1 md:p-4 p-0">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
