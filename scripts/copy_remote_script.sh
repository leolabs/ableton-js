#!/bin/sh

# Run the following commands to add to your terminal
# sudo cp copy_remote_script.sh /usr/local/bin
# cd /usr/local/bin
# chmod +x copy_remote_script.sh
# now from your remote script directory you can run 'sh copy_remote_script.sh . <SCRIPTNAME>' And it will do everything for you.
# If you want to shorten it you can add an alias
# cd ~/.
# vim .zshrc
# alias cprs="sh copy_remote_script.sh"
# Now you can do cprs . <SCRIPTNAME>

SRC=$1
REMOTE_SCRIPT_DIR="$HOME/Music/Ableton/User Library/Remote Scripts"
DEST="$REMOTE_SCRIPT_DIR/$2"

# Checks for arguments
if [ ! "$1" ] || [ ! "$2" ];
    then
    echo "Please supply a source and destination directory as command line arguments"
    exit
fi

# Creates the Remote Script dir 
if [ ! -d "$REMOTE_SCRIPT_DIR" ]; then
    echo "Remote Scripts directory not found... Creating"
    mkdir "$REMOTE_SCRIPT_DIR"
fi

# Creates tbe script dir
if [ ! -d "$DEST"  ]; 
then
    echo "Script Does not exist. Creating empty directory."
    echo "Creating $2 in $REMOTE_SCRIPT_DIR"
    mkdir "$DEST"
    echo "Copying files"


fi

# Copies the files across
sudo rsync -av --exclude=".git" "$SRC/." "$DEST"
echo "Done"
exit