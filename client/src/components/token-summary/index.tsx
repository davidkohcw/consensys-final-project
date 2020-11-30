import React from 'react';
import * as Antd from 'antd';

import { useWeb3 } from 'web3/provider';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

// import InfoTooltip from 'components/info-tooltip';
// import PoolHarvestModal from 'components/pool-harvest-modal';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.css';

const TokenSummary: React.FunctionComponent = props => {
    const { isActive } = useWeb3();
    const { infinitetoken } = useWeb3Contracts();

    console.log("!@!")
    console.log(infinitetoken.balance)

    return (
        <div className={s.component}>
            <div className={s.label}>MY REWARDS</div>
            <div className={s.row}>
                <div className={s.col}>
                    <div className={s.blockLabel}>INFT balance</div>
                    <div className={s.blockValue} text-elipsis="true">
                        {formatBigValue(infinitetoken.balance)} <BondSvg className={s.bondIcon} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TokenSummary;
