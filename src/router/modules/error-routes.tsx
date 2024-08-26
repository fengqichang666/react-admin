import { lazy, Suspense } from 'react';
import { AppRouteObject } from '#/router.ts';
import AuthGuard from '@/router/components/auth-guard.tsx';
import { CircleLoading } from '@/components/loading';
import { Outlet } from 'react-router';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));
export const ErrorRoutes: AppRouteObject = {
    element: (
        <AuthGuard>
            <Suspense fallback={<CircleLoading />}>
                <Outlet />
            </Suspense>
        </AuthGuard>
    ),
    children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
        { path: '500', element: <Page500 /> }
    ]
};
