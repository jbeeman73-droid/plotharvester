import type { PlayerData } from "../types/PlayerData";

export type SaveResult = {
  success: boolean;
  id?: number;
  error?: string;
};

export async function savePlayerData(playerData: PlayerData): Promise<SaveResult> {
  try {
    const API_URL = "http://192.168.1.154/avatars/api/savePlayerData.php";
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to save player data:", error);
    return { success: false, error: "Network or server error" };
  }
}
