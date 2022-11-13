import React from "react";
// import React Router Dom
import { Routes, Route } from "react-router-dom";

import { useTypedSelector } from "./hooks/useTypedSelector";

// Import components
import Login from "./pages/auth/login";
import NotFound from "./pages/notFound";
import ForgotPassword from "./pages/auth/forgotPassword";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import CreateUser from "./pages/createUser";
import Profile from "./pages/profile";
import EditUser from "./pages/editUser";

const App: React.FC = () => {
  // For protected routes
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);

  return (
    <Routes>
      {isAuth && (
        <>        
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="edit/:id" element={<EditUser />} />
              <Route path="users" element={<Users />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}
        </>
      )}

      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/dashboard/*" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
