import { useCallback, useMemo } from 'react';
import { flattenMenuRoutes, menuFilter } from '@/router/utils.ts';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes.tsx';

export function useFlattenedRoutes() {
    const flattenRoutes = useCallback(flattenMenuRoutes, []);
    const routes = usePermissionRoutes();
    return useMemo(() => {
        const menuRoutes = menuFilter(routes);
        return flattenRoutes(menuRoutes);
    }, [flattenRoutes, routes]);
}