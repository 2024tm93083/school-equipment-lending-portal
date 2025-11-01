import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EquipmentList from "./pages/equipments/EquipmentList";
import EquipmentAdmin from "./pages/equipments/EquipmentAdmin";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./context/AuthContext";
export default function AppRoutes() {
  const { user, roles } = useAuth();
  return (
    <div>
      {user && <Navbar></Navbar>}

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EquipmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipments"
            element={
              <ProtectedRoute>
                <EquipmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/equipment"
            element={
              <ProtectedRoute roles={["admin"]}>
                <EquipmentAdmin />
              </ProtectedRoute>
            }
          />
          {user ? (
              <>
               <Route path="*" element={<Navigate to="/login" /> } />
              </>
            ) : (
              <>
              <Route path="*" element={<Navigate to="/equipments" /> } />
              </>
            )}
        </Routes>
      </div>
    </div>
  );
}
