var server = require('server');

server.extend(module.superModule);
var fitGeniusHelper = require("*/cartridge/scripts/helpers/fitGeniusHelper");


/**
 * Account-Show : Extended Route Show from app_storefront_base to
 * send the active current customer email hashed value for the Login Page
 * @name Account-Show
 * @function
 * @memberof Product
 * @param {category} - sensitive
 */
server.append('Show', function (req, res, next) {

    if (req.currentCustomer.profile) {
        var customerEmail = req.currentCustomer.profile.email;
        var hashBytes = fitGeniusHelper.getHashedValue(customerEmail);

        res.setViewData({
            hashedUserEmail: hashBytes,
        });
    }


    next();
});
module.exports = server.exports();
