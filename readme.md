# Project Overview



# A live deployment onto the ropsten network can be found here:





# Deployment Steps
0. Install any dependencies needed by running "yarn install" from both the top-level directory as well as the "./client" directory
1. You will need to create a secrets.json file (you can refer to secrents-example.json as to what the format needed is)
2. Run truffle migrate at the top level of the project directory (with a running ganache node)
3. Retrive the contract addresses/network ID and create a ".env" file in the "./client" folder. You can refer to the example config file ".env-example". The deployed contract addressess can be found in the "./client/src/contracts" folder where truffle stores it's auto generated migrated files to
4. Run the front end by running "yarn start" from the "./client" folder





# Project Directory Structure

The 3 key folders to take not of are:

1. ./contracts
Here are where the actual solidity contract codes are written. The outpout of the compiliation step is into the ./client/src/contracts folder

2. ./migrations
Ths folder keeps track of migrations to the blockchain

3. ./client
This folder is where all the front-end code is kept


# Related Documents:
1. design_pattern_decisions.md

This file explains the design patterns used and implemented throughout the project

2. avoiding_common_attacks.md

This file explains the steps taken to ensure the contracts are not susceptible to common attacks

3. deployed_addresses.txt
This file describes the testnet and addresses of the contracts





# Tests
Some simple tests have been included to ensure that the contracts are being written to specifications.