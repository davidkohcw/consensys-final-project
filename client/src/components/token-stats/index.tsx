import React from 'react';
import cx from 'classnames';

// import { formatBigValue } from 'web3/utils';
// import { useWeb3Contracts } from 'web3/contracts';

import StatWidget from 'components/stat-widget';
// import ExternalLink from 'components/externalLink';

import s from './styles.module.css';





import {
    TokenInfo,
    TokenKeys,
    TOKENS_MAP,
    useWeb3Contracts,
    TOKEN_INFT_KEY,

} from 'web3/contracts';

// import EthGasPriceProvider from 'context/useEthGas';
import { useWeb3 } from 'web3/provider';





export type TokenStatsProps = {
    className?: string;
};

const TokenStats: React.FunctionComponent<TokenStatsProps> = props => {
    const { infinitetoken, getTokenHumanValue, infinitecrowdsale } = useWeb3Contracts();

    // const totalValueLocked = formatBigValue(aggregated.totalStaked, 2);
    // const totalEffectiveStaked = formatBigValue(aggregated.totalEffectiveStaked, 2);
    // const bondRewards = formatBigValue(aggregated.bondReward);
    // const totalBondRewards = formatBigValue(aggregated.totalBondReward, 0);
    // const bondPrice = formatBigValue(aggregated.bondPrice, 2);



    //     <div className={cx(s.component, props.className)}>
    //     <StatWidget
    //         label="Number of Buyers"
    //         value={`$ 500`}
    //         hint={`$ effective locked`}
    //         help={
    //             <span>
    //                 This number shows the Total Value Locked across the staking pool(s), and the effective Total Value Locked.
    //     <br /><br />
    //     When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in most cases.
    //   </span>
    //         }
    //     />

    // <StatWidget
    // label="Amount Raised"
    // value={`$ 500`}
    // hint={`$ effective locked`}
    // help={
    //     <span>
    //         This number shows the Total Value Locked across the staking pool(s), and the effective Total Value Locked.
    // <br /><br />
    // When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in most cases.
    // </span>
    // }
    // />

    // <StatWidget
    // label="Current Price"
    // value={`$ 500`}
    // hint={`$ effective locked`}
    // help={
    //     <span>
    //         This number shows the Total Value Locked across the staking pool(s), and the effective Total Value Locked.
    // <br /><br />
    // When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in most cases.
    // </span>
    // }
    // />

    // </div>

    return (



        <StatWidget
            label="Amount Raised"
            value={infinitecrowdsale.amountRaised?.toString()}
            hint={`Ether locked`}
            help={
                <span>
                    This number shows the Total Value Locked across the staking pool(s), and the effective Total Value Locked.
            <br /><br />
            When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in most cases.
          </span>
            }
        />




    );
};

export default TokenStats;
