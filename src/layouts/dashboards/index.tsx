import { Suspense } from 'react';
import { Spin } from 'antd';

export default function DashboardLayout() {
    return <div>
        <Suspense fallback={<Spin />}>
            {/*<Header offsetTop={themeLayout === ThemeLayout.Vertical ? offsetTop : undefined} />*/}
            {/*{nav}*/}
            {/*<Main ref={mainEl} offsetTop={offsetTop} />*/}
            DashboardLayout
        </Suspense>
    </div>;
}