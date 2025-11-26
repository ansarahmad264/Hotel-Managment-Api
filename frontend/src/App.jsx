import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import DashboardLayout from "./pages/layouts/dashboard.layout";
import AuthLayout from "./pages/layouts/auth.layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/dashboard/home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<SignInPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Home />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
        }
      />
    </Routes>
  );
}

export default App;
