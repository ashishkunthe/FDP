import { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function UserListModal({ onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("VIEWER");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${backendAPI}/users`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setUsers(res.data.users);
      } catch (err) {
        alert("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleChangeRole = async () => {
    if (!selectedUser) return alert("Select a user");

    try {
      setLoading(true);

      await axios.patch(
        `${backendAPI}/users/${selectedUser._id}/role`,
        { changedrole: role },
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
      {/* MODAL */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-hidden flex flex-col">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select a user and update their role
        </p>

        {/* USER LIST */}
        <div className="mt-6 space-y-3 overflow-y-auto pr-1">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border rounded-xl cursor-pointer transition-all ${
                selectedUser?._id === user._id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <FiUser size={14} /> {user.username}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <FiMail size={14} /> {user.email}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-600"
                      : user.role === "ANALYST"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SELECTED USER ACTION */}
        {selectedUser && (
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Change role for{" "}
              <span className="font-medium text-gray-800">
                {selectedUser.username}
              </span>
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
                <FiShield className="text-gray-400 mr-2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full outline-none text-sm bg-transparent"
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="ANALYST">Analyst</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                onClick={handleChangeRole}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
