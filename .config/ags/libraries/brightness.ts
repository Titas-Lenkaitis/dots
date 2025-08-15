import GObject, { register, property, signal } from "ags/gobject"
import { monitorFile, readFile, writeFile  } from "ags/file"

@register({ GTypeName: "Brightness"})
export default class Brightness extends GObject.Object {
    @property(Number) brightness;
    @property(Number) maxBrightness;
    @property(Number) percentBrightness;
    constructor() {
        super()
        const path = "/sys/class/backlight/amdgpu_bl2/"

        this.brightness = Number(readFile(path + "brightness"))
        monitorFile(path + "brightness", (file) => {
            this.brightness = Number(readFile(file))
            this.percentBrightness = Math.round((this.brightness / this.maxBrightness) * 100)
        })
        
        this.maxBrightness = Number(readFile(path + "max_brightness"))
        monitorFile(path + "max_brightness", (file) => this.maxBrightness = Number(readFile(file)))

        this.percentBrightness = Math.round((this.brightness / this.maxBrightness) * 100)

        // this.setBrightness = (brightness: number) => {writeFile(path + "brightness", brightness.toString())}
        this.setBrightness = (brightness: number) => {
            writeFile(path + "brightness", brightness.toString())
        }
    }
    @property(Function) setBrightness 
}

