import { Accessor, Setter } from "ags"
import app from "ags/gtk4/app"
import Hyprland from "gi://AstalHyprland"

export function showSideBar(toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}) {
        const connector = Hyprland.get_default().get_focused_monitor().get_name()
        const sidebar = app.get_window("Sidebar" + connector)
        const blur = app.get_window("Blur" + connector)

        if (sidebar == null || blur == null) {
          throw new Error("Null Value!")
        } 

        app.toggle_window(blur.name)
        app.toggle_window(sidebar.name)
        toggleStates.sideBarStates[connector].setValue((v) => !v)
          }

export default function runBind(request: string, toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}) {
    switch (request) {
        case "toggleSideBar": showSideBar(toggleStates); break;
        case "openVolume": toggleStates.volumeStates[Hyprland.get_default().get_focused_monitor().get_name()].setValue((v) => !v); break;
    }
}