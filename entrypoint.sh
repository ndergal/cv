#!/bin/sh

# Link NPM libs to allow separation of host and Docker devs.
ln -s /install/node_modules /app/src/node_modules

GULP_ARGS="$@"
PID=0

# From https://github.com/ncarlier/dockerfiles/blob/master/redsocks/redsocks.sh
# Thans Nico !

# SIGUSR1 handler
usr_handler() {
  echo "usr_handler"
}

# SIGTERM-handler
term_handler() {
    if [ $PID -ne 0 ]; then
        echo "Term signal catched. Shutdown Gulp"
        kill -SIGTERM "$PID"
        wait "$PID"
    fi
    exit 143; # 128 + 15 -- SIGTERM
}

# setup handlers
trap 'kill ${!}; usr_handler' SIGUSR1
trap 'kill ${!}; term_handler' SIGTERM

echo "Starting Gulp..."
gulp "" &
pid="$!"

# wait indefinetely
while true
do
    tail -f /dev/null & wait ${!}
done
