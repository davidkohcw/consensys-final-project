var InfiniteToken = artifacts.require("InfiniteToken");
var InfiniteCrowdsale = artifacts.require("InfiniteCrowdsale");

module.exports = function (deployer) {
    deployer.deploy(InfiniteCrowdsale, InfiniteToken.address)
        .then(async crowdsale => {
            const token = await InfiniteToken.deployed();
            token.addMinter(crowdsale.address);
        });
};