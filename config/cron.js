var schedule = require('node-schedule');

/**
 * Every minutes
 */
var j = schedule.scheduleJob('1 * * * *', function () {
    //Executes every minutes
    console.log("everyminutes")
});
