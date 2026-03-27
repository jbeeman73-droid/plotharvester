import { useState } from "react";
import  Picker from "../components/AvatarPicker/Picker";
import './PlayerCard.css';
import type { PlayerData } from "../types/PlayerData";
type SplashFormProps = {
  onData: (data: PlayerData) => void;
};


export default function SplashForm({ onData }: SplashFormProps) {
  const [username, setUsername] = useState("Username");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
// Determine final role based on age
const age = new Date().getFullYear() - new Date(dob).getFullYear();
const finalRole = age < 13 ? "Explorer" : role;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !dob || !gender || !role) {
      alert("Please complete all fields.");
      return;
    }
    onData({ username, dob, gender, role: finalRole, avatar });
  };

  return (
    <>
      {/* Placeholder for Avatar Picker Modal */}
      {showPicker && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <button className="modal-close" onClick={() => setShowPicker(false)}>
        ✕
      </button>

      <Picker
        onSelect={(value) => {
          setAvatar(value);
          setShowPicker(false);
        }}
      />
    </div>
  </div>
)}


    <div className="input-container">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",

          flexDirection: "column",
          gap: "16px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input className="input-field"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input className="input-field"
            type="date"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <select className="input-field"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Boy">Male</option>
            <option value="Girl">Female</option>
            
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <select className="input-field"
            value={role}
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Choose</option>
            <option value="Hunter">Hunter</option>
            <option value="Gatherer">Gatherer</option>
            <option value="Explorer">Junior Explorer</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <button className="button1" type="button" onClick={() => setShowPicker(true)}>
              Choose Avatar
            </button>
          )}

          <button className="button1" type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
}