var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');
var Logger = require('dw/system/Logger');
var customLogs = Logger.getLogger('fitgenius-Logs', 'fitgenius-logs');
var customErrors = Logger.getLogger('fitgenius-errors', 'fitgenius-logs');

var getScore = LocalServiceRegistry.createService('int_fitgenius.score.http.rest', {
    createRequest: function (svc, params) {

        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/json');

        return params;
    },
    parseResponse: function (svc, httpClient) {
        var result;

        try {
            result = JSON.parse(httpClient.text);
            customLogs.debug(result.message);
        } catch (e) {
            result = httpClient.text;
            customErrors.error(e);
        }
        return result;
    },
    filterLogMessage: function filterLogMessage(msg) {
        return msg;
    },
    getRequestLogMessage: function (request) {
        return request;
    },
    getResponseLogMessage: function (response) {
        return response;
    }
    
});

module.exports = {
    getScore: getScore
};
