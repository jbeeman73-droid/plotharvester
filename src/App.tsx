import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import ProfileSelectPage from "./pages/ProfileSelectPage";
import MainAppPage from "./pages/MainAppPage";

import HuntingPage from "./pages/HuntingPage";
import FishingPage from "./pages/FishingPage";
import GardeningPage from "./pages/GardeningPage";
import ActivitiesPage from "./pages/ActivitiesPage";

import ManageUsersPage from "./pages/ManageUsersPage";

import type { PlayerData } from "./types/PlayerData";

function AppRoutes() {
  const [users, setUsers] = useState<PlayerData[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });
    // Persist users to localStorage whenever users changes
    useEffect(() => {
      localStorage.setItem("users", JSON.stringify(users));
    }, [users]);
  const [activeUser, setActiveUser] = useState<PlayerData | null>(null);

  const navigate = useNavigate();

  const addUser = (user: PlayerData) => {
    setUsers(prev => [...prev, user]);
    setActiveUser(user);
    navigate("/main");
  };

  const selectUser = (user: PlayerData) => {
    setActiveUser(user);
    navigate("/main");
  };

 const switchUser = () => {
  setActiveUser(null);
  navigate("/profiles");
};

  return (
    <Routes>
      <Route path="/" element={<SplashPage onCreate={addUser} />} />

      <Route
        path="/manage-users"
        element={
          <ManageUsersPage
            users={users}
            onDelete={(username) => setUsers(prev => prev.filter(u => u.username !== username))}
            onBack={() => navigate("/profiles")}
          />
        }
      />

      <Route
        path="/profiles"
        element={
          <ProfileSelectPage
            users={users}
            onSelect={selectUser}
            onAddNew={() => navigate("/")}
            onOpenSettings={() => navigate("/manage-users")}
          />
        }
      />

      <Route
        path="/main"
        element={
          <MainAppPage
            user={activeUser}
            onSwitchUser={switchUser}
          />
        }
      />

      <Route path="/hunting" element={<HuntingPage />} />
      <Route path="/fishing" element={<FishingPage />} />
      <Route path="/gardening" element={<GardeningPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}