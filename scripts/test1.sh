slurpOutput=$(slurp -d)
echo "Slurp: $slurpOutput"

dimXYCoordReg="([0-9]+),([0-9]+) ([0-9]+)x([0-9]+)"

# Using sed to get the matched values
if [[ $slurpOutput =~ $dimXYCoordReg ]]; then
    xCoord="${BASH_REMATCH[1]}"
    yCoord="${BASH_REMATCH[2]}"
    xDim="${BASH_REMATCH[3]}"
    yDim="${BASH_REMATCH[4]}"
    echo "xCoord Value: $xCoord"
    echo "yCoord Value: $yCoord"
    echo "xDim Value: $xDim"
    echo "yDim Value: $yDim"
else
    echo "No match found."
fi

if (("$xCoord" > 3840 && "$xCoord" < 3850)); then
	diff=$((xCoord - 3841))
	xCoord=3841
	xDim=$((xDim + diff))
elif (("$xCoord" + "$xDim" > 3820 && "$xCoord" +"$xDim" < 3840)); then
	xDim=$((xDim+(3840-(xCoord+xDim))))
fi

echo "$xCoord $diff $xDim"

x="x"
comma=","
grimG="$xCoord$comma$yCoord $xDim$x$yDim"
echo "grimG is $grimG" 

grim -g "$grimG" - | swappy -f -

mv ~/swappy-*.png ~/media/screenshots/
