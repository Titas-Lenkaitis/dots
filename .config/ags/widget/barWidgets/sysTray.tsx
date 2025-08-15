import { createBinding, Accessor, For } from "ags"
import AstalTray from "gi://AstalTray"

export default function SysTray() {
    const tray = AstalTray.get_default()
    const items = createBinding(tray, "items")

    return(
        <box cssClasses={["barWidget", "sysTray"]} visible={createBinding(tray, "items").as((v) => v.length > 0 ? true : false)}>
            <For each={items}>
                {(item, index: Accessor<number>) => (
                    <menubutton menuModel={item.menuModel} class={"trayItem"} $={(self) => self.insert_action_group("dbusmenu", item.actionGroup)}>
                        <image gicon={item.gicon} pixelSize={20} />
                    </menubutton>
                )}
            </For>
        </box>
    )
}