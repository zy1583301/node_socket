# node_socket

production.sh 内抛出node_modules .bin里的环境变量 避免全局安装  

start.sh 里引入 就可以直接使用这些环境变量   

可以使用 pm2.conf.json 或者 ecosystem.config.js进行配置


{
  "apps": [
    {
      "name": "mywork",
      "cwd": "/srv/node-app/current",
      "script": "bin/www",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "/var/log/node-app/node-app.stderr.log",
      "out_file": "log/node-app.stdout.log",
      "pid_file": "pids/node-geo-api.pid",
      "instances": 6,
      "min_uptime": "200s",
      "max_restarts": 10,
      "max_memory_restart": "1M",
      "cron_restart": "1 0 * * *",
      "watch": false,
      "merge_logs": true,
      "exec_interpreter": "node",
      "exec_mode": "fork",
      "autorestart": false,
      "vizion": false
    }
  ]
}
说明:

apps:json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用
name:应用程序名称
cwd:应用程序所在的目录
script:应用程序的脚本路径
log_date_format:
error_file:自定义应用程序的错误日志文件
out_file:自定义应用程序日志文件
pid_file:自定义应用程序的pid文件
instances:
min_uptime:最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
max_restarts:设置应用程序异常退出重启的次数，默认15次（从0开始计数）
cron_restart:定时启动，解决重启能解决的问题
watch:是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。
merge_logs:
exec_interpreter:应用程序的脚本类型，这里使用的shell，默认是nodejs
exec_mode:应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
autorestart:启用/禁用应用程序崩溃或退出时自动重启
vizion:启用/禁用vizion特性(版本控制)