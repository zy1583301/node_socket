#!/bin/sh

source ./production.sh

echo "========== which pm2: `which pm2` ==========="
echo "========== which node: `which node` ==========="
echo "========== pm2 version: `pm2 -v` ============"
#pm2 ./ecosystem.config.js



case "$1" in
  start )
    # ./start.sh start --env production | development | test
    if [[ ! -n "$3" ]]; then
      ENV=test
    else
      ENV=$3
    fi
    echo $ENV
    pm2 start pm2.conf.json --env $ENV
    ;;
  stop )
    pm2 stop Journal
    ;;
  reload )
    pm2 reload Journal
    ;;
  -h)
    echo "start : ./start.sh start --env production | development | test\nstop\nreload"
    ;;
  *)
    $0 -h
    ;;
esac
