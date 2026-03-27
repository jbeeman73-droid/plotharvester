import { useNavigate } from "react-router-dom";

import HuntingIcon from "../assets/hunting.svg";
import FishingIcon from "../assets/fishing.svg";
import GardeningIcon from "../assets/gardening.svg";
import ActivitiesIcon from "../assets/activities.svg";

import "./IconGrid.css";

export default function IconGrid() {
  const navigate = useNavigate();

  const ICON_ITEMS = [
    { id: "hunting", label: "Hunting", icon: HuntingIcon, route: "/hunting" },
    { id: "fishing", label: "Fishing", icon: FishingIcon, route: "/fishing" },
    { id: "gardening", label: "Gardening", icon: GardeningIcon, route: "/gardening" },
    { id: "activities", label: "Activities", icon: ActivitiesIcon, route: "/activities" },
    { id: "example1", label: "Example 1", icon: ActivitiesIcon, route: "/example1" },
    { id: "example2", label: "Example 2", icon: ActivitiesIcon, route: "/example2" },
  ];

  return (
    <div className="icon-grid">
      {ICON_ITEMS.map((item) => (
        <div
          key={item.id}
          className="icon-grid-item"
          onClick={() => navigate(item.route)}
        >
          <img src={item.icon} alt={item.label} className="icon-img" />
          <span className="icon-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}