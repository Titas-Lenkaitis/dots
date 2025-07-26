import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

export default function Time() {
    const time = createPoll("", 1000, "date +%T")
    return (
        <menubutton halign={Gtk.Align.CENTER} cssClasses={["barWidget", "time"]}>
          <label label={time} />
          <popover>
              <Gtk.Calendar/>
          </popover>
        </menubutton>
    )
}