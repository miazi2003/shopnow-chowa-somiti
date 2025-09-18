import React, { useEffect, useState } from "react";
import axios from "axios";




const monthNames = [
  "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [searchData, setSearchData] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [memberData, setMemberData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [editingRow, setEditingRow] = useState(null);
  // const [updateAmount, setUpdateAmount] = useState("");
  // const [updateDate, setUpdateDate] = useState("");
  const [sum, setSum] = useState(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDepositData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user-deposit");
      setMemberData(res.data);

      const total = res.data.reduce(
        (acc, item) => acc + (parseFloat(item.amount) || 0),
        0
      );
      setSum(total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepositData();
  }, []);

  const uniqueYears = [
    ...new Set(memberData.map((d) => new Date(d.date).getFullYear())),
  ];

  useEffect(() => {
    let result = memberData;
    const searchLower = searchData.trim().toLowerCase();

    const isNameSearch = memberData.some((d) =>
      d.memberName.toLowerCase().includes(searchLower)
    );

    if (searchLower !== "" && isNameSearch) {
      result = result.filter((d) =>
        d.memberName.toLowerCase().includes(searchLower)
      );
    } else {
      result = result.filter((d) => {
        const date = new Date(d.date);
        return (
          date.getMonth() === selectedMonth &&
          date.getFullYear() === selectedYear
        );
      });

      if (searchLower !== "") {
        result = result.filter((data) => {
          const monthMatch = monthNames[new Date(data.date).getMonth()]
            .toLowerCase()
            .includes(searchLower);
          return monthMatch;
        });
      }
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [selectedMonth, selectedYear, searchData, memberData]);

  const clearFilters = () => {
    setSearchData("");
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleEdit = (row) => {
  //   setEditingRow(row);
  //   setUpdateAmount(row.amount);
  //   setUpdateDate((row.date || "").split("T")[0]);
  // };

  // const handleUpdate = async () => {
  //   if (!updateAmount || !updateDate) return alert("Enter amount and date");

  //   try {
  //     await axios.put(
  //       `http://localhost:5000/user-deposit/${editingRow._id}`,
  //       {
  //         amount: parseFloat(updateAmount),
  //         date: updateDate,
  //       }
  //     );

  //     setEditingRow(null);
  //     alert("Deposit updated successfully!");

  //     // Auto refresh data
  //     fetchDepositData();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to update deposit");
  //   }
  // };

  return (
    <div className="w-full main flex flex-col min-h-screen">

      {/* Update Form
      {editingRow && (
        <div className="mb-4 p-4 bg-yellow-100 rounded shadow">
          <h3 className="font-bold mb-2">Update Deposit for {editingRow.memberName}</h3>
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <input
              type="number"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
              className="border rounded p-2 flex-1"
              placeholder="Amount"
            />
            <input
              type="date"
              value={updateDate}
              onChange={(e) => setUpdateDate(e.target.value)}
              className="border rounded p-2 flex-1"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setEditingRow(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      <div className="overflow-x-auto md:p-4 p-0 flex flex-col gap-4">
        {/* Filters */}
        <div className="flex-col md:flex-row gap-4 mb-4 items-center hidden md:flex px-4 md:p-0">
          <input
            type="text"
            placeholder="নাম দিয়ে খুজুন..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            className="input rounded-full bg-transparent border-2 border-black w-full md:w-1/6"
          />
          <select
            className="select rounded-full bg-[#EDF7EA] border-2 border-black w-full md:w-1/6"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {monthNames.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
          <select
            className="select rounded-full bg-[#EDF7EA] border-2 border-black w-full md:w-1/6"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {uniqueYears.map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>

          <div className="px-4 py-4 bg-green-100 text-green-800 rounded shadow flex gap-2 items-center w-1/6">
            <p>মোট জমাঃ {sum}</p>
          </div>

          <div className="p-2 bg-green-100 text-green-800 rounded shadow flex gap-2 items-center">
            <span className="font-semibold">আজ:</span>{" "}
            {currentDate.getDate()} {monthNames[currentMonth]} {currentYear}
            <button className="btn btn-ghost" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>

        {/* Data Table */}
        <table className="table w-full">
          <thead className="bg-black text-white">
            <tr>
              <th>আইডি</th>
              <th>নাম</th>
              <th>ঠিকানা</th>
              <th>মোবাইল</th>
              <th>পরিমাণ</th>
              <th>জমার তারিখ</th>
              <th>সংশোধন</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((data) => (
                <tr key={data._id}>
                  <td>{data.memberID}</td>
                  <td>{data.memberName}</td>
                  <td>{data.address}</td>
                  <td>
                    {data.mobile1}<br />{data.mobile2}
                  </td>
                  <td>{data.amount}</td>
                  <td>{(data.date || "").split("T")[0]}</td>
                  {/* <td>
                    <button
                      onClick={() => handleEdit(data)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      ✏️
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  কোনো তথ্য পাওয়া যায়নি...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
