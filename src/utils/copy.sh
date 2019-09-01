#!/bin/sh
# 用于crontab定时执行日志分割操作
cd ~/playground/nodeJsBolog/logs/
cp access.log $(date +%Y-%m-%d).access.log
> access.log