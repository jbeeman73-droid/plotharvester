import type { PlayerData } from "../types/PlayerData";
import './PlayerCard.css';

export default function PlayerCard({ data }: { data: PlayerData | null }) {
  if (!data) return <div>No player data yet</div>;

  return (
    <div className="license-card">
      {/* Avatar on the left */}
      {data.avatar && (
        <img src={data.avatar} className="license-avatar" alt="avatar" />
      )}

      {/* Info on the right */}
      <div className="license-info">
        {/* Role at the top */}
        <div className="license-role">{data.role}</div>
        {/* Info fields */}
        <p className="license-field">
          <span className="license-label"></span> {data.username}
        </p>
        <p className="license-field">
          <span className="license-label">DOB:</span> {data.dob}
        </p>
        <p className="license-field">
          <span className="license-label">Gender:</span> {data.gender}
        </p>
      </div>
    </div>
  );
}