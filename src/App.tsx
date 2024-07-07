import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import AllUsersVideos from "./pages/AllUsersVideos";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AllUsersVideos />} />
          <Route path="/user/:userId" element={<UserProfile />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
