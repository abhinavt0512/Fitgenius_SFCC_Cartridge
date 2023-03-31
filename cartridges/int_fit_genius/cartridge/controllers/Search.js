var server = require('server');

server.extend(module.superModule);

var Site = require('dw/system/Site');
var fitGeniusScore = require("~/cartridge/scripts/services/fitGeniusScore.js");
var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
var Resource = require('dw/web/Resource');    

/**
 * Search-Show : Extended Route Show from app_storefront_base to
 * send the active current customer email for the Product Details Page
 * @name Search-Show
 * @function
 * @memberof Search
 * @param {category} - sensitive
 */
server.append('Show', function (req, res, next) {

    var categoryList = Site.getCurrent().getCustomPreferenceValue("fitGeniusScoreCategories");
    var search = res.getViewData().queryString; 
    var queryParameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

    var categoryId = queryParameters.cgid ? queryParameters.cgid : null; 
    var showScoreFlag = false;  
    var pdis=["AE210W","AE660W"];
    var tempids=res.viewData.productSearch.productIds;
    for (let index = 0; index < tempids.length; index++) {
        pdis.push(tempids[index].productID);
        
    }
    var testData =  {domain:"aetrex.com",profile_email:Resource.msg('fitgenius.testHashedEmail', 'widgets', null),skus:pdis}
    var serviceResponse = fitGeniusScore.getScore.call(JSON.stringify(testData));
    var testDataINString=JSON.stringify(serviceResponse.object.results);
    
    session.custom.TestDataInString=testDataINString;
    if (categoryId) {
        categoryList.forEach(function(category) {
            if (category == categoryId) {
                showScoreFlag = true;
            }
            
        });
        
    }
    req.session.raw.custom.showScoreFlag = showScoreFlag;
    next();
});
module.exports = server.exports();
