'use strict';
var Bytes = require('dw/util/Bytes');
var MessageDigest = require('dw/crypto/MessageDigest');
/**
 * Convert a string in hased value
 * @param {string} value - string which needs to be converted in hash
 * @returns {string} converted hashed value
 */
function getHashedValue(value) {
    var bytes = new Bytes(value);
    var digest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
    var hashBytes = digest.digest(bytes);

    return hashBytes;
   
}

module.exports = {
    getHashedValue: getHashedValue
};

