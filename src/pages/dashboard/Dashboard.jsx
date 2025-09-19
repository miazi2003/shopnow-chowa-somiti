import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const monthNames = [
  "জানুয়ারী",
  "ফেব্রুয়ারী",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [searchData, setSearchData] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [memberData, setMemberData] = useState([]);
  const [sum, setSum] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDepositData = async () => {
    try {
      const res = await axios.get("https://shopnow-chowa-somiti-server.vercel.app/user-deposit");
      setMemberData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepositData();
  }, []);

  const uniqueYears = useMemo(() => {
    const years = memberData.map((d) => new Date(d.date).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  }, [memberData]);

  const filteredData = useMemo(() => {
    const searchLower = searchData.trim().toLowerCase();
    
    // If search term is present, filter by member name
    if (searchLower) {
      return memberData.filter((d) =>
        d.memberName.toLowerCase().includes(searchLower)
      );
    } 
    // Otherwise, filter by selected month and year
    else {
      const filteredByMonthAndYear = memberData.filter((d) => {
        const date = new Date(d.date);
        return (
          date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
        );
      });
      return filteredByMonthAndYear;
    }
  }, [memberData, searchData, selectedMonth, selectedYear]);

  // Update sum whenever filteredData changes
  useEffect(() => {
    const total = filteredData.reduce(
      (acc, item) => acc + (parseFloat(item.amount) || 0),
      0
    );
    setSum(total);
  }, [filteredData]);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear, searchData]);

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

  return (
    <div className="w-full main flex flex-col min-h-screen">
      <div className="overflow-x-auto md:p-4 p-0 flex flex-col gap-4">
        {/* Filters */}
        <div className="flex-col md:flex-row gap-4 mb-4 items-center hidden md:flex px-4 md:p-0">
          <input
            type="text"
            placeholder="নাম দিয়ে খুজুন..."
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
              <option key={idx} value={idx}>
                {name}
              </option>
            ))}
          </select>
          <select
            className="select rounded-full bg-[#EDF7EA] border-2 border-black w-full md:w-1/6"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
              <option value="" disabled>-- Year --</option>
            {uniqueYears.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
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
                    {data.mobile1}
                    <br />
                    {data.mobile2}
                  </td>
                  <td>{data.amount}</td>
                  <td>{(data.date || "").split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  কোনো তথ্য পাওয়া যায়নি...
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
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
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