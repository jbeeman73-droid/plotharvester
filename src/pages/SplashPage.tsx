console.log("SPLASH PAGE LOADED");

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SplashForm from "../components/SplashForm";
import PlayerCard from "../components/PlayerCard";
import IconGrid from "../components/IconGrid";
import FooterSection from "../components/FooterSection";

import type { PlayerData } from "../types/PlayerData";
import "./SplashPage.css";

type Props = {
  onCreate: (user: PlayerData) => void;
};

export default function SplashPage({ onCreate }: Props) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (playerData) {
      onCreate(playerData);
      navigate("/main");
    }
  };

  return (
    <div className="add-profile-container">
      <h1 className="add-profile-title">Create a New Profile</h1>

      <div className="add-profile-grid">
        <div className="add-left">
          <SplashForm onData={(data: PlayerData) => setPlayerData(data)} />

          <button
            className="create-profile-btn"
            onClick={handleSubmit}
            disabled={!playerData}
          >
            Create Profile
          </button>

          <button
            className="select-user-btn"
            style={{ marginTop: 16, background: '#222', color: '#fff', border: '1px solid #555', borderRadius: 8, padding: '10px 18px', cursor: 'pointer' }}
            onClick={() => navigate('/profiles')}
          >
            Already Registered? Select User
          </button>
        </div>

        <div className="add-right">
          <PlayerCard data={playerData} />
          <IconGrid />
        </div>
      </div>

      <FooterSection />
    </div>
  );
}