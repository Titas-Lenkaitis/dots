cd
config=$1
killall -q waybar
while pgrep -x waybar >/dev/null; do sleep 1; done
nohup waybar -c ~/.config/waybar/$config & disown
echo "$config" > ~/.config/waybar/currentConfig