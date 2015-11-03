'use strict';

var app = require('./app');
var globalConfig = require('./config/globalConfig');
// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
app.listen(globalConfig.port, function () {
  console.log('Node app is running, port:', globalConfig.port);
});