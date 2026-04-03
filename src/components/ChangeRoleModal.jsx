import { useState } from "react";
import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function ChangeRoleModal({ onClose }) {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("VIEWER");

  const handleChangeRole = async () => {
    try {
      await axios.patch(
        `${backendAPI}/users/${userId}/role`,
        { changedRole: role },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Role updated");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-87.5">
        <h2 className="text-xl font-semibold mb-4">Change Role</h2>

        <input
          placeholder="User ID"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUserId(e.target.value)}
        />

        <select
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="VIEWER">VIEWER</option>
          <option value="ANALYST">ANALYST</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <div className="flex justify-between">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>

          <button
            onClick={handleChangeRole}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
