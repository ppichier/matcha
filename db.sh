#!/bin/bash

if [ $# != 1 ]; then
    echo "start for starting the Db & stop for stopping the db"
elif [ $1 = 'start' ]; then
    cd /Users/warharra/mamp
    ./ctlscript.sh start && echo "Database up ..."
elif [ $1 = 'stop' ]; then
    cd /Users/warharra/mamp
    ./ctlscript.sh stop && echo "Database stop"
else
    echo "start for starting the Db & stop for stopping the db"
fi
