import { ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useAppSelector } from '@/store';
import { ThemeMode } from '#/enum.ts';
import { StyleProvider } from '@ant-design/cssinjs';
import { colorPrimarys, customComponentConfig, customThemeTokenConfig, themeModeToken } from '@/theme/antd/theme.ts';

export default function AntdProvider({ children }: { children: ReactNode }) {
    const { themeMode, themeColorPresets } = useAppSelector(state => state.settings.setting);

    const algorithm = themeMode == ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
    const colorPrimary = colorPrimarys[themeColorPresets];
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary,
                ...customThemeTokenConfig, ...themeModeToken[themeMode].token
            },
            components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
            algorithm
        }}>
            <StyleProvider hashPriority="high">{children}</StyleProvider>
        </ConfigProvider>
    );
}