import { useEffect, useState } from "react";
import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [role, setRole] = useState("VIEWER");

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

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Summary */}
      <div className="max-w-md mx-auto border rounded-xl p-4 shadow mb-6">
        <p className="mb-2">💰 Income: {data.totalIncome}</p>
        <p className="mb-2">💸 Expense: {data.totalExpense}</p>
        <p className="font-semibold">Net: {data.netBalance}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3">
        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-48 hover:bg-blue-700"
              onClick={() => (window.location.href = "/records")}
            >
              View Records
            </button>

            <button
              className="bg-black text-white px-4 py-2 rounded w-48 hover:bg-gray-800"
              onClick={() => (window.location.href = "/admin")}
            >
              Admin Panel
            </button>
          </>
        )}

        {/* ANALYST */}
        {role === "ANALYST" && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-48 hover:bg-blue-700">
            View Records
          </button>
        )}

        {/* VIEWER */}
        {role === "VIEWER" && (
          <p className="text-gray-500">You can only view dashboard insights</p>
        )}
      </div>
    </div>
  );
}
