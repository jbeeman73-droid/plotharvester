// pages/ManageUsersPage.tsx
import type { PlayerData } from "../types/PlayerData";

interface ManageUsersPageProps {
  users: PlayerData[];
  onDelete: (username: string) => void;
  onBack: () => void;
}

export default function ManageUsersPage({ users, onDelete, onBack }: ManageUsersPageProps) {
  return (
    <div>
      <h2>Manage Users</h2>

      <button onClick={onBack}>Back</button>

      <ul>
        {users.map((u) => (
          <li key={u.username} style={{ marginBottom: "8px" }}>
            {u.username} ({u.role})
            <button
              style={{ marginLeft: "12px", color: "red" }}
              onClick={(e) => {
                e.stopPropagation();   // ⭐ REQUIRED FIX
                onDelete(u.username);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}