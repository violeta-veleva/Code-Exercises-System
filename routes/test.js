var exec = require('child_process').exec;
var cmd = 'mongod --help';

exec(cmd, function(error, stdout, stderr) {
  console.log(error);
});