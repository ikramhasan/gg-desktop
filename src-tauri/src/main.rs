use core::str;

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Giveaway {
    id: i32,
    title: String,
    description: String,
    image: String,
    status: String,
    open_giveaway_url: String,
    platforms: Option<String>,
    end_date: Option<String>,
    instructions: String,
    worth: Option<String>,
}


#[tauri::command]
async fn fetch_giveaways() -> Vec<Giveaway> {
    let response = reqwest::get("https://gamerpower.com/api/giveaways")
        .await
        .expect("Failed to make request")
        .json::<Vec<Giveaway>>()
        .await
        .expect("Failed to parse response");

    response
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let more_apps = CustomMenuItem::new("more_apps".to_string(), "More Apps");
    let about_me = CustomMenuItem::new("about_me".to_string(), "About Me");
    let system_tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_item(more_apps)
        .add_item(about_me);
    
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "more_apps" => {
                        open::that("https://play.google.com/store/apps/dev?id=4730273045676878035")
                            .expect("Failed to open browser");
                    }
                    "about_me" => {
                        open::that("https://ikramhasan.com/").expect("Failed to open browser");
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![fetch_giveaways])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
