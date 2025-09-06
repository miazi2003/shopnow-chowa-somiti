import React from 'react';
import dashboard from "../../assets/dashboard.png"
import self from "../../assets/self-awareness.png"
import member from "../../assets/group (3).png"
import community from "../../assets/community.png"
import { Link } from 'react-router';
const MenuBox = () => {
    return (
       <div className='lg:w-3/4 px-6 mx-auto'>
             <div className='main grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4 py-4'>
                <Link to={"/dashboardLayout/dashboard"}>
                <div className=' shadows border border-[#ccc] rounded-lg text-center py-4 px-2 flex flex-col items-center gap-2'>
                    <img src={dashboard} alt="" />
                    <p className='font-bold'>ড্যাশবোর্ড</p>
                    <p className='text-xs '> সকল সদস্যের জমার হিসাব দেখুন</p>
                </div>
                </Link>
                <div className=' shadows border border-[#ccc] rounded-lg text-center py-4 px-2 flex flex-col items-center gap-2'>
                    <img src={self} alt="" />
                    <p className='font-bold'> সেলফ</p>
                    <p className='text-xs'>নিজের সকল জমার তথ্য দেখুন</p>
                    </div>
                <div className=' shadows border border-[#ccc] rounded-lg text-center py-4 px-2 flex flex-col items-center gap-2'>
                    <img src={member} alt="" />
                    <p className='font-bold'>সদস্য</p>
                    <p className='text-xs'>সকল সদস্য দেখুন</p>
                </div>
                <div className=' shadows border border-[#ccc] rounded-lg text-center py-4 px-2 flex flex-col items-center gap-2'>
                    <img src={community} alt="" />
                      <p className='font-bold'>সমিতির তথ্য</p>
                    <p className='text-xs'>সমিতির ব্যাপারে জানুন</p>
                </div>
                
            </div>
       </div>
    
    );
};

export default MenuBox;