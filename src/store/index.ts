import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import settingSlice from '@/store/features/setting';
// 注册
const store = configureStore({
        // 合并多个Slice
        reducer: {
            user: userSlice,
            settings: settingSlice
        }
    }
);
// 导出
export default store;
export type RootState = ReturnType<typeof store.getState>
// 利用 typeof 推断出 dispatch 的类型
export type AppDispatch = typeof store.dispatch

// 以下两行，都是为了让 TypeScript 能够推断出状态的类型；往后，我们会在整个应用中重复使用这两个成员
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();


