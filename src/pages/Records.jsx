import { useEffect, useState } from "react";
import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

function Records() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Records</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {records.length === 0 && !error && (
        <p className="text-center text-gray-500">No records found</p>
      )}

      <div className="max-w-xl mx-auto space-y-4">
        {records.map((record) => (
          <div key={record._id} className="border rounded-lg p-4 shadow-sm">
            <p>
              <strong>Amount:</strong> {record.amount}
            </p>
            <p>
              <strong>Type:</strong> {record.type}
            </p>
            <p>
              <strong>Category:</strong> {record.category}
            </p>
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            {record.notes && (
              <p>
                <strong>Notes:</strong> {record.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Records;
