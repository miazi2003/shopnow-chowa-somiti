import axios from "axios";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router";



export default function MemberDepositForm() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

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
  }, [axios]);

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
        date: date,
        email : selectedUser.memberEmail,
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
    <div className="max-w-md mx-auto bg-white p-6 my-8 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Member</label>
          {loadingUsers ? (
            <p className="p-2 w-full h-17">Loading members...</p>
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

        {selectedUser ? (
          <div className="mb-4">
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedUser.presentVillage}, ${selectedUser.presentPost}, ${selectedUser.presentThana}, ${selectedUser.presentDistrict}`}
            </p>
          </div>
        ) :  <p>
              <strong>Address:</strong>
                Loading Address....
            </p> }

        {selectedUser ? (
          <div className="mb-4">
            <p>
              <strong>User Email:</strong>{" "}
              {`${selectedUser.memberEmail}`}
            </p>
          </div>
        ) :  <p>
              <strong>Address:</strong>
                Loading Address....
            </p> }

<div className="mb-4">
  <label className="block mb-1 font-medium">Deposit Date</label>
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
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

    
    </>
  );
}
