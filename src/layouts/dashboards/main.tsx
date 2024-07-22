import { forwardRef } from 'react';
import { Outlet } from 'react-router';
import { Content } from 'antd/es/layout/layout';
import MultiTabsProvider from './multi-tabs/multi-tabs-provider';
import MultiTabs from './multi-tabs';

type Props = {
    offsetTop?: boolean;
};
const Main = forwardRef<HTMLElement, Props>(({ offsetTop = false }, ref) => {
    console.log(offsetTop);
    const mainStyle = {
        paddingTop: 80 + 32
    };
    return (
        <Content style={mainStyle} className="flex overflow-auto">
            <MultiTabsProvider>
                <MultiTabs />
            </MultiTabsProvider>
            {/* <Outlet /> */}
        </Content>
    );
});

export default Main;
