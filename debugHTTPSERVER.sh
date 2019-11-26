#!/bin/bash
# start a simple python web server locally to run your site before we publish to cloud with ./build.sh

export RANDOM_PORT=$RANDOM

ps aux |grep -i 'Python -m http.server' | grep -v "grep"
if test $? -gt 0
then
echo "starting http server..."

#--# python -m http.server &
#--# python -m http.server 5555 &
python -m http.server $RANDOM_PORT &
#--# ./server_notcached.py
open "http://localhost:${RANDOM_PORT}/index.html"

else

echo "

ERROR: Python -m http.server is already running, kill it first

"

fi


