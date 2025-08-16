import Wp from "gi://AstalWp"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, Accessor, Setter } from "ags"

type Props = {
    toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}
    gdkmonitor: Gdk.Monitor
}

export default function WirePlumber({toggleStates, gdkmonitor}: Props) {
    const wp = Wp.get_default()

    if (!wp) {throw new Error("nulll!")}

    const defaultSpeaker = wp.get_default_speaker()
    const defaultMic = wp.get_default_microphone()

    if (!defaultSpeaker || !defaultMic) {
        throw new Error("null")

    }

    const volume = createBinding(defaultSpeaker, "volume").as((self) => Math.round(self*100))
    const micVolume = createBinding(defaultMic, "volume").as((self) => Math.round(self*100))

    const icon = createBinding(defaultSpeaker, "volumeIcon")
    const micIcon = createBinding(defaultMic, "volumeIcon")

    return(
        <menubutton canFocus={true} cssClasses={["barWidget", "wirePlumber", "barButton"]} direction={Gtk.ArrowType.NONE} active={toggleStates.volumeStates[gdkmonitor.connector].value}>
            <box>
                <image iconName={icon} pixelSize={16}/>
                <levelbar minValue={0} maxValue={100} value={volume} widthRequest={100} heightRequest={10} cssClasses={["audioVolume"]}/>
                <label label={volume.as((self) => ": " + self.toString() + "%")}/>
            </box>
            <popover autohide={true}>
                <box orientation={Gtk.Orientation.VERTICAL}>
                    <box class={"volumeSlider"}>
                        <button onClicked={() => defaultSpeaker.set_mute(!defaultSpeaker.get_mute())}>
                            <image iconName={icon} pixelSize={20} />
                        </button>
                        <slider
                        roundDigits={2}
                        value={volume}
                        min={0}
                        max={100}
                        page={5}
                        step={5}
                        widthRequest={250}
                        onValueChanged={(self) => defaultSpeaker.set_volume(self.value/100)}/>
                        <label label={volume.as((self) => ": " + self.toString() + "%")}/>
                    </box>
                    <box class={"micSlider"}>
                        <button onClicked={() => defaultMic.set_mute(!defaultMic.get_mute())}><image iconName={micIcon} pixelSize={20} /></button>
                        <slider
                        value={micVolume}
                        min={0}
                        max={100}
                        widthRequest={250}
                        step={5}
                        page={5}
                        onValueChanged={(self) => defaultMic.set_volume(self.value/100)}/>
                        <label label={micVolume.as((self) => ": " + self.toString() + "%")}/>
                    </box>
                </box>
            </popover>
        </menubutton>
        
    )   
}
