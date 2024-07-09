import { Suspense } from 'react';
import { CircleLoading } from '@/components/loading';
import Nav from '@/layouts/dashboards/nav.tsx';
import { Outlet } from 'react-router';

const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
    </div>
);
export default function DashboardLayout() {
    return <div>
        <Suspense fallback={<CircleLoading />}>
            {navVertical}
            {/*<Header offsetTop={themeLayout === ThemeLayout.Vertical ? offsetTop : undefined} />*/}
            {/*<Main ref={mainEl} offsetTop={offsetTop} />*/}
            DashboardLayout

            <main>
                <Outlet></Outlet>
            </main>
        </Suspense>
    </div>;
}