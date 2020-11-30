pragma solidity ^0.5.0;

import {Assert} from "truffle/Assert.sol";
import {DeployedAddresses} from "truffle/DeployedAddresses.sol";
import {InfiniteToken} from "../contracts/InfiniteToken.sol";
import {InfiniteCrowdsale} from "../contracts/InfiniteCrowdsale.sol";

contract TestInfiniteCrowdsale {
    function testDecimals() public {
        InfiniteCrowdsale infinitecrowdsale = InfiniteCrowdsale(
            DeployedAddresses.InfiniteCrowdsale()
        );

        uint256 rateDecimals = 18;

        Assert.equal(
            infinitecrowdsale.rateDecimals(),
            rateDecimals,
            "rateDecimals should have a value of 18"
        );
    }

    function testMinContribution() public {
        InfiniteCrowdsale infinitecrowdsale = InfiniteCrowdsale(
            DeployedAddresses.InfiniteCrowdsale()
        );

        uint256 minContribution = 1000000000000000;

        Assert.equal(
            infinitecrowdsale.minContribution(),
            minContribution,
            "Min contribution should be 1000000000000000"
        );
    }

    // function testInitialWeiRaise() public {
    //     InfiniteCrowdsale infinitecrowdsale = new InfiniteCrowdsale(
    //         InfiniteToken
    //     );

    //     uint256 weiRaised = 0;

    //     Assert.equal(
    //         infinitecrowdsale.weiRaised(),
    //         weiRaised,
    //         "Wei Raised should be 0"
    //     );
    // }
}
