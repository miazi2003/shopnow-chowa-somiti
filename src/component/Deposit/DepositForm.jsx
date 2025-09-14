import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import menu from "../../assets/menus.png";
import { NavLink } from "react-router";


export default function MemberDepositForm() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const { data } = await axios.get("http://localhost:5000/users");
        const userArray = Array.isArray(data) ? data : [];
        setUsers(userArray);
        if (userArray.length > 0) {
          setSelectedUserId(userArray[0]._id);
          setSelectedUser(userArray[0]);
        }
      } catch (err) {
        setError("Failed to load users: " + err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const user = users.find((u) => u._id === selectedUserId);
    setSelectedUser(user || null);
  }, [selectedUserId, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !amount) {
      setError("Please select a member and enter amount");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const depositData = {
        mobile1 : selectedUser.mobile1,
        mobile2 : selectedUser.mobile2,
        memberID : selectedUser.memberID,
        memberName: selectedUser.memberName,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        address: `${selectedUser.presentVillage}, ${selectedUser.presentPost}, ${selectedUser.presentThana}, ${selectedUser.presentDistrict}`,
      };
     const res =  await axios.post("http://localhost:5000/user-deposit", depositData);
      alert("Deposit saved successfully!");
      console.log(res.data)
      setAmount("");
    } catch (err) {
      setError("Failed to save deposit: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <>
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

    <div className="max-w-md mx-auto bg-white p-6 my-8 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Member</label>
          {loadingUsers ? (
            <p>Loading members...</p>
          ) : (
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Select Member --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.memberName}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedUser && (
          <div className="mb-4">
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedUser.presentVillage}, ${selectedUser.presentPost}, ${selectedUser.presentThana}, ${selectedUser.presentDistrict}`}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Deposit Date</label>
          <input
            type="text"
            value={new Date().toLocaleDateString()}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Saving..." : "Save Deposit"}
        </button>
      </form>
    </div>
    
      <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-[#edf7ea] gap-2 text-base-content min-h-full w-60 p-4 border-r-1 border-[#ccc]">
                  <li>
                    <NavLink
                      to="/dashboardLayout/dashboard"
                    >
                      ড্যাশবোর্ড
                    </NavLink>
                  </li>
                 <NavLink to={"/signIn"}>
                   <li>
                    <a>মেম্বার যুক্ত করুন</a> 
                  </li>
                 </NavLink>
                 <NavLink to={"/dashboardLayout/deposit"}>
                   <li>
                    <a>সদস্যের নামে জমা যুক্ত করুন</a> 
                  </li>
                 </NavLink>
    

                </ul>
              </div>
    
    </>
  );
}
