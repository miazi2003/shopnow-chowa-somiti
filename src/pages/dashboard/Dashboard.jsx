import logo from "../../assets/logo.png"
import menu from "../../assets/menus.png"
const Dashboard = () => {
    return (
<>

<div className="navbar bg-[#A8BBA3] shadow-sm flex">
  <div className="flex-1 flex gap-4 items-center md:hidden">

      <label htmlFor="my-drawer-2"  className=" drawer-button lg:hidden ">
      <img src={menu} className="w-6 h-6" alt="" />
    </label> 
   
  </div>

<div className="flex-1">
     <a href="/" className="btn btn-ghost text-xl">

        <img src={logo} className="w-16 h-16" alt="" />
    </a>
</div>


  <div className="flex-1 flex justify-end">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
    </button>
  </div>



</div>

        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
  
  </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-[#edf7ea]  text-base-content min-h-full w-60 p-4  border-r-1 border-[#ccc] ">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>


</>
    
    );
};

export default Dashboard;