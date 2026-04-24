import { useState } from "react";
import axios from "axios";
import { FiUser, FiShield } from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function ChangeRoleModal({ onClose }) {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [loading, setLoading] = useState(false);

  const handleChangeRole = async () => {
    if (!userId) return alert("Enter User ID");

    try {
      setLoading(true);

      await axios.patch(
        `${backendAPI}/users/${userId}/role`,
        { changedrole: role }, // match your backend key exactly
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      {/* MODAL CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">
          Change User Role
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update role permissions for a user
        </p>

        {/* USER ID */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">User ID</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              placeholder="Enter user ID"
              className="w-full outline-none text-sm"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>

        {/* ROLE SELECT */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Role</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
            <FiShield className="text-gray-400 mr-2" />
            <select
              className="w-full outline-none text-sm bg-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="VIEWER">Viewer</option>
              <option value="ANALYST">Analyst</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleChangeRole}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
