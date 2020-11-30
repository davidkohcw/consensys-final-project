import React, { useEffect } from 'react';

import { Contract as EtherContract } from "@ethersproject/contracts";


import { useWeb3React, Web3ReactProvider } from '@web3-react/core';


import BigNumber from 'bignumber.js';

import { useWeb3 } from 'web3/provider';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';



const { ethers } = require("ethers");




export function useInfiniteCrowdsale(account?: string) {
    const [data, setData] = React.useState({} as any);
    const [version, setVersion] = React.useState<number>(0);

    const web3 = useWeb3React();





    console.log("^^^^");
    console.log(web3.active);

    console.log(web3);


    // const Contract = new EtherContract(
    //     String(process.env.REACT_APP_CONTRACT_INFINITECROWDSALE_ADDR),
    //     require('web3/abi/InfiniteCrowdsale.json'),
    //     web3.library.getSigner(web3.account)

    // );

    const Contract = React.useMemo(() => {



        if (!web3.active) {

            return null;
        }



        return new EtherContract(
            String(process.env.REACT_APP_CONTRACT_INFINITECROWDSALE_ADDR),
            require('web3/abi/InfiniteCrowdsale.json'),
            web3.library.getSigner(web3.account));


    }, [web3.account, web3.library, web3.active]

    )



    // function buyToken() {
    //     const amount = ethers.utils.parseEther('1')

    //     const overrides = {
    //         value: amount,
    //     }

    //     Contract.buyTokens(web3.account, overrides)


    // }


    const buyToken = React.useCallback((amountToBuy) => {


        if (!web3.active) {

            return null;
        }

        if (web3.active && Contract) {

            const amount = ethers.utils.parseEther(amountToBuy.toString())

            const overrides = {
                value: amount,
            }
            console.log("&&&");
            console.log(web3.account);
            return Contract.buyTokens(web3.account, overrides)

            // .then((response: any) => console.log(response)).catch((err: any) => alert(err));

        }


    }, [web3, Contract]

    )


    // const approveSend = React.useCallback((value: BigNumber): Promise<any> => {
    //     if (!assertValues(account)) {
    //         return Promise.reject();
    //     }

    //     return sendContract(Contract, 'approve', [
    //         process.env.REACT_APP_CONTRACT_STAKING_ADDR,
    //         value,
    //     ], {
    //         from: account,
    //     })
    //         .then(async () => {
    //             const [allowance] = await batchContract(Contract, [
    //                 { method: 'allowance', methodArgs: [account, process.env.REACT_APP_CONTRACT_STAKING_ADDR] },
    //             ]);

    //             setData(prevState => ({
    //                 ...prevState,
    //                 allowance: new BigNumber(allowance),
    //             }));
    //         });
    // }, [account]);



    // React.useEffect(() => {
    //     (async () => {
    //         const [symbol, decimals, totalSupply] = await batchContract(Contract, [
    //             'symbol',
    //             'decimals',
    //             'totalSupply',
    //         ]);

    //         setData(prevState => ({
    //             ...prevState,
    //             symbol,
    //             decimals: Number(decimals),
    //             totalSupply: getHumanValue(new BigNumber(totalSupply), Number(decimals)),
    //         }));
    //     })();
    // }, []);



    useEffect(() => {


        console.log("REACHEDDDDD HERE");

        (async () => {



            if (Contract === null) {
                console.log("REACHEDDDDD HERE");


                return null;
            }

            const amountRaisedTemp = await Contract.weiRaised()

            const amountRaised = getHumanValue(new BigNumber(amountRaisedTemp.toString()), 18);



            console.log("!@!!@");
            console.log(amountRaised)

            setData((prevState: any) => ({
                ...prevState,
                amountRaised



            }));




        })();


    }



        , [Contract]);


    return React.useMemo(() => ({
        ...data,
        buyToken: buyToken,
        Contract: Contract
    }), [data, buyToken, Contract]);



}



// export function useInfiniteCrowdsale(account?: string) {
