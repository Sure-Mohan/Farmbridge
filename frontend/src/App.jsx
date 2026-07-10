import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Crops
import CropList from "./pages/crops/CropList";
import AddCrop from "./pages/crops/AddCrop";
import EditCrop from "./pages/crops/EditCrop";

// Livestock
import LivestockList from "./pages/livestock/LivestockList";
import AddLivestock from "./pages/livestock/AddLivestock";
import EditLivestock from "./pages/livestock/EditLivestock";

// Equipment
import EquipmentList from "./pages/equipment/EquipmentList";
import AddEquipment from "./pages/equipment/AddEquipment";
import EditEquipment from "./pages/equipment/EditEquipment";

// Other Pages
import Weather from "./pages/weather/Weather";
import MarketPrice from "./pages/market/MarketPrice";
import Analytics from "./pages/analytics/Analytics";
import Alerts from "./pages/alerts/Alerts";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Protected */}

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* Crop */}

            <Route
              path="/crops"
              element={<CropList />}
            />

            <Route
              path="/crops/add"
              element={<AddCrop />}
            />

            <Route
              path="/crops/edit/:id"
              element={<EditCrop />}
            />

            {/* Livestock */}

            <Route
              path="/livestock"
              element={<LivestockList />}
            />

            <Route
              path="/livestock/add"
              element={<AddLivestock />}
            />

            <Route
              path="/livestock/edit/:id"
              element={<EditLivestock />}
            />

            {/* Equipment */}

            <Route
              path="/equipment"
              element={<EquipmentList />}
            />

            <Route
              path="/equipment/add"
              element={<AddEquipment />}
            />

            <Route
              path="/equipment/edit/:id"
              element={<EditEquipment />}
            />

            {/* Other */}

            <Route
              path="/weather"
              element={<Weather />}
            />

            <Route
              path="/market"
              element={<MarketPrice />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/alerts"
              element={<Alerts />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;