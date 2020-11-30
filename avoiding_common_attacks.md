# Avoiding common attacks

Careful consideration was given during the design of the contract and some of the security features are highlighted below:


# Re-entracy Attacks (SWC-107)
Contracts have implemented reentrancy defences to prevent reantrancy-type attacks. The underlying extended Crowdsale contract has implemented the re-entracy defence via ReentrancyGuard contract that keeps tracks of whether a contract ha been entered and prevents reentry when it is called again (Code is kept in a node_module file)


# Integer Overflow and Underflow (SWC-101)
All integer values have been carefully checked for no overflow and underflow security risks by ensuring the correct integer type has been used. In particular, the safemath library has been used extensively throughout the project.

# DoS with Failed Call (SWC-113)
This contract is not susceptible to this attack vector as there are no external function calls.





