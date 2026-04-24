import { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

function Records() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`${backendAPI}/records`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setRecords(res.data.records);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching records");
      }
    };

    fetchRecords();
  }, []);

  const filteredRecords =
    filter === "ALL" ? records : records.filter((r) => r.type === filter);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-100 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Financial Records</h1>

        {/* FILTER */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* EMPTY */}
      {filteredRecords.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-10">No records found</p>
      )}

      {/* RECORD GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            {/* TOP */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">
                {record.category || "General"}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  record.type === "INCOME"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {record.type}
              </span>
            </div>

            {/* AMOUNT */}
            <p className="text-2xl font-bold mt-3 text-gray-900">
              ₹{record.amount}
            </p>

            {/* DATE */}
            <p className="text-sm text-gray-500 mt-1">
              {new Date(record.date).toLocaleDateString()}
            </p>

            {/* NOTES */}
            {record.notes && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {record.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Records;
