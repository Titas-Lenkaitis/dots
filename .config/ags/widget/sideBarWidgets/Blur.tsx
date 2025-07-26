import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

export default function Blur(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible={false}
      namespace={"blur"}
      name={"Blur" + String(gdkmonitor.connector)}
      class="Blur"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={BOTTOM | TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox" orientation={Gtk.Orientation.VERTICAL}>

      </centerbox>
    </window>
  )
}
