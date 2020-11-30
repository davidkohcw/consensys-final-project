// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.0;

import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/// @title A crowdsale contract for INFINITE token that allows the purchase and minting of new tokens
/// @author David Koh
contract InfiniteCrowdsale is MintedCrowdsale {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public constant minContribution = 1000000000000000;
    uint256 public constant rateDecimals = 18;
    uint256 private constant rateDecimalsMultiply = 10**rateDecimals;

    bool private stopped = false;
    address private _owner;

    /// @dev an authorization modifier
    modifier isAdmin() {
        if (msg.sender != _owner) {
            revert();
        }
        _;
    }

    constructor(IERC20 token)
        public
        Crowdsale(1000000000000000000000000, msg.sender, token)
    {
        _owner = msg.sender;
    }

    /// @return the token amount outstanding
    function getTokenAmount(uint256 weiAmount) external view returns (uint256) {
        return _getTokenAmount(weiAmount);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount)
        internal
        view
    {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(
            weiAmount >= minContribution,
            "Contribution must be at least 0.001 ETH"
        );
    }

    /// @return the token amount outstanding
    function _getTokenAmount(uint256 weiAmount)
        internal
        view
        returns (uint256)
    {
        uint256 aInverse = rate().mul(2);
        uint256 b = getLinearCoefficient(aInverse);
        uint256 tokenAmount = getRoot(aInverse, b, weiAmount);

        return tokenAmount;
    }

    /// @return alinearcoefficient
    function getLinearCoefficient(uint256 aInverse)
        private
        view
        returns (uint256)
    {
        // Adjust for decimal places
        uint256 start = token().totalSupply().mul(rateDecimalsMultiply);
        uint256 oneDecimals = rateDecimalsMultiply;

        uint256 b = start.mul(2).add(oneDecimals).div(aInverse);

        return b;
    }

    function getRoot(
        uint256 aInverse,
        uint256 b,
        uint256 cNegative
    ) private pure returns (uint256) {
        uint256 discriminant = getDiscriminant(aInverse, b, cNegative);

        // Adjust for decimal places
        uint256 discriminantDecimals = discriminant.mul(rateDecimalsMultiply);

        uint256 root = sqrt(discriminantDecimals).sub(b).div(2).mul(aInverse);

        // Adjust for decimal places
        root = root.div(rateDecimalsMultiply);

        return root;
    }

    function getDiscriminant(
        uint256 aInverse,
        uint256 b,
        uint256 cNegative
    ) private pure returns (uint256) {
        // Adjust for decimal places
        uint256 bSquaredDecimals = b.mul(b).div(rateDecimalsMultiply);
        uint256 cNegativeDecimals = cNegative.mul(rateDecimalsMultiply);

        return bSquaredDecimals.add(cNegativeDecimals.mul(4).div(aInverse));
    }

    function sqrt(uint256 x) private pure returns (uint256) {
        uint256 z = x.add(1).div(2);
        uint256 y = x;

        while (z < y) {
            y = z;
            z = x.div(z).add(z).div(2);
        }

        return y;
    }

    function toggleContractActive() public isAdmin {
        // You can add an additional modifier that restricts stopping a contract to be based on another action, such as a vote of users
        stopped = !stopped;
    }

    /// @notice A safety feature to safely stop the contract in an emergency
    modifier stopInEmergency {
        if (!stopped) _;
    }

    // function buyTokens(address beneficiary)
    //     public
    //     override
    //     payable
    //     stopInEmergency
    // {
    //     super.buyTokens(beneficiary);
    // }

    /// @notice A safety feature to safely kill the contract
    function kill() public {
        if (msg.sender == _owner) selfdestruct(address(uint160(_owner))); // cast owner to address payable
    }
}
