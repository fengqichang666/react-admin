import { lazy, Suspense } from 'react';
import { CircleLoading } from '@/components/loading';
import { AppRouteObject } from '#/router.ts';
import AuthGuard from '@/router/components/auth-guard.tsx';
import { Outlet } from 'react-router';

const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
export const ErrorRoutes: AppRouteObject = {
    element: (
        <AuthGuard>
            <Suspense fallback={<CircleLoading />}>
                <Outlet />
            </Suspense>
        </AuthGuard>
    ),
    children: [
        { path: '404', element: <Page404 /> }
    ]
};
