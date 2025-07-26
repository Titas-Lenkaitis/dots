import app from "ags/gtk4/app"
import { Gdk, Astal, Gtk } from "ags/gtk4"
import { showSideBar } from "../Keybinds"
import { Accessor, Setter } from "ags"

type Props = {
    toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}
    gdkmonitor: Gdk.Monitor
}

export default function ToggleSideBar({ toggleStates, gdkmonitor }: Props) {
    
    return (
        <togglebutton cssClasses={["toggleSideBar"]} active={toggleStates.sideBarStates[gdkmonitor.connector].value} onClicked={() => showSideBar(toggleStates)}>
          <image iconName={"test-thingy-symbolic"} pixelSize={20}/>          
        </togglebutton>
        
    )
    
}