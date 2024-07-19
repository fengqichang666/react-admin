import { IconButton } from '@/components/icon';
import { selectUserInfo } from '@/store/features/user.ts';
import { useAppSelector } from '@/store';
import { Divider, Dropdown, DropdownProps, MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeToken } from '@/theme/hooks/use-theme-token.ts';
import React from 'react';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const AccountDropdown = () => {
    const { t } = useTranslation();
    const { username, email, avatar } = useAppSelector(selectUserInfo);
    const logout = () => {

    };
    const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken();
    const contentStyle: React.CSSProperties = {
        backgroundColor: colorBgElevated,
        borderRadius: borderRadiusLG,
        boxShadow: boxShadowSecondary
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none'
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink to={HOMEPAGE}>{t('sys.menu.dashboard')}</NavLink>
            )
        },
        {
            label: <NavLink to="/management/user/profile">{t('sys.menu.user.profile')}</NavLink>,
            key: '2'
        },
        {
            label: <NavLink to="/management/user/account">{t('sys.menu.user.account')}</NavLink>,
            key: '3'
        },
        { type: 'divider' },
        {
            label: <button className="font-bold text-warning">{t('sys.login.logout')}</button>,
            key: '4',
            onClick: logout
        }
    ];
    const dropdownRender: DropdownProps['dropdownRender'] = (menu) => {
        return (
            <div style={contentStyle}>
                <div className="flex flex-col items-start p-4">
                    <div>{username}</div>
                    <div className="text-gray">{email}</div>
                </div>
                <Divider style={{ margin: 0 }} />
                {
                    React.cloneElement(menu as React.ReactElement, { style: menuStyle })
                }
            </div>
        );
    };
    return (
        <div>
            <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
                <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
                    <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
                </IconButton>
            </Dropdown>
        </div>
    );
};

export default AccountDropdown;
