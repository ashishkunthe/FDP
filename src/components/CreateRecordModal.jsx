import { useState, useEffect } from "react";
import axios from "axios";
import { FiDollarSign, FiTag, FiCalendar, FiFileText } from "react-icons/fi";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function CreateRecordModal({ onClose, existingData }) {
  const [form, setForm] = useState({
    amount: "",
    type: "INCOME",
    category: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // PREFILL
  useEffect(() => {
    if (existingData) {
      setForm({
        amount: existingData.amount,
        type: existingData.type,
        category: existingData.category,
        date: existingData.date?.slice(0, 10),
        notes: existingData.notes || "",
      });
    }
  }, [existingData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (existingData) {
        await axios.patch(`${backendAPI}/records/${existingData._id}`, form, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.post(`${backendAPI}/records`, form, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      }

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      {/* MODAL */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">
          {existingData ? "Update Record" : "Create Record"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {existingData
            ? "Modify your financial entry"
            : "Add a new financial record"}
        </p>

        {/* FORM */}
        <div className="mt-6 space-y-4">
          {/* AMOUNT */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <FiDollarSign className="text-gray-400 mr-2" />
              <input
                type="number"
                value={form.amount}
                placeholder="Enter amount"
                className="w-full outline-none text-sm"
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600">Type</label>
            <select
              value={form.type}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <FiTag className="text-gray-400 mr-2" />
              <input
                value={form.category}
                placeholder="e.g. Salary, Food"
                className="w-full outline-none text-sm"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <FiCalendar className="text-gray-400 mr-2" />
              <input
                type="date"
                value={form.date}
                className="w-full outline-none text-sm"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
          </div>

          {/* NOTES */}
          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <div className="flex items-start border rounded-lg px-3 py-2 mt-1">
              <FiFileText className="text-gray-400 mr-2 mt-1" />
              <textarea
                value={form.notes}
                placeholder="Optional notes..."
                className="w-full outline-none text-sm resize-none"
                rows={2}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
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
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? existingData
                ? "Updating..."
                : "Creating..."
              : existingData
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
