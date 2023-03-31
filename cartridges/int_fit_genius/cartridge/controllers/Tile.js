var server = require('server');

server.extend(module.superModule);

var Bytes = require('dw/util/Bytes');
var MessageDigest = require('dw/crypto/MessageDigest');


/**
 * Tile-Show : Extended Route Show from app_storefront_base to
 * send the active current customer email for the Product Details Page
 * @name Tile-Show
 * @function
 * @memberof Search
 * @param {category} - sensitive
 */
server.append('Show', function (req, res, next) {


    var showScoreFlag = req.session.raw.custom.showScoreFlag;
    var customerLoggedIn = !!req.currentCustomer.profile;
    
    if (customerLoggedIn) {
        
        var customerEmail = req.currentCustomer.profile.email;
        var bytes = new Bytes(customerEmail);
        var digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
        var hashBytes = digest.digest(bytes);
        var productTileData=res.getViewData();
        var fitGeniusScoreList = JSON.parse(session.custom.TestDataInString);
        var fitGeniusScoreObject = fitGeniusScoreList.filter(CheckIds);

        var fitGeniusScore = fitGeniusScoreObject.length > 0 ? fitGeniusScoreObject[0].FitGenius_Score : 78;
        fitGeniusScore=fitGeniusScore.toFixed();

        res.setViewData({
            showScoreFlag: showScoreFlag,
            customerLoggedIn:customerLoggedIn,
            hashedUserEmail: hashBytes,
            fitGeniusScore:fitGeniusScore
            
        });
    }
    function CheckIds(person) {
        return person.sku == productTileData.product.id;
      }

    next();
});



module.exports = server.exports();
