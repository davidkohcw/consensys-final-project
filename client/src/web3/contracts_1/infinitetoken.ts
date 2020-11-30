import React from 'react';

import { Contract as EtherContract } from "@ethersproject/contracts";
import BigNumber from 'bignumber.js';


import { useWeb3React, Web3ReactProvider } from '@web3-react/core';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';

import { useWeb3 } from 'web3/provider';




const { ethers } = require("ethers");





export type InfiniteTokenContract = {
    symbol?: string;
    decimals?: number;
    totalSupply?: BigNumber;
    balance?: BigNumber;
    allowance?: BigNumber;
    approveSend: (value: BigNumber) => Promise<any>;
    reload: () => void;
};




export function useInfiniteTokenContract(account?: string) {
    const [data, setData] = React.useState<InfiniteTokenContract>({} as any);
    const [version, setVersion] = React.useState<number>(0);

    const web3 = useWeb3React();



    const Contract = React.useMemo(() => {



        if (!web3.active) {

            return null;
        }



        return new EtherContract(
            String(process.env.REACT_APP_CONTRACT_INFINITETOKEN_ADDR),
            require('web3/abi/InfiniteToken.json'),
            web3.library.getSigner(web3.account));


    }, [web3.account, web3.library, web3.active]

    )



    React.useEffect(() => {
        (async () => {

            if (Contract === null) {

                return null;
            }


            const symbol = await Contract.symbol();
            const name = await Contract.name();
            const decimals = await Contract.decimals();
            const totalSupply = await Contract.totalSupply();
            const temp_balance = await Contract.balanceOf(web3.account)
            const balance = getHumanValue(new BigNumber(temp_balance.toString()), decimals)

            console.log("!!!!!!!!!!");
            console.log(web3.account)

            console.log(getHumanValue(new BigNumber(temp_balance.toString()), decimals))
            console.log(balance)

            // console.log(balance.toString());

            // console.log(decimals);
            // console.log(balance);

            // const a = new BigNumber(6)
            // console.log(a)
            // console.log(a.toFixed(2))




            console.log("(@@@@@@))")




            setData(prevState => ({
                ...prevState,
                symbol,
                name,
                balance,
                decimals: Number(decimals),
                totalSupply: getHumanValue(new BigNumber(totalSupply), Number(decimals)),
            }));
        })();
    }, [Contract, web3.account]);















    return React.useMemo(() => ({
        ...data,
        Contract: Contract
    }), [data, Contract]);



}
