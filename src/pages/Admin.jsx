import { useEffect, useState } from "react";
import axios from "axios";
import CreateRecordModal from "../components/CreateRecordModal";
import UserListModal from "../components/UserListModal";
import { FiPlus, FiUsers, FiEdit2 } from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

function Admin() {
  const [records, setRecords] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    const res = await axios.get(`${backendAPI}/records`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setRecords(res.data.records);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-100 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin <span className="text-blue-600">Dashboard</span>
        </h1>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => {
            setSelectedRecord(null);
            setOpenCreate(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FiPlus /> Create Record
        </button>

        <button
          onClick={() => setOpenUsers(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition"
        >
          <FiUsers /> Manage Users
        </button>
      </div>

      {/* RECORD LIST */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((r) => (
          <div
            key={r._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">
                {r.category || "General"}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  r.type === "INCOME"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {r.type}
              </span>
            </div>

            <p className="text-2xl font-bold mt-3 text-gray-900">₹{r.amount}</p>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(r.date).toLocaleDateString()}
            </p>

            {r.notes && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {r.notes}
              </p>
            )}

            <button
              onClick={() => {
                setSelectedRecord(r);
                setOpenCreate(true);
              }}
              className="mt-4 flex items-center gap-2 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-black transition"
            >
              <FiEdit2 size={14} /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {records.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No records found. Start by creating one.
        </div>
      )}

      {/* MODALS */}
      {openCreate && (
        <CreateRecordModal
          existingData={selectedRecord}
          onClose={() => {
            setOpenCreate(false);
            fetchRecords();
          }}
        />
      )}

      {openUsers && <UserListModal onClose={() => setOpenUsers(false)} />}
    </div>
  );
}

export default Admin;
