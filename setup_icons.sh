srcdir="$PWD/AppIcon"
icondir=/usr/share/icons/hicolor/scalable/apps

sudo cp $srcdir/warp-icon.png $icondir
sudo cp $srcdir/warp-bench-icon.png $icondir
sudo cp $srcdir/warp-console-icon.png $icondir
sudo chmod ugo+r $icondir/warp-*icon.png

if [ -d "$PWD/deb64" ]; then
	appdir="$PWD/deb64"
else
	appdir="$PWD/deb32"
fi

gio set $appdir/WARP metadata::custom-icon "file://$icondir/warp-icon.png"
gio set $appdir/WARP_bench metadata::custom-icon "file://$icondir/warp-bench-icon.png"
gio set $appdir/WARP_console metadata::custom-icon "file://$icondir/warp-console-icon.png"

deskdir="/usr/share/applications"

cat <<EOM | sudo tee $deskdir/WARP.desktop > /dev/null
[Desktop Entry]
Type=Application
Version=1.2.1
Name=Win App Revamp Package
Exec=$appdir/WARP
Icon=$icondir/warp-icon.png
Terminal=false
EOM

cat <<EOM | sudo tee $deskdir/WARP_bench.desktop > /dev/null
[Desktop Entry]
Type=Application
Version=1.2.1
Name=WARP Bench
Exec=$appdir/WARP_bench
Icon=$icondir/warp-bench-icon.png
Terminal=false
EOM

cat <<EOM | sudo tee $deskdir/WARP_console.desktop > /dev/null
[Desktop Entry]
Type=Application
Version=1.2.1
Name=WARP Console
Exec=$appdir/WARP_console
Icon=$icondir/warp-console-icon.png
Terminal=true
EOM
