import { useEffect, useState } from "react";
import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function UserListModal({ onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("VIEWER");

  // 🔥 Fetch users
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

  // 🔥 Change role
  const handleChangeRole = async () => {
    if (!selectedUser) return alert("Select a user");

    try {
      await axios.patch(
        `${backendAPI}/users/${selectedUser._id}/role`,
        { changedrole: role },
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
      <div className="bg-white p-6 rounded w-100 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        {/* USER LIST */}
        <div className="space-y-2 mb-4">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-2 border rounded cursor-pointer ${
                selectedUser?._id === user._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs">Role: {user.role}</p>
            </div>
          ))}
        </div>

        {/* SELECTED USER */}
        {selectedUser && (
          <div className="mb-4">
            <p className="text-sm mb-2">Selected: {selectedUser.username}</p>

            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="VIEWER">VIEWER</option>
              <option value="ANALYST">ANALYST</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        )}

        <div className="flex justify-between">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Close
          </button>

          <button
            onClick={handleChangeRole}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
}
