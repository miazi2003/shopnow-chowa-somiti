import React from 'react';
import memberData from "../../../public/members.json"
const TableData = () => {
    return (
        <div>
            <div className="overflow-x-auto">
              <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>address</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
{memberData.map((data)=>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>{data.id}</th>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.monthlyAmount}</td>
        <td>{data.monthlySavingDate}</td>
      </tr>
    </tbody>
)}
  </table>
</div>
        </div>
    );
};

export default TableData;
