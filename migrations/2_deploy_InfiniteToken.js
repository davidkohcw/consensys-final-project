var InfiniteToken = artifacts.require("InfiniteToken");

module.exports = function (deployer) {
    deployer.deploy(InfiniteToken, '5312000000000000000000');
};