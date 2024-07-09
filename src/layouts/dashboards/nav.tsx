import Logo from '@/components/logo';
import { Menu, MenuProps } from 'antd';
import { useLocation, useMatches, useNavigate } from 'react-router';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes.tsx';
import { useRouteToMenuFn } from '@/router/hooks/use-route-to-menu.tsx';
import { menuFilter } from '@/router/utils.ts';
import { useEffect, useState } from 'react';

const Nav = () => {
    const navigate = useNavigate();
    const permissionRoutes = usePermissionRoutes();
    const routeToMenuFn = useRouteToMenuFn();
    const { pathname } = useLocation();
    const matches = useMatches();
    const menuList = routeToMenuFn(menuFilter(permissionRoutes));
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const onClick: MenuProps['onClick'] = ({ key, keyPath }) => {
        console.log(key, keyPath);
        navigate(key);
    };
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys);
    };
    useEffect(() => {
        console.log(matches);
        const openKeys = matches.filter(match => match.pathname !== '/').map(match => match.pathname);
        setOpenKeys(openKeys);
    }, [matches]);
    return (
        <>
            <div className="h-full flex flex-col" style={{ width: 260 }}>
                <div className="flex items-center h-20 py-4 justify-center">
                    <div><Logo /></div>
                    <span className="ml-2 text-xl font-bold">React Admin </span>
                </div>
                <div>
                    <Menu mode="inline"
                          items={menuList}
                          className="h-full"
                          defaultOpenKeys={openKeys}
                          defaultSelectedKeys={[pathname]}
                          selectedKeys={[pathname]}
                          onClick={onClick}
                          openKeys={openKeys}
                          onOpenChange={onOpenChange}
                    />
                </div>
            </div>
        </>
    );
};
export default Nav;