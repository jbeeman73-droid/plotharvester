import type { PlayerData } from "../types/PlayerData";

export interface ExplorerAppPageProps {
  user: PlayerData;
  onSwitchUser: () => void;
}

export default function ExplorerAppPage({
  user,
  onSwitchUser,
}: ExplorerAppPageProps) {
  return (
    <div>
      <h1>Explorer Mode</h1>

      <p>Welcome, {user.username}</p>
      <p>Your role: {user.role}</p>

      <button type="button" onClick={onSwitchUser}>
        Switch User
      </button>
    </div>
  );
}