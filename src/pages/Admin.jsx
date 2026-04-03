import { useEffect, useState } from "react";
import axios from "axios";
import CreateRecordModal from "../components/CreateRecordModal";
import ChangeRoleModal from "../components/ChangeRoleModal";
import UserListModal from "../components/UserListModal";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

function Admin() {
  const [records, setRecords] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openRole, setOpenRole] = useState(false);
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
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setSelectedRecord(null);
            setOpenCreate(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Record
        </button>

        <button
          onClick={() => setOpenUsers(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Get Users
        </button>
      </div>

      {/* RECORD LIST */}
      <div className="max-w-xl mx-auto space-y-4">
        {records.map((r) => (
          <div key={r._id} className="border p-4 rounded">
            <p>
              {r.amount} - {r.type}
            </p>

            <button
              onClick={() => {
                setSelectedRecord(r);
                setOpenCreate(true);
              }}
              className="mt-2 bg-gray-800 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

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
