import { useState, useEffect } from "react";
import axios from "axios";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function CreateRecordModal({ onClose, existingData }) {
  const [form, setForm] = useState({
    amount: "",
    type: "INCOME",
    category: "",
    date: "",
    notes: "",
  });

  // 🔥 PREFILL LOGIC
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
      if (existingData) {
        // 🔁 UPDATE
        await axios.patch(`${backendAPI}/records/${existingData._id}`, form, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        alert("Record updated");
      } else {
        // ➕ CREATE
        await axios.post(`${backendAPI}/records`, form, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        alert("Record created");
      }

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-87.5">
        <h2 className="text-xl font-semibold mb-4">
          {existingData ? "Update Record" : "Create Record"}
        </h2>

        <input
          placeholder="Amount"
          value={form.amount}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        />

        <select
          value={form.type}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>

        <input
          placeholder="Category"
          value={form.category}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          placeholder="Notes"
          value={form.notes}
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <div className="flex justify-between">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            {existingData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
