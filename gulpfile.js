var fs = require('fs');

var tasks = fs.readdirSync('./build');

tasks.forEach(function (taskName) {
    var modulePath = './build/' + taskName;

    if (fs.lstatSync(modulePath).isDirectory()) return;

    require(modulePath); // eslint-disable-line global-require
});