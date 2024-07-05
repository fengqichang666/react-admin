import { createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from '@/utils/storage.ts';
import { StorageEnum } from '#/enum.ts';
import { UserInfo, UserToken } from '#/entity.ts';

const initialState = {
    userInfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token) || {}
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            setItem(StorageEnum.User, action.payload);
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
            setItem(StorageEnum.Token, action.payload);
        },
        clearUserInfoAndToken: (state) => {
            state.userInfo = {};
            state.userToken = {};
            removeItem(StorageEnum.User);
            removeItem(StorageEnum.Token);
        }
    },
    selectors: {
        selectToken: state => state.userToken,
        selectUserInfo: state => state.userInfo
    }
});

export const { setUserInfo, setUserToken, clearUserInfoAndToken } = userSlice.actions;
export const { selectToken, selectUserInfo } = userSlice.selectors;
export default userSlice.reducer;
