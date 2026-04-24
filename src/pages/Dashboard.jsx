import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiFolder,
  FiSettings,
} from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${backendAPI}/dashboard/summary`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setData(res.data);
        setRole(res.data.role);
      } catch (err) {
        alert("Error fetching dashboard");
      }
    };

    fetchSummary();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-100 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 capitalize">
          Role: {role?.toLowerCase()}
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        {/* Income */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Total Income</p>
            <FiTrendingUp className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            ₹{data.totalIncome}
          </h2>
        </div>

        {/* Expense */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Total Expense</p>
            <FiTrendingDown className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mt-2">
            ₹{data.totalExpense}
          </h2>
        </div>

        {/* Balance */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Net Balance</p>
            <FiDollarSign className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            ₹{data.netBalance}
          </h2>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4">
        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <button
              onClick={() => (window.location.href = "/records")}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <FiFolder /> View Records
            </button>

            <button
              onClick={() => (window.location.href = "/admin")}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg shadow hover:bg-black transition"
            >
              <FiSettings /> Admin Panel
            </button>
          </>
        )}

        {/* ANALYST */}
        {role === "ANALYST" && (
          <button
            onClick={() => (window.location.href = "/records")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FiFolder /> View Records
          </button>
        )}

        {/* VIEWER */}
        {role === "VIEWER" && (
          <div className="text-gray-500 text-sm mt-2">
            You can only view dashboard insights.
          </div>
        )}
      </div>
    </div>
  );
}
