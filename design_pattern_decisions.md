# Design Pattern Decisions

This document highlights some design pattern decisions implemented throughout the contract



## Circuit breaker design
A circuit breaker design was implemented that allows the crowdsale contract to pause it's purchase token functionality. This would be desirable in situations where there is a live contract where a bug has been detected.


## Mortal
The contract has also implemented a mortal function which gives me the ability to destroy the contract and remove it from the blockchain.

Implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain using the selfdestruct keyword.


