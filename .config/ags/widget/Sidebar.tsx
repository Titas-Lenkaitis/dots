import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

export default function SideBar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible={false}
      namespace={"sidebar"}
      name={"Sidebar" + String(gdkmonitor.connector)}
      class="SideBar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={BOTTOM | TOP | LEFT}
      application={app}
      defaultWidth={300}
    >
        <box orientation={Gtk.Orientation.VERTICAL} homogeneous>
            <label $type="start" label="test"/>
        </box>
    </window>
  )
}
