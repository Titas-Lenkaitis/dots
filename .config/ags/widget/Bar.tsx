import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import Time from "./barWidgets/Time"
import ToggleSideBar from "./barWidgets/ToggleSideBar"
import Workspaces from "./barWidgets/Workspaces"
import WirePlumber from "./barWidgets/WirePlumber"
import { Accessor, Setter } from "ags"

export default function Bar(gdkmonitor: Gdk.Monitor, toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  return (
    <window
      visible
      namespace={"bar"}
      name={"Bar" + String(gdkmonitor.connector)}
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
      marginBottom={-24}
      keymode={Astal.Keymode.ON_DEMAND}
      >
      <centerbox cssName="centerbox">
        <box $type="start" class={"startWidgets"}>
          <ToggleSideBar toggleStates={toggleStates} gdkmonitor={gdkmonitor}/>
          <WirePlumber gdkmonitor={gdkmonitor} toggleStates={toggleStates}/>
        </box>
        
        <box $type="center" class={"centerWidgets"}>
          <Time />
        </box>
        
        <box $type="end" class={"endWidgets"}>
          <Workspaces gdkmonitor={gdkmonitor}/>
        </box>
      </centerbox>
      
    </window>
  )
}
