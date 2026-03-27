import type { PlayerData } from "../types/PlayerData";
import "./ProfileSelectPage.css";
import { FiSettings } from "react-icons/fi"; // or any icon lib you use

type Props = {
  users: PlayerData[];
  onSelect: (user: PlayerData) => void;
  onAddNew: () => void;
   onOpenSettings: () => void; 
};

export default function ProfileSelectPage({ users, onSelect, onAddNew, onOpenSettings }: Props) {
  return (
    <div className="profile-select-container">
      <h1 className="profile-title">Select User</h1>
<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
  <button
    type="button"
    onClick={onOpenSettings}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "6px",
    }}
  >
    <FiSettings size={22} />
  </button>
</div>

      <div className="profile-grid">
        {users.map((user) => (
          <div
            key={user.username}
            className="profile-card"
            onClick={() => onSelect(user)}
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.username}
              className="profile-avatar"
            />
            <div className="profile-name">{user.username}</div>
            <div className="profile-role">{user.role}</div>
          </div>
        ))}

        {/* Add New Profile Card */}
        <div className="profile-card add-card" onClick={onAddNew}>
          <div className="add-plus">+</div>
          <div className="add-text">Add Profile</div>
        </div>
      </div>
    </div>
  );
}