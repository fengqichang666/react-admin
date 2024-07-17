import { Suspense } from 'react';
import { CircleLoading } from '@/components/loading';
import Nav from '@/layouts/dashboards/nav.tsx';
import { Outlet } from 'react-router';
import Header from '@/layouts/dashboards/header.tsx';

const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
    </div>
);
export default function DashboardLayout() {
    return <div className="flex h-screen overflow-hidden">
        <Suspense fallback={<CircleLoading />}>
            {navVertical}
            <Header />
            {/*<Main ref={mainEl} offsetTop={offsetTop} />*/}

            <main>
                <Outlet></Outlet>
            </main>
        </Suspense>
    </div>;
}