import Hyprland from "gi://AstalHyprland"
import { Accessor, createBinding } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
type Props = {
    gdkmonitor: Gdk.Monitor
}

export default function Workspaces({ gdkmonitor }: Props) {
    const hyprland = Hyprland.get_default()
    const workspaceConf: Record<string, number[]> = {
        "DP-3": [1,2,3,4,5],
        "DP-1": [6,7,8,9,10]
    }
    const connector = gdkmonitor.get_connector()
    if (connector == null) {
        throw new Error("Null!")
    }
    const workspaces: number[] = workspaceConf[`${connector}`]
    function onClicked(workspaceID: number) {
        hyprland.dispatch("workspace", workspaceID.toString())
    }

    type workProps = {
        workspace: number
        self: Gtk.Button
    }

    function updateFocused({ workspace, self }: workProps) {
        hyprland.connect("event", (hyprland) => {
            if(hyprland.get_focused_workspace().id == workspace) {
                self.add_css_class("activeWorkspace")
            } else {
                self.remove_css_class("activeWorkspace")
            }})
    }

    return (
        <box cssClasses={["workspaces", "barWidget"]}>
            {workspaces.map((workspace) => (
                <button 
                iconName={"circle-symbolic"} 
                onClicked={() => onClicked(workspace)} 
                class={"workspace"}
                $={(self) => updateFocused({workspace, self})}>
                </button>
            ))}
            
        </box>
    )
}