pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/// @title Infinite Token
/// @author David Koh
contract InfiniteToken is ERC20Detailed, ERC20Mintable {
    using SafeMath for uint256;

    constructor(uint256 initialMint)
        public
        ERC20Detailed("Infinite Token", "INFT", 18)
    {
        if (initialMint > 0) {
            _mint(msg.sender, initialMint);
        }
    }
}
