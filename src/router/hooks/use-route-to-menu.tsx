import { useCallback } from 'react';
import { AppRouteObject } from '#/router.ts';
import { Iconify, SvgIcon } from '@/components/icon';
import { ItemType } from 'antd/es/menu/hooks/useItems';

export const useRouteToMenuFn = () => {
    const routeToMenuFn = useCallback((items: AppRouteObject[]) => {
        return items.filter((item) => !item.meta?.hideMenu).map((item) => {
            const menuItem: any = {};
            const { meta, children } = item;
            if (meta) {
                const { key, label, icon, disabled, suffix } = meta;
                menuItem.key = key;
                menuItem.disabled = disabled;
                menuItem.label = (
                    <div className="">
                        {label} {suffix}
                    </div>
                );
                if (icon) {
                    if (typeof icon === 'string') {
                        if (icon.startsWith('ic')) {
                            menuItem.icon = <SvgIcon icon={icon} size={24} className="ant-menu-item-icon" />;
                        } else {
                            menuItem.icon = <Iconify icon={icon} size={24} className="ant-menu-item-icon" />;

                        }
                    } else {
                        menuItem.icon = icon;
                    }
                }
            }
            if (children) {
                menuItem.children = routeToMenuFn(children);
            }
            return menuItem as ItemType;
        });
    }, []);
    return routeToMenuFn;
};