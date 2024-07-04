import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from '@/utils/storage.ts';
import { StorageEnum } from '#/enum.ts';
import { UserInfo, UserToken } from '#/entity.ts';
import userApi, { SignInReq } from '@/api/services/userService.ts';

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
    extraReducers: (builder) => {
        // `builder` 回调函数形式在这里被用到了，因为它提供了能从 action creators 中获取到的被正确类型定义过的 reducers
        builder.addCase(userSignIn.fulfilled, (state, { payload }) => {
            state.userToken.accessToken = payload.accessToken;
            state.userToken.refreshToken = payload.refreshToken;
            state.userInfo = payload.user;
        });
    },
    selectors: {
        selectToken: state => state.userToken,
        selectUserInfo: state => state.userInfo
    }
});

export const userSignIn = createAsyncThunk(
    'user/login',
    async (data: SignInReq) => {
        return await userApi.signin(data);
    }
);
export const { setUserInfo, setUserToken, clearUserInfoAndToken } = userSlice.actions;
export const { selectToken, selectUserInfo } = userSlice.selectors;
export default userSlice.reducer;
