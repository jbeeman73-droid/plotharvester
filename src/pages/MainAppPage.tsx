console.log("MAIN APP PAGE LOADED");

import type { PlayerData } from "../types/PlayerData";
import PlayerCard from "../components/PlayerCard";
import IconGrid from "../components/IconGrid";
import FooterSection from "../components/FooterSection";
import "./MainAppPage.css";

type Props = {
  user: PlayerData | null;
  onSwitchUser: () => void;
};

export default function MainAppPage({ user, onSwitchUser }: Props) {
  if (!user) {
    return null; // shouldn't happen if routing is correct
  }

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="main-title">PlotHarvester</h1>

        <button
          className="switch-btn"
          onClick={() => {
            onSwitchUser();
          }}
        >
          Switch Profile
        </button>
      </header>

      <div className="main-content">
        <PlayerCard data={user} />
        <IconGrid />
      </div>

      <FooterSection />
    </div>
  );
}