




let crowdsale = await InfiniteCrowdsale.deployed()

crowdsale.send(web3.utils.toWei("1", "ether")).then(result => console.log(result))

crowdsale.buyTokens( "0xe1d9f574aCf543A3BC8Ab812A7759453b15313b0",{value:web3.utils.toWei("1", "ether")}).then(result => console.log(result))

 crowdsale.rate().then(result => result.toString())

crowdsale.weiRaised().then(result => web3.utils.fromWei(result, "ether").toString() )

let accounts = await web3.eth.getAccounts()




 graph init --abi "./abi/InfiniteCrowdsale.json"


 https://medium.com/blockrocket/dapp-development-with-a-local-subgraph-ganache-setup-566a4d4cbb



 ./run-graph-node.sh


 https://thegraph.com/docs/quick-start#local-development


 node -r esm index.js
