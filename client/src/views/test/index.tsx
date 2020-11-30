import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';
import BigNumber from 'bignumber.js';

import { InputProps } from 'antd/lib/input/Input';
import { formatBigValue, getHumanValue, getNonHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

import { Line } from 'react-chartjs-2';

import LineChart from 'components/token-chart';



import {
    TokenInfo,
    TokenKeys,
    TOKENS_MAP,
    useWeb3Contracts,
    TOKEN_INFT_KEY,

} from 'web3/contracts';

// import EthGasPriceProvider from 'context/useEthGas';
import { useWeb3 } from 'web3/provider';
// import { useWarnings } from 'components/warnings';
import ConnectedWallet from 'components/connected-wallet';
// import PoolRewards from 'components/pool-rewards';
// import PoolStats from 'components/pool-stats';
// import PoolStak from 'components/pool-stak';
// import PoolOverview from 'components/pool-overview';
import NumericInput from 'components/numeric-input-old';
import BuyToken from 'components/buy-token';



import s from './styles.module.css';



type StateType = TokenInfo & {
    walletBalance?: BigNumber;
    stakedBalance?: BigNumber;
    effectiveStakedBalance?: BigNumber;
    enabled?: boolean;
    amount?: BigNumber;
    gasAmount: string;
    expanded: boolean;
};

const InitialState: StateType = {
    address: '-',
    icon: null,
    name: '-',
    decimals: 0,
    enabled: false,
    amount: undefined,
    gasAmount: 'Standard',
    expanded: false,
};









const HomeView: React.FunctionComponent = () => {
    const web3 = useWeb3();
    const web3c = useWeb3Contracts();


    console.log("@#@#@#@#@#@#@");
    console.log(web3c);
    const [state, setState] = React.useState<StateType>(InitialState);


    React.useEffect(() => {
        const tokenInfo = TOKENS_MAP.get(TOKEN_INFT_KEY);

        if (tokenInfo) {
            setState(prevState => ({
                ...prevState,
                ...tokenInfo,
            }));
        }
    }, []);



    React.useEffect(() => {
        console.log("++++++");
        console.log(web3c.infinitetoken);

        switch (TOKEN_INFT_KEY) {
            case TOKEN_INFT_KEY:
                setState(prevState => ({
                    ...prevState,
                    walletBalance: web3c.infinitetoken.balance,
                    test: web3c.infinitetoken
                    // enabled: web3c.usdc.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
                }));
                break;

            default:
                break;
        }
    }, [web3c,]);

    const activeBalance = React.useMemo<BigNumber | undefined>(() => {

        return state.walletBalance;

    }, [state]);


    // function specialbutton() {



    //     return ()

    // }






    const maxAmount = React.useMemo<number>(() => {
        return getNonHumanValue(activeBalance ?? 0, state.decimals).toNumber();
    }, [activeBalance, state.decimals]);

    function handleInputMaxClick() {


        setState(prevState => ({
            ...prevState,
            amount: activeBalance,
        }));
    }

    function handleAmountChange(value: BigNumber | undefined) {
        setState(prevState => ({
            ...prevState,
            amount: value,
        }));
    }

    console.log("!@!@");
    console.log(state);
    console.log(activeBalance);

    // const warnings = useWarnings();

    // React.useEffect(() => {
    //     let warningDestructor: Function;

    //     if (isMobile) {
    //         warningDestructor = warnings.addWarn({
    //             text: 'Transactions can only be made from the desktop version using Metamask',
    //             closable: true,
    //             storageIdentity: 'bb_desktop_metamask_tx_warn',
    //         });
    //     } else {
    //         warningDestructor = warnings.addWarn({
    //             text: 'Do not send funds directly to the contract!',
    //             closable: true,
    //             storageIdentity: 'bb_send_funds_warn',
    //         });
    //     }

    //     return () => {
    //         warningDestructor?.();
    //     };
    // }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={s.view}>
            {!isMobile && (
                <Antd.Row className={s.walletRow}>


                    <Antd.Col flex="auto">
                        {/* {web3.isActive && <PoolRewards />} */}
                    </Antd.Col>
                    <Antd.Col className={s.wallet}>
                        <ConnectedWallet />
                    </Antd.Col>
                </Antd.Row>
            )}




            <BuyToken></BuyToken>



            <LineChart />

            Check this out!!

            {/*             
            <NumericInput
                addonBefore={
                    <span className={s.addonWrap}>
                        <span className={s.addonIcon}>{state.icon}</span>
                        <span className={s.addonLabel}>{state.name}</span>
                    </span>
                }
                addonAfter={
                    <Antd.Button
                        className={s.inputMaxBtn}
                        disabled={!activeBalance}
                        onClick={handleInputMaxClick}>MAX</Antd.Button>
                }
                placeholder={activeBalance ? `0 (Max ${activeBalance.toFormat()})` : '0'}
                maximumFractionDigits={18}
                value={state.amount}
                onChange={handleAmountChange}
            />

            <Antd.Button onClick={() => (web3c.infinitecrowdsale.buyToken())}>

                TEST CONTRACT 1

        </Antd.Button> */}

            {/* 
            <PoolStats className={s.stats} />

            <EthGasPriceProvider>
                <Switch>
                    <Route path="/pools" exact render={() => (
                        <PoolOverview />
                    )} />
                    {web3.isActive && (
                        <>
                            <Route path="/pools/stable-token" exact render={() => (
                                <PoolStak stableToken />
                            )} />
                            <Route path="/pools/lp-token" exact render={() => (
                                <PoolStak lpToken />
                            )} />
                        </>
                    )}
                </Switch>
            </EthGasPriceProvider> */}
        </div>
    );
};

export default HomeView;
