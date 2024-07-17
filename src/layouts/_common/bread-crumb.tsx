import { FunctionComponent, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Iconify } from '@/components/icon';
import { useMatches } from 'react-router';
import { useFlattenedRoutes, usePermissionRoutes } from '@/router/hooks';
import { menuFilter } from '@/router/utils.ts';
import { AppRouteObject } from '#/router.ts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

const BreadCrumb: FunctionComponent = () => {
    const [breadCrumbs, setBreadCrumbs] = useState<ItemType[]>([]);
    const { t } = useTranslation();
    const matches = useMatches();
    const flattenedRoutes = useFlattenedRoutes();
    const permissionRoutes = usePermissionRoutes();
    useEffect(() => {
        const menuRoutes = menuFilter(permissionRoutes);
        console.log(menuRoutes);
        const paths = matches.filter(item => item.pathname != '/').map(item => item.pathname);
        const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);
        console.log(pathRouteMetas);
        let items: undefined | AppRouteObject[] = [...menuRoutes];
        const breadCrumbs = pathRouteMetas.map(routeMeta => {
            const { key, label } = routeMeta;
            items = items?.find(item => item.meta?.key == key)?.children?.filter(item => !item.meta?.hideMenu);
            const result: ItemType = {
                title: t(label),
                key
            };
            if (items) {
                result.menu = {
                    items: items.map(item => ({
                        key: item.meta?.key,
                        label: <Link to={item.meta!.key}>{t(item.meta!.label)}</Link>
                    }))
                };
            }
            return result;
        });
        setBreadCrumbs(breadCrumbs);
        console.log(paths);
    }, [matches, permissionRoutes, flattenedRoutes, t]);
    return (
        <Breadcrumb
            className="!text-sm"
            separator={<Iconify icon="ph:dot-duotone" />}
            items={breadCrumbs}
        />
    );
};

export default BreadCrumb;
