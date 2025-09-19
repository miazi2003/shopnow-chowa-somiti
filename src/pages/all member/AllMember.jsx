
import React, { useEffect, useState } from 'react';

import axios from "axios";

const AllMember = () => {

const [allUsers, setAllUsers] = useState([])
const [error ,  setError] = useState(false)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("https://shopnow-chowa-somiti-server.vercel.app/users");
        console.log(res.data);
        setAllUsers(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchAllUsers();
  }, []);

  if (error) {
    return (
      <p className="min-h-screen w-full flex items-center justify-center text-red-600 font-bold text-2xl">
        No members Found.
      </p>
    );
  }


  if(allUsers.length === 0){
    return  (
      <p className="min-h-screen w-full flex items-center justify-center text-2xl">
      Loading members....
      </p>
    );
  }


    return (
<>
<div className='py-8 '>
<h1 className='text-2xl font-bold text-center'>আমাদের সম্মানিত সদস্যগন</h1>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-4'>
    {allUsers.map(users => <>
         <div className="card  bg-base-100 card-md shadow-sm">
  <div className="card-body">
    <p className="">ID : {users.memberID}</p>
    <h2 className="card-title">নামঃ {users.memberName}</h2>
    <h6>পিতাঃ {users.fatherName}</h6>
    <h6>মোবাইলঃ {users.mobile1}, <br /> {users.mobile2}</h6>
  </div>

  <div>
  </div>
</div>

</>)}
</div>
</div>


</>
    );
};

export default AllMember;



// memberID
// "M001"
// memberEmail
// "rahimuddin@gmail.com"
// memberPassword
// "123456"
// memberName
// "রহিম উদ্দিন"
// fatherName
// "করিম উদ্দিন"
// motherName
// "আছিয়া খাতুন"
// mobile1
// "01710000001"
// mobile2
// "01810000001"