import { Suspense, useRef } from 'react';
import { CircleLoading } from '@/components/loading';
import Nav from '@/layouts/dashboards/nav.tsx';
import Header from '@/layouts/dashboards/header.tsx';
import Main from '@/layouts/dashboards/main.tsx';

const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
    </div>
);
export default function DashboardLayout() {
    const mainEl = useRef(null);
    return <div className="flex h-screen overflow-hidden">
        <Suspense fallback={<CircleLoading />}>
            <Header />
            {navVertical}
            <Main ref={mainEl} />

        </Suspense>
    </div>;
}