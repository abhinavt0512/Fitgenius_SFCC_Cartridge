var server = require('server');

server.extend(module.superModule);

var Bytes = require('dw/util/Bytes');
var MessageDigest = require('dw/crypto/MessageDigest');
var ProductMgr = require('dw/catalog/ProductMgr');
var fitGeniusScoreService = require("~/cartridge/scripts/services/fitGeniusScore.js");
var Site = require('dw/system/Site');
var Resource = require('dw/web/Resource');

/**
 * Product-Show : Extended Route Show from app_storefront_base to
 * send the active current customer email for the Product Details Page
 * @name Product-Show
 * @function
 * @memberof Product
 * @param {category} - sensitive
 */
server.prepend('Show', function (req, res, next) {

    if (req.currentCustomer.profile) {
        var customerEmail = req.currentCustomer.profile.email;
        var bytes = new Bytes(customerEmail);
        var digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
        var hashBytes = digest.digest(bytes);
        var customerLoggedIn = true;
        var integrationMode = Site.getCurrent().getCustomPreferenceValue("integrationMode");
        var fitGeniusScore;
        var siteDomain = Site.getCurrent().getCustomPreferenceValue("fitGeniusDomain");
        var profileEmail = Resource.msg('fitgenius.testHashedEmail', 'widgets', null);
        var productList;
        var profileData;

        if (integrationMode == 'test') {

            productList=["AE210W"];
            
            profileData =  {domain: siteDomain, profile_email: profileEmail,skus:productList};
            var serviceResponse = fitGeniusScoreService.getScore.call(JSON.stringify(profileData));
            if (serviceResponse.status == 'OK') {
                fitGeniusScore = serviceResponse.object.results[0].FitGenius_Score;
                
            }
        }
        else if (integrationMode == 'live') {
            productList=[req.querystring.pid];
            profileData =  {domain: siteDomain, profile_email: customerEmail,skus:productList};
            var serviceResponse = fitGeniusScoreService.getScore.call(JSON.stringify(profileData));
            if (serviceResponse.status == 'OK') {
                fitGeniusScore = serviceResponse.object.results[0].FitGenius_Score;
            }
            
        }
        res.setViewData({
            customerEmail: req.currentCustomer.profile.email,
            hashedUserEmail: hashBytes,
            customerLoggedIn: customerLoggedIn,
            showScoreFlag: true,
            displayOnDetailsPage: true,
            fitGeniusScore: fitGeniusScore
        });
    }



    next();
});
module.exports = server.exports();
