import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"
import Battery from "gi://AstalBattery"
import PowerProfiles from "gi://AstalPowerProfiles"
import Brightness from "../../libraries/brightness"

export default function BatteryWidget() {
    const battery = Battery.get_default()
    const icon = createBinding(battery, "batteryIconName")
    const percentage = createBinding(battery, "percentage")
    const timeToEmpty = createBinding(battery, "timeToEmpty")
    const timeToFull = createBinding(battery, "timeToFull")
    const energyRate = createBinding(battery, "energyRate").as((self) => (Math.round(self*100)) / 100)
    const charging = createBinding(battery, "charging")

    const profiles = PowerProfiles.get_default()

    const brightness = new Brightness
    const currentBrightness = createBinding(brightness, "percentBrightness")

    return(
        <menubutton cssClasses={["barWidget", "battery", "barButton"]} visible={battery.deviceType == Battery.Type.BATTERY && battery.powerSupply}>
            <box>
                <image iconName={icon} pixelSize={20}/>
                <label label={percentage.as((self) => ": " + Math.round(self*100) + "%")}/>
            </box>
            <popover autohide={true}>
                <box orientation={Gtk.Orientation.VERTICAL} class={"container"}>
                    <box orientation={Gtk.Orientation.VERTICAL} class={"batteryInfo"}>
                        <label class={"heading"} label={"Battery Information"} halign={Gtk.Align.START}/>
                        <box orientation={Gtk.Orientation.VERTICAL} class={"batteryInfoList"}>
                            <label label={percentage.as((self) => "Battery Percentage: " + Math.round(self*100) + "%")} halign={Gtk.Align.START}/>
                            <label label={timeToEmpty.as((self) => "Time To Empty: " +formatTime(self))} halign={Gtk.Align.START} visible={charging.as((self) => !self)}/>
                            <label label={timeToFull.as((self) => "Time To Full: " + formatTime(self))} halign={Gtk.Align.START} visible={charging}/>
                            <label label={energyRate.as((self) => charging.as((value) => "Energy Rate: " + self + "W (" + (value ? "Charging" : "Discharging") + ")").get())} halign={Gtk.Align.START}/>
                        </box>
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} class={"powerProfiles"}>
                        <label label={"Power Profiles"} class={"heading"} halign={Gtk.Align.START}/>
                        {profiles.get_profiles().map((self) => {return (
                            <button onClicked={() => profiles.set_active_profile(self.profile)} hexpand halign={Gtk.Align.FILL}>
                                <box hexpand hexpand_set halign={Gtk.Align.FILL}>
                                    <image iconName={"power-profile-" + self.profile + "-symbolic"} pixelSize={20}/>
                                    <label label={self.profile.replace("-", " ")}/>
                                    <image hexpand halign={Gtk.Align.END} iconName={"adw-entry-apply-symbolic"} visible={createBinding(profiles, "activeProfile").as((value) => self.profile == value ? true : false)}/>
                                </box>
                            </button>)})}
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} class={"brightnessControls"}>
                        <label label={"Brightness"} class={"heading"} halign={Gtk.Align.START}/>
                        <box>
                            <image iconName={"display-brightness-symbolic"} pixelSize={20} />
                            <slider
                            hexpand
                            value={currentBrightness}
                            min={0}
                            max={100}
                            page={5}
                            step={5}
                            widthRequest={250}
                            onValueChanged={(self) => brightness.setBrightness(Math.round(brightness.maxBrightness * (self.value/100)))}/>
                            <label label={currentBrightness.as((self) => ": " + self + "%")}/>
                        </box>
                    </box>
                </box>
                
            </popover>
        </menubutton>
    )
}

function formatTime(seconds: number) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - (hours * 3600)) / 60)
    return hours + " Hours, " + minutes + " minutes"
    
}