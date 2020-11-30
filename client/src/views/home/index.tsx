import React, { useEffect } from 'react';
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
import NumericInput from 'components/numeric-input';
import BuyToken from 'components/buy-token';



import s from './styles.module.css';
import TokenStats from 'components/token-stats';
import TokenSummary from 'components/token-summary';
import TransactionTable from 'components/transaction-table';



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


    // event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);


    useEffect(

        () => {


            if (!!web3c.infinitecrowdsale.Contract) {
                // https://docs.ethers.io/v4/api-contract.html#connecting-to-existing-contracts
                web3c.infinitecrowdsale.Contract.on("TokensPurchased", (purchaser: any, beneficiary: any, value: any, amount: any, event: any) => {
                    // Called when anyone changes the value
                    console.log("THIS IS AN EMITTED EVENT")
                    console.log(purchaser)
                    console.log(beneficiary)
                    console.log(value)
                    console.log(amount)
                    console.log(event)
                    console.log("THIS EVENT END")





                    // See Event Emitter below for all properties on Event
                    console.log(event.blockNumber);
                    // 4115004
                });
            }
        }
        , [web3c])




    return (
        <div className={s.view}>
            {!isMobile && (
                <Antd.Row className={s.walletRow}>


                    <Antd.Col flex="auto">
                        {web3.isActive && <TokenSummary />}
                    </Antd.Col>
                    <Antd.Col className={s.wallet}>
                        <ConnectedWallet />
                    </Antd.Col>
                </Antd.Row>
            )}





            <TokenStats></TokenStats>



            <BuyToken></BuyToken>
            {/* <TransactionTable label="Transactions" stableToken lpToken /> */}



        </div >
    );
};

export default HomeView;
