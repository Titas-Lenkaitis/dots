import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import SideBar from "./widget/Sidebar"
import Blur from "./widget/sideBarWidgets/Blur"
import runBind from "./widget/Keybinds"
import { Accessor, createState, Setter } from "ags"


function createStateObject() {
  const [thing, setThing] = createState(false)
  return {
    value: thing,
    setValue: setThing
  }
}

const toggleStates: { [index:string]: {[index:string] : {value: Accessor<boolean>, setValue: Setter<boolean>}}}= {
  sideBarStates: {},
  volumeStates: {}
}

for (const state in toggleStates) {
  app.get_monitors().map((monitor) => toggleStates[state][monitor.connector] = createStateObject())
}
app.start({
  icons: "/home/titas/.config/ags/assets/icons/",
  css: style,
  main() {
    app.get_monitors().map(Blur)
    app.get_monitors().map((self) => {Bar(self, toggleStates)})
    app.get_monitors().map(SideBar)
  },
  requestHandler(request, res) {
    runBind(request, toggleStates)
    return res(request)
  }
})
