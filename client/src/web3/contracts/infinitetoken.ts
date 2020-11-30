import React from 'react';
import BigNumber from 'bignumber.js';

import { assertValues, batchContract, createContract, getHumanValue, sendContract } from 'web3/utils';




export type InfiniteTokenContract = {
    symbol?: string;
    decimals?: number;
    totalSupply?: BigNumber;
    balance?: BigNumber;
    allowance?: BigNumber;
    approveSend: (value: BigNumber) => Promise<any>;
    reload: () => void;
};

const Contract = createContract(
    require('web3/abi/InfiniteToken.json'),
    String(process.env.REACT_APP_CONTRACT_INFINITETOKEN_ADDR),
);





export function useInfiniteTokenContract(account?: string): InfiniteTokenContract {
    const [data, setData] = React.useState<InfiniteTokenContract>({} as any);
    const [version, setVersion] = React.useState<number>(0);

    React.useEffect(() => {
        (async () => {
            const [symbol, decimals, totalSupply] = await batchContract(Contract, [
                'symbol',
                'decimals',
                'totalSupply',
            ]);

            setData(prevState => ({
                ...prevState,
                symbol,
                decimals: Number(decimals),
                totalSupply: getHumanValue(new BigNumber(totalSupply), Number(decimals)),
            }));
        })();
    }, []);

    React.useEffect(() => {


        if (!assertValues(account, data.decimals)) {
            console.log("xx!!!REACHEDDDD here!");
            console.log(account);
            console.log(data.decimals);


            return;
        }

        (async () => {
            const [balance, allowance] = await batchContract(Contract, [
                { method: 'balanceOf', methodArgs: [account] },
                { method: 'allowance', methodArgs: [account, process.env.REACT_APP_CONTRACT_STAKING_ADDR] },
            ]);

            console.log("REACHEDDDD here!");

            setData(prevState => ({
                ...prevState,
                balance: getHumanValue(new BigNumber(balance), data.decimals),
                allowance: new BigNumber(allowance),
            }));
        })();
    }, [version, account, data.decimals]);

    const approveSend = React.useCallback((value: BigNumber): Promise<any> => {
        if (!assertValues(account)) {
            return Promise.reject();
        }

        return sendContract(Contract, 'approve', [
            process.env.REACT_APP_CONTRACT_STAKING_ADDR,
            value,
        ], {
            from: account,
        })
            .then(async () => {
                const [allowance] = await batchContract(Contract, [
                    { method: 'allowance', methodArgs: [account, process.env.REACT_APP_CONTRACT_STAKING_ADDR] },
                ]);

                setData(prevState => ({
                    ...prevState,
                    allowance: new BigNumber(allowance),
                }));
            });
    }, [account]);

    const reload = React.useCallback(() => {
        setVersion(prevState => prevState + 1);
    }, []);

    return React.useMemo(() => ({
        ...data,
        approveSend,
        reload,
    }), [data, approveSend, reload]);
}
