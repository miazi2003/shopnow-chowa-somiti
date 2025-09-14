import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllMember = () => {

const [allUsers, setAllUsers] = useState([])


useEffect(()=>{

try{
        const fetchAllUsers = async() =>{
const res = await axios.get('http://localhost:5000/users')
console.log(res.data)
setAllUsers(res.data)
    }
fetchAllUsers()
}catch(err){
    console.log(err)
}
},[])

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