import { createSlice } from '@reduxjs/toolkit';
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum.ts';
import { getItem, removeItem, setItem } from '@/utils/storage.ts';

type SettingsType = {
    themeColorPresets: ThemeColorPresets;
    themeMode: ThemeMode;
    themeLayout: ThemeLayout;
    themeStretch: boolean;
    breadCrumb: boolean;
    multiTab: boolean;
};

const settings: SettingsType = {
    breadCrumb: true,
    multiTab: true,
    themeLayout: ThemeLayout.Vertical,
    themeMode: ThemeMode.Light,
    themeStretch: false,
    themeColorPresets: ThemeColorPresets.Default
};
export const settingSlice = createSlice({
    name: 'settings',
    initialState: { setting: getItem<SettingsType>(StorageEnum.Settings) || settings },
    reducers: {
        setSettings: (state, action) => {
            state.setting = { ...action.payload };
            setItem(StorageEnum.Settings, action.payload);
        },
        clearSettings: (state) => {
            state.setting = { ...settings };
            removeItem(StorageEnum.Settings);
        }
    },
    selectors: {
        selectSetting: (state) => state.setting
    }
});
export const { setSettings, clearSettings } = settingSlice.actions;
export const { selectSetting } = settingSlice.selectors;
export default settingSlice.reducer;