import React, { useEffect } from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
// import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatBigValue, getHumanValue, getNonHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';

// import { formatEther, parseEther } from "@ethersproject/units";

import { ReactComponent as EthereumSvg } from 'resources/svg/ethereum1.svg';




import NumericInput from 'components/numeric-input';
import s from './styles.module.css';

import {
    TokenInfo,
    TokenKeys,
    TOKENS_MAP,
    useWeb3Contracts,
    TOKEN_INFT_KEY,

} from 'web3/contracts';

import { useWeb3 } from 'web3/provider';



type StateType = {
    walletBalance?: BigNumber;
    enabled?: boolean;
    amount?: BigNumber;
};

const InitialState: StateType = {
    amount: undefined,
};


function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




const BuyToken: React.FunctionComponent = () => {
    const web3 = useWeb3();
    const web3c = useWeb3Contracts();

    const [state, setState] = React.useState<StateType>(InitialState);
    const [version, setVersion] = React.useState<number>(0);




    //     useEffect(
    //         setState(prevState => {...prevState, walletBalance: web3}




    // )



    // , [web3])
    useEffect(
        function () {

            if (!!web3.account) {
                web3.library?.getBalance(web3.account).then((balance) => {

                    console.log("!@");
                    console.log(balance.toString());


                    setState(prevState => {



                        return {
                            ...prevState,
                            walletBalance: new BigNumber(balance.toString())
                        };
                        // walletBalance: new BigNumber.from(balance.toString()).div(10 ** 18)


                    }


                    );


                }



                )
            }
        }
        , [web3, version])

    console.log("@@@@@#@#");
    console.log(web3);
    console.log(state.walletBalance);




    function handleAmountChange(value: BigNumber | undefined) {
        setState(prevState => ({
            ...prevState,
            amount: value,
        }));
    }


    function handleInputMaxClick() {

        setState(prevState => ({
            ...prevState,
            amount: new BigNumber(state.walletBalance!.div(new BigNumber(10 ** 18)).toString()),
        }));
    }


    const handleTokenBuyClick = () => {
        web3c.infinitecrowdsale.buyToken(state.amount).then((response?: any) => {

            setState((prevState) => {


                return { ...prevState, amount: undefined }
            })
            setVersion((prevVersion) => prevVersion + 1



            )

            const args = {
                message: 'Buy Transaction Submitted',
                description:
                    'Token purcahse initiated. See transaction on etherscan',
                duration: 0,
            };
            Antd.notification.open(args);

        }).then((response: any) => {
            const args = {
                message: 'Success',
                description:
                    'Success',
                duration: 0,
            };
            Antd.notification.open(args);

            return "successful";

        }
        ).then(

            (response: any) => {

                sleep(10000).then(() => { window.location.reload(); })


            }


        ).catch((error: any) => {
            const args = {
                message: 'Error',
                description:
                    error.message,
                duration: 0,
            };
            Antd.notification.open(args);


        })



    }


    return (
        <div>

            <div className={s.labelPools}>Buy Token Now</div>



            {/* { !!state.walletBalance ? formatEther(state.walletBalance) : "no"} */}




            <NumericInput
                addonBefore={
                    <span className={s.addonWrap}>
                        <span className={s.addonIcon}> {< EthereumSvg />} </span>
                        <span className={s.addonLabel}>Ethereum</span>
                    </span>
                }
                addonAfter={
                    <Antd.Button
                        className={s.inputMaxBtn}
                        // disabled={!activeBalance}
                        onClick={handleInputMaxClick}>MAX</Antd.Button>
                }
                placeholder={state.walletBalance ? `0 (Max Ξ${(state.walletBalance.div(new BigNumber(10 ** 18)).toFormat())})` : '0'}
                // maximumFractionDigits={state.decimals}
                value={state.amount}
                onChange={(handleAmountChange)}
            />


            <Antd.Row className={s.actionRow}>


                <Antd.Button onClick={handleTokenBuyClick}

                    className={s.actionBtn}

                >

                    Buy Token!
</Antd.Button>

            </Antd.Row>


        </div>

    );


}







export default BuyToken;
