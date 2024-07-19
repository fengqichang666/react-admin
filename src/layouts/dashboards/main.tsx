import { forwardRef } from 'react';
import { Outlet } from 'react-router';
import { Content } from 'antd/es/layout/layout';

type Props = {
    offsetTop?: boolean;
};
const Main = forwardRef<HTMLElement, Props>(({ offsetTop = false }, ref) => {
    console.log(offsetTop);
    const mainStyle = {
        paddingTop: 80 + 32
    };
    return (
        <Content style={mainStyle}>
            <Outlet />
        </Content>
    );
});

export default Main;
