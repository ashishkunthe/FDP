import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
