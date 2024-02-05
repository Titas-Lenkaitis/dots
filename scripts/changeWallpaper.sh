cd ~/media/wallpapers/
oldWallpaperFile=~/.config/hypr/scripts/textFiles/oldWallpaper.txt
oldWallpaper=$(cat "$oldWallpaperFile")
newWallpaper=$1
theme="${newWallpaper%.*}"
waybarConf=$(cat ~/.config/waybar/currentConfig)

hyprctl hyprpaper preload "~/media/wallpapers/$newWallpaper"
hyprctl hyprpaper wallpaper "DP-1, ~/media/wallpapers/$newWallpaper"
hyprctl hyprpaper wallpaper "DP-3, ~/media/wallpapers/$newWallpaper"
#hyprctl hyprpaper wallpaper "eDP-2, ~/media/wallpapers/$newWallpaper"
hyprctl hyprpaper unload $oldWallpaper

wal -i $newWallpaper -n
gsettings set org.gnome.desktop.interface gtk-theme "oomox-${theme}"
killall -q waybar
while pgrep -x waybar >/dev/null; do sleep 1; done
nohup waybar -c ~/.config/waybar/$waybarConf & disown
cp ~/.cache/wal/makoConf ~/.config/mako/config
bash ~/.config/mako/reload.sh
bash ~/scripts/generate-theme.sh

echo "$newWallpaper" > "$oldWallpaperFile"
ls ~/media/wallpapers/