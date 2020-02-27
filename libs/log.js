let winston = require('winston');

function getLogger(module) {
    let path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

    return winston.createLogger({
        transports : [
            new winston.transports.Console({
                colorize:   true,
                level:      'debug',
                label:      path
            })
        ]
    });
}

function printServerError(log, res, err) {
    res.statusCode = 500
    log.error(`Internal error(%d): %s ${res.statusCode} ${err.message}`);
    return res.send({ error: "Server error"})
}

module.exports = getLogger;
module.exports.printServerError = printServerError
