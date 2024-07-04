import { lazy } from 'react';
import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { usePermissionRoutes } from '@/hooks/use-permission-routes.tsx';
import { AppRouteObject } from '#/router.ts';
import AuthGuard from '@/router/components/auth-guard.tsx';
import DashboardLayout from '@/layouts/dashboards';
// import { Routers } from './RoutesList';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const LoginRoute = {
    path: '/login',
    Component: lazy(() => import('@/pages/sys/login/Login'))
};
const PAGE_NOT_FOUND_ROUTE = {
    path: '*',
    element: <Navigate to="/404" replace />
};

export default function Router() {
    const permissionRoutes = usePermissionRoutes();
    const asyncRoutes: AppRouteObject = {
        path: '/',
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes]
    };
    const routes = [LoginRoute, asyncRoutes, PAGE_NOT_FOUND_ROUTE];
    const router = createHashRouter(routes as unknown as RouteObject[]);
    return <RouterProvider router={router} />;
}