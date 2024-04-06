#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// #[tauri::command]
// async fn get_giveaways() -> Result<Vec<giveaway::Giveaway>> {
//    let api_manager = GiveawayManager::new();
//    let giveaways = api_manager.get_giveaways().await;

//    giveaways
// }

fn main() {
tauri::Builder::default()
   // .invoke_handler(tauri::generate_handler![get_giveaways])
   .run(tauri::generate_context!())
   .expect("error while running tauri application");
}