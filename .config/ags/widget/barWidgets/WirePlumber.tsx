import Wp from "gi://AstalWp"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, Accessor, Setter, createState } from "ags"

type Props = {
    toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}
    gdkmonitor: Gdk.Monitor
}

export default function WirePlumber({toggleStates, gdkmonitor}: Props) {
    const wp = Wp.get_default()
    const defaultSpeaker = wp?.audio.get_default_speaker()
    const defaultMic = wp?.audio.get_default_microphone()

    if (!defaultSpeaker || !defaultMic) {
        throw new Error("null")

    }
    const volume = createBinding(defaultSpeaker, "volume").as((self) => Math.round(self*100))
    const micVolume = createBinding(defaultMic, "volume").as((self => Math.round(self*100)))

    const [icon, setIcon] = createState("audio-volume-medium-symbolic")
    const [micIcon, setMicIcon] = createState("microphone-sensitivity-high-symbolic")

    defaultSpeaker.connect("notify::volume", (self) => setIcon(self.get_volume_icon()))
    defaultSpeaker.connect("notify::mute", (self) => setIcon(self.get_volume_icon()))
    defaultMic.connect("notify::volume", (self) => setMicIcon(self.get_volume_icon()))
    defaultMic.connect("notify::mute", (self) => setMicIcon(self.get_volume_icon()))
    return(
        <menubutton canFocus={true} cssClasses={["barWidget", "wirePlumber"]} direction={Gtk.ArrowType.NONE} active={toggleStates.volumeStates[gdkmonitor.connector].value}>
            <box>
                <image iconName={icon} pixelSize={16}/>
                <levelbar minValue={0} maxValue={100} value={volume} widthRequest={100} heightRequest={10} cssClasses={["audioVolume"]}/>
                <label label={volume.as((self) => ": " + self.toString() + "%")}/>
            </box>
            <popover>
                <box orientation={Gtk.Orientation.VERTICAL}>
                    <box class={"volumeSlider"}>
                        <image iconName={icon} pixelSize={20} />
                        <slider
                        $={(self) => defaultSpeaker.connect("notify::volume", (thing) => {self.value = Math.round(defaultSpeaker.get_volume()*100)})}
                        min={0}
                        max={100}
                        widthRequest={250}
                        step={1}
                        page={5}
                        onValueChanged={(self) => defaultSpeaker.set_volume(self.value/100)}/>
                        <label label={volume.as((self) => ": " + self.toString() + "%")}/>
                    </box>
                    <box class={"micSlider"}>
                        <image iconName={micIcon} pixelSize={20} />
                        <slider
                        value={micVolume}
                        min={0}
                        max={100}
                        widthRequest={250}
                        step={1}
                        page={5}
                        onChangeValue={(self) => defaultMic.set_volume(self.value/100)}/>
                        <label label={micVolume.as((self) => ": " + self.toString() + "%")}/>
                    </box>
                </box>
            </popover>
        </menubutton>
        
    )   
}
