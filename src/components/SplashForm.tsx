import { useState, useEffect } from "react";
import Picker from "./AvatarPicker/Picker";

type SplashFormProps = {
  onData: (data: {
    username: string;
    dob: string;
    gender: string;
    role: string;
    avatar: string | null;
  }) => void;
};

export default function SplashForm({ onData }: SplashFormProps) {
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 0;
  const finalRole = age < 13 ? "Explorer" : role;

  // ⭐ Always send updated data when fields are valid
  useEffect(() => {
    if (username && dob && gender && finalRole) {
      onData({
        username,
        dob,
        gender,
        role: finalRole,
        avatar,
      });
    }
  }, [username, dob, gender, finalRole, avatar]); // finalRole added

  return (
    <>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            className="input-field"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="input-field"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <select
            className="input-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Boy">Male</option>
            <option value="Girl">Female</option>
          </select>

          {/* ⭐ Hide or disable role selection for kids */}
          <select
            className="input-field"
            value={finalRole}
            onChange={(e) => setRole(e.target.value)}
            disabled={age < 13}
          >
            <option value="">Choose</option>
            <option value="Hunter">Hunter</option>
            <option value="Gatherer">Gatherer</option>
            <option value="Explorer">Junior Explorer</option>
          </select>

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
              <button
                className="button1"
                type="button"
                onClick={() => setShowPicker(true)}
              >
                Choose Avatar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}