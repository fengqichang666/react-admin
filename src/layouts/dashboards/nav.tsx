import Logo from '@/components/logo';
import { Menu, MenuProps } from 'antd';
import { useLocation, useMatches, useNavigate } from 'react-router';
import { usePermissionRoutes } from '@/router/hooks/use-permission-routes.tsx';
import { useRouteToMenuFn } from '@/router/hooks/use-route-to-menu.tsx';
import { menuFilter } from '@/router/utils.ts';
import { CSSProperties, useEffect, useState } from 'react';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';
import Scrollbar from '@/components/scrollbar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ThemeLayout } from '#/enum.ts';
import { setSettings } from '@/store/features/setting.ts';
import { useAppDispatch, useAppSelector } from '@/store';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from '@/layouts/dashboards/config.ts';

const Nav = () => {
    const navigate = useNavigate();
    const permissionRoutes = usePermissionRoutes();
    const routeToMenuFn = useRouteToMenuFn();
    const { pathname } = useLocation();
    const matches = useMatches();
    const dispatch = useAppDispatch();
    const menuList = routeToMenuFn(menuFilter(permissionRoutes));
    const settings = useAppSelector(state => state.settings.setting);
    const setThemeLayout = (themeLayout: ThemeLayout) => {
        dispatch(setSettings({
            ...settings, themeLayout
        }));
    };
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const onClick: MenuProps['onClick'] = ({ key, keyPath }) => {
        console.log(key, keyPath);
        navigate(key);
    };
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys);
    };

    const { colorPrimary, colorBgElevated } = useThemeToken();
    const menuStyle: CSSProperties = {
        background: colorBgElevated
    };
    useEffect(() => {
        console.log(matches);
        const openKeys = matches.filter(match => match.pathname !== '/').map(match => match.pathname);
        setOpenKeys(openKeys);
    }, [matches]);
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        if (!collapsed) {
            setThemeLayout(ThemeLayout.Mini);
        } else {
            setThemeLayout(ThemeLayout.Vertical);
        }
        setCollapsed(!collapsed);
    };
    return (
        <>
            <div className="h-full flex flex-col"
                 style={{
                     width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
                     borderRight: `1px dashed rgba(217, 217, 217, 0.6)`
                 }}>
                <div className="flex items-center h-20 py-4 justify-center relative">
                    <div><Logo /></div>
                    {!collapsed &&
						<span className="ml-2 text-xl font-bold"
							  style={{ color: colorPrimary }}>Unknown Admin </span>}
                    <button onClick={toggleCollapsed}
                            className="absolute right-0 top-7 translate-x-1/2 cursor-pointer w-6 h-6 text-xl">
                        {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
                    </button>
                </div>
                <Scrollbar style={{ height: 'calc(100vh - 70px)' }}>
                    <Menu mode="inline"
                          items={menuList}
                          className="h-full !border-none"
                          defaultOpenKeys={openKeys}
                          defaultSelectedKeys={[pathname]}
                          selectedKeys={[pathname]}
                          onClick={onClick}
                          openKeys={openKeys}
                          onOpenChange={onOpenChange}
                          style={menuStyle}
                          inlineCollapsed={collapsed}
                    />
                </Scrollbar>
            </div>
        </>
    );
};
export default Nav;