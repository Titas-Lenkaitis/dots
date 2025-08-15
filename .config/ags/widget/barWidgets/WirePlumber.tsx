import Wp from "gi://AstalWp"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, Accessor, Setter } from "ags"

type Props = {
    toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}
    gdkmonitor: Gdk.Monitor
}

export default function WirePlumber({toggleStates, gdkmonitor}: Props) {
    const wp = Wp.get_default()

    const defaultSpeaker = createBinding(wp, "defaultSpeaker")
    const defaultMic = createBinding(wp, "defaultMicrophone")

    if (!defaultSpeaker || !defaultMic) {
        throw new Error("null")

    }

    const volume = defaultSpeaker.as((self) => createBinding(self, "volume").as((v) => Math.round(v*100)))
    const micVolume = defaultMic.as((self) => createBinding(self, "volume").as((v) => Math.round(v*100)))

    const icon = defaultSpeaker.as((self) => createBinding(self, "volumeIcon"))
    const micIcon = defaultMic.as((self) => createBinding(self, "volumeIcon"))

    return(
        <menubutton canFocus={true} cssClasses={["barWidget", "wirePlumber", "barButton"]} direction={Gtk.ArrowType.NONE} active={toggleStates.volumeStates[gdkmonitor.connector].value}>
            <box>
                <image iconName={icon.get()} pixelSize={16}/>
                <levelbar minValue={0} maxValue={100} value={volume.get()} widthRequest={100} heightRequest={10} cssClasses={["audioVolume"]}/>
                <label label={volume.get().as((self) => ": " + self.toString() + "%")}/>
            </box>
            <popover autohide={true}>
                <box orientation={Gtk.Orientation.VERTICAL}>
                    <box class={"volumeSlider"}>
                        <button onClicked={() => defaultSpeaker.get().set_mute(!defaultSpeaker.get().get_mute())}>
                            <image iconName={icon.get()} pixelSize={20} />
                        </button>
                        <slider
                        roundDigits={2}
                        value={volume.get()}
                        min={0}
                        max={100}
                        page={5}
                        step={5}
                        widthRequest={250}
                        onValueChanged={(self) => defaultSpeaker.get().set_volume(self.value/100)}/>
                        <label label={volume.get().as((self) => ": " + self.toString() + "%")}/>
                    </box>
                    <box class={"micSlider"}>
                        <button onClicked={() => defaultMic.get().set_mute(!defaultMic.get().get_mute())}><image iconName={micIcon.get()} pixelSize={20} /></button>
                        <slider
                        value={micVolume.get()}
                        min={0}
                        max={100}
                        widthRequest={250}
                        step={5}
                        page={5}
                        onValueChanged={(self) => defaultMic.get().set_volume(self.value/100)}/>
                        <label label={micVolume.get().as((self) => ": " + self.toString() + "%")}/>
                    </box>
                </box>
            </popover>
        </menubutton>
        
    )   
}
