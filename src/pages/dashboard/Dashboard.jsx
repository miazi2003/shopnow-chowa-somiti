import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import menu from "../../assets/menus.png";
import { Link, NavLink } from "react-router";
import axios from "axios";

const monthNames = [
  "জানুয়ারী",
  "ফেব্রুয়ারী",
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
  const [filteredData, setFilteredData] = useState([]);
 const [memberData , setMemberData] = useState([])
  useEffect(() => {
    try {
      const fetchDepositData = async () => {
        const res = await axios.get("http://localhost:5000/user-deposit");
        console.log(res.data);
        setMemberData(res.data);
      };
      fetchDepositData();
    } catch (err) {
      console.log(err);
    }
  }, []);



  const uniqueYears = [
    ...new Set(
      memberData.map((d) => new Date(d.date).getFullYear())
    ),
  ];

  useEffect(() => {
    let result = memberData;
    const searchLower = searchData.trim().toLowerCase();

    const isNameSearch = memberData.some((d) =>
      d.memberName.toLowerCase().includes(searchLower)
    );

    if (searchLower !== "" && isNameSearch) {
      result = result.filter((d) => d.memberName.toLowerCase().includes(searchLower));
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
          const monthMatch = monthNames[
            new Date(data.date).getMonth()
          ]
            .toLowerCase()
            .includes(searchLower);
          return monthMatch;
        });
      }
    }

    setFilteredData(result);
  }, [selectedMonth, selectedYear, searchData,memberData]);

  const clearFilters = () => {
    setSearchData("");
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-[#A8BBA3] shadow-sm flex">
        <div className="flex-1 flex gap-4 items-center md:hidden">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="w-full main flex flex-col lg:flex-row min-h-screen">
        <div className="drawer lg:drawer-open w-full border-r-1 border-[#ccc]">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="overflow-x-auto p-4">
              {/* ✅ Desktop Search Filters */}
              <div className="flex-col md:flex-row gap-4 mb-4 items-center hidden md:flex">
                <input
                  type="text"
                  placeholder="নাম দিয়ে খুজুন..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="input input-bordered w-full md:w-1/3"
                />

                <select
                  className="select select-bordered w-full md:w-1/6"
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
                  className="select select-bordered w-full md:w-1/6"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {uniqueYears.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <div className="p-2 bg-green-100 text-green-800 rounded shadow flex gap-2 items-center">
                  <span className="font-semibold">আজ:</span>{" "}
                  {currentDate.getDate()} {monthNames[currentMonth]}{" "}
                  {currentYear}
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
                  {filteredData.length > 0 ? (
                    filteredData.map((data) => (
                      <tr key={data.id}>
                        <td>{data.memberID}</td>
                        <td>{data.memberName}</td>
                        <td>{data.address}</td>
                        <td>{data.mobile1}<br/>{data.mobile2}</td>
                        <td>{data.amount}</td>
                        <td>{(data.date || "").split("T")[0]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-6">
                        কোনো তথ্য পাওয়া যায়নি...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-[#edf7ea] gap-2 text-base-content min-h-full w-60 p-4 border-r-1 border-[#ccc]">
              <li>
                <NavLink to="/dashboardLayout/dashboard">ড্যাশবোর্ড</NavLink>
              </li>
              <NavLink to={"/signIn"}>
                <li>
                  <p>মেম্বার যুক্ত করুন</p>
                </li>
              </NavLink>
              <NavLink to={"/dashboardLayout/deposit"}>
                <li>
                  <p>সদস্যের নামে জমা যুক্ত করুন</p>
                </li>
              </NavLink>

              {/* ✅ Mobile Search Filters inside Drawer */}
              <div className="flex-col md:flex-row gap-4 mt-6 items-center flex md:hidden">
                <input
                  type="text"
                  placeholder="নাম দিয়ে খুজুন..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="input input-bordered w-full"
                />

                <select
                  className="select select-bordered w-full"
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
                  className="select select-bordered w-full"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {uniqueYears.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <div className="p-2 bg-green-100 text-green-800 rounded shadow flex gap-2 items-center w-full mt-2">
                  <span className="font-semibold">আজ:</span>{" "}
                  {currentDate.getDate()} {monthNames[currentMonth]}{" "}
                  {currentYear}
                  <button className="btn btn-ghost" onClick={clearFilters}>
                    Clear
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
