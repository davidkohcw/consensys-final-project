import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

// import BondsView from 'views/bonds';
// import PoolsView from 'views/pools';
// import VotingView from 'views/voting';

import HomeView from 'views/home';


// import Warnings from 'components/warnings';
import SiderNav from 'components/sider-nav';
import { SiderNavLinkProps } from 'components/sider-nav-link';
// import MobileMenu from 'components/mobile-menu';
import ExternalLink from 'components/externalLink';

import { ReactComponent as BondsSvg } from 'resources/svg/icons/bonds.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/icons/pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/voting.svg';

import s from './styles.module.css';

const SiderNavLinks: SiderNavLinkProps[] = [
    {
        icon: <PoolsSvg />,
        label: 'Home',
        path: '/',
    },
];

const LayoutView: React.FunctionComponent = () => {
    return (
        <Antd.Layout className={s.container}>
            <SiderNav className={s.siderNav} links={SiderNavLinks} />
            <Antd.Layout className={s.main}>
                {/* {isMobile && <MobileMenu />} */}
                {/* <Warnings> */}
                <Antd.Layout.Content className={s.content}>
                    <Switch>
                        <Route path="/" component={HomeView} />
                        {/* <Route path="/voting" component={VotingView} />
                            <Route path="/bonds" component={BondsView} /> */}
                        {/* <Redirect from="/" to="/" /> */}
                    </Switch>
                    <Antd.Layout.Footer className={s.footer}>
                        <div className={s.footerLinks}>
                            <ExternalLink href="">Website</ExternalLink>

                        </div>
                    </Antd.Layout.Footer>
                </Antd.Layout.Content>
                {/* </Warnings> */}
            </Antd.Layout>
        </Antd.Layout >
    );
};

export default LayoutView;
