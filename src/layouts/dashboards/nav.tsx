import Logo from '@/components/logo';
import { Menu } from 'antd';
import { useLocation } from 'react-router';
import { usePermissionRoutes } from '@/hooks/use-permission-routes.tsx';
import { useRouteToMenuFn } from '@/router/hooks/use-route-to-menu.tsx';
import { menuFilter } from '@/router/utils.ts';

const Nav = () => {
    const permissionRoutes = usePermissionRoutes();
    const routeToMenuFn = useRouteToMenuFn();
    const { pathname } = useLocation();
    const menuList = routeToMenuFn(menuFilter(permissionRoutes));
    return (
        <>
            <div className="h-full flex flex-col" style={{ width: 260 }}>
                <div className="flex items-center h-20 py-4 justify-center">
                    <div><Logo /></div>
                    <span className="ml-2 text-xl font-bold">React Admin</span>
                </div>
                <div>
                    <Menu mode="inline"
                          items={menuList}
                          className="h-full"
                          selectedKeys={[pathname]}
                    />
                </div>
            </div>
        </>
    );
};
export default Nav;