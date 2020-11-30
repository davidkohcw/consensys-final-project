pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import {InfiniteToken} from "../contracts/InfiniteToken.sol";

contract TestInfiniteToken {
    function testTokenName() public {
        InfiniteToken infinitetoken = InfiniteToken(
            DeployedAddresses.InfiniteToken()
        );

        string memory expected = "Infinite Token";
        Assert.equal(
            infinitetoken.name(),
            expected,
            "Initial token name should be Infinite Token"
        );
    }

    function testTokenTicker() public {
        InfiniteToken infinitetoken = InfiniteToken(
            DeployedAddresses.InfiniteToken()
        );

        string memory expected = "INFT";
        Assert.equal(infinitetoken.symbol(), expected, "Ticker should be INFT");
    }

    function testDecimals() public {
        InfiniteToken infinitetoken = InfiniteToken(
            DeployedAddresses.InfiniteToken()
        );

        uint256 expected = 18;

        Assert.equal(
            infinitetoken.decimals(),
            expected,
            "Decimals should be 18"
        );
    }
}
