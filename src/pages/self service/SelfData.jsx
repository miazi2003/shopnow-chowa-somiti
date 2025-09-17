import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import useAxiosSecure from '../../hook/useAxiosSecure';

const SelfData = () => {
  const { user, loading } = useContext(AuthContext);
  const [deposits, setDeposits] = useState([]);
  const [error, setError] = useState('');
  const [allSum , setAllSum] = useState(0)
  const [loadingData, setLoadingData] = useState(true);
    const axiosSecure = useAxiosSecure()
  useEffect(() => {
    if (!user) return;

    const fetchDeposits = async () => {
      try {
        setLoadingData(true);
        const res = await axiosSecure.get(`http://localhost:5000/deposits?email=${user.email}`);
        setDeposits(res.data);

      let total = 0 ;

      for ( let i = 0 ; i < res.data.length ; i ++){
        total +=  res.data[i].amount;
          
      }

      setAllSum(total)


      } catch (err) {
        console.error(err);
        setError('Could not fetch deposits');
      } finally {
        setLoadingData(false);
      }
    };

    fetchDeposits();



  }, [user , axiosSecure]);

  if (loading || loadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  if (!deposits.length) {
    return <p className="text-center mt-4">No deposits found.</p>;
  }


console.log(deposits)

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Deposits</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-black text-white">
            <tr>
              <th className="border px-4 py-2">আইডি</th>
              <th className="border px-4 py-2">নাম</th>
              <th className="border px-4 py-2">ঠিকানা</th>
              <th className="border px-4 py-2">মোবাইল</th>
              <th className="border px-4 py-2">পরিমাণ</th>
              <th className="border px-4 py-2">ডিপোজিট তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit._id} className="text-center">
                <td className="border px-4 py-2">{deposit.memberID}</td>
                <td className="border px-4 py-2">{deposit.memberName}</td>
                <td className="border px-4 py-2">{deposit.address}</td>
                <td className="border px-4 py-2">
                  {deposit.mobile1}, <br /> {deposit.mobile2}
                </td>
                <td className="border px-4 py-2">{deposit.amount}</td>
                <td className="border px-4 py-2">
                  {new Date(deposit.date).toLocaleDateString()}
                </td>
              </tr>
            ))}

            <tr>
                <td className="border px-4 py-2 text-center">মোট জমাঃ</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2">
                 
                </td>
                <td className="border px-4 py-2 text-center">{allSum} </td>
                <td className="border px-4 py-2 text-center">  </td>
               
            </tr> 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelfData;
