#!/usr/bin/python3
# Reads Live logs in log.txt, supply with live version as argument
# chmod +x read_live_logs.py
# sudo cp read_live_logs.py /usr/local/bin
# Create an alias for quicker useage
# cd ~/.
# vim .zshrc 
# Press i
# alias rll="read_live_logs.py" 
# Press Esc
# type :wq
# Press Enter
# Now you can read the log.txt file of any live version from terminal by typing rll x.x.x
# Make sure to replace x.x.x with the live version

from pathlib import Path
home = Path.home()
from sys import argv
path = f'{home}/Library/Preferences/Ableton/Live {argv[1]}/log.txt'
with open(path, 'r') as f:
    while True:
        line = f.readline()
        if line:
            print(line)