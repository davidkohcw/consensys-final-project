import React from 'react';
import BigNumber from 'bignumber.js';

import { useWeb3 } from 'web3/provider';
// import { useYieldFarmContract, YieldFarmContract } from 'web3/contracts/yieldFarm';
// import { useYieldFarmLPContract, YieldFarmLPContract } from 'web3/contracts/yieldFarmLP';
// import { StakingContract, useStakingContract } from 'web3/contracts/staking';
// import { DAIContract, useDAIContract } from 'web3/contracts/dai';
// import { USDCContract, useUSDCContract } from 'web3/contracts/usdc';
// import { SUSDContract, useSUSDContract } from 'web3/contracts/susd';
// import { BONDContract, useBONDContract } from 'web3/contracts/bond';
// import { UniswapV2Contract, useUniswapV2Contract } from 'web3/contracts/uniswapV2';
// import { EthOracleContract, useETHOracleContract } from 'web3/contracts/ethOracle';
// import { InfiniteTokenContract, useInfiniteTokenContract } from 'web3/contracts/infinitetoken';

import { useInfiniteCrowdsale, } from "web3/contracts_1/infinitecrowdsale"
import { InfiniteTokenContract, useInfiniteTokenContract } from 'web3/contracts_1/infinitetoken';



import { assertValues, getHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

// const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();
// const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();
// const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase();
// const CONTRACT_UNISWAP_V2_ADDR = String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase();

const CONTRACT_INFT_ADDR = String(process.env.REACT_APP_CONTRACT_INFT_ADDR).toLowerCase();

type OptionalBigNumber = BigNumber | undefined;

export type Web3ContractsType = {
    infinitetoken: InfiniteTokenContract;
    infinitecrowdsale: any;
    getTokenHumanValue(token: string, value?: BigNumber): OptionalBigNumber;
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({} as any);

export function useWeb3Contracts(): Web3ContractsType {
    return React.useContext(Web3ContractsContext);
}

export const UDS_ICON_SET = [USDCIcon, DAIIcon, SUSDIcon];
// export const TOKEN_SUSD_KEY = 'sUSD';
// export const TOKEN_UNISWAP_KEY = 'USDC_BOND_UNI_LP';
export const TOKEN_INFT_KEY = 'INFT';



export type TokenKeys = 'INFT';

export type TokenInfo = {
    address: string;
    icon: React.ReactNode;
    name: string;
    decimals: number;
};

export const TOKENS_MAP = new Map<TokenKeys, TokenInfo>([
    [TOKEN_INFT_KEY, {
        address: CONTRACT_INFT_ADDR,
        icon: <USDCIcon />,
        name: TOKEN_INFT_KEY,
        decimals: 6,
    }]
]);

const Web3ContractsProvider: React.FunctionComponent = props => {
    const { account } = useWeb3();

    // const yfContract = useYieldFarmContract(account);
    // const yflpContract = useYieldFarmLPContract(account);
    // const stakingContract = useStakingContract(account);
    // const daiContract = useDAIContract(account);
    // const usdcContract = useUSDCContract(account);
    // const susdContract = useSUSDContract(account);
    // const bondContract = useBONDContract(account);
    // const uniswapV2Contract = useUniswapV2Contract(account);
    // const ethOracleContract = useETHOracleContract();

    const infiniteTokenContract = useInfiniteTokenContract(account);
    const infiniteCrowdsale = useInfiniteCrowdsale(account);


    function getTokenHumanValue(token: string, value?: BigNumber): OptionalBigNumber {
        let decimals: number | undefined;
        let multiplier: OptionalBigNumber;

        switch (token.toLowerCase()) {
            case CONTRACT_INFT_ADDR:
                decimals = infiniteTokenContract.decimals;
                break;
            default:
                return undefined;
        }

        if (!assertValues(value, decimals)) {
            return undefined;
        }

        return getHumanValue(value, decimals)
            ?.multipliedBy(multiplier ?? 1);
    }


    const value = {
        infinitetoken: infiniteTokenContract,
        getTokenHumanValue,
        infinitecrowdsale: infiniteCrowdsale
    };

    return (
        <Web3ContractsContext.Provider value={value}>
            {props.children}
        </Web3ContractsContext.Provider>
    );
};

export default Web3ContractsProvider;
