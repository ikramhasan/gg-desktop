import { invoke } from "@tauri-apps/api/tauri";

export const fetchGiveaways = async () => {
  const giveaways = await invoke<Giveaway[]>("fetch_giveaways", {
    name: "Next.js",
  });
  return giveaways;
};
