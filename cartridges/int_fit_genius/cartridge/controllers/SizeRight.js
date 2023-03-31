'use strict';

var server = require('server');
var Site = require('dw/system/Site');

server.get('Show', function (req, res, next) {


    var sizeRightDomain = Site.getCurrent().getCustomPreferenceValue("fitGeniusDomain");
    var userSessionId = req.session.raw.custom.sizeRightSessionId ? req.session.raw.custom.sizeRightSessionId : req.session.raw.custom.sizeRightSessionId = Math.random().toString(36).substr(2);
    var gender = req.querystring.gender;

    res.render('widgets/sizeRight',
    {
        gender:gender,
        userSessionId:userSessionId,
        sizeRightDomain:sizeRightDomain
    });
    next();
});


module.exports = server.exports();
