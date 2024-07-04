import { message as Message, Modal } from 'antd';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Result } from '#/api';
import { ResultEnum } from '#/enum';
import { CreateAxiosOptions, RequestOptions } from '#/axios.ts';

// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 20 * 1000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求被发送之前做些什么
        config.headers.Authorization = 'Bearer Token';
        return config;
    },
    (error) => {
        // 请求错误时做些什么
        return Promise.reject(error);
    }
);
let modal:any = null;
// 响应拦截
axiosInstance.interceptors.response.use(
    (res: AxiosResponse<Result>) => {
        // if (!res.data) throw new Error(t('sys.api.apiRequestFailed'));
        if (!res.data) {
            Message.error('请求失败');
            throw new Error('请求失败');
        }

        const { status, data, message } = res.data;
        // 业务请求成功
        const hasSuccess = data && Reflect.has(res.data, 'status') && status === ResultEnum.SUCCESS;
        if (hasSuccess) {
            return data;
        }
        let config: CreateAxiosOptions = res.config;
        let errorMessageMode = config?.requestOptions?.errorMessageMode;
        if (errorMessageMode == 'message' || errorMessageMode == undefined) {
            Message.error(message);
        } else if (errorMessageMode == 'modal') {
            if (modal) {
                modal.destroy();
            }
            modal = Modal.error({
                content: message,
                centered: true
            });
        }
        // 业务请求错误
        throw new Error(message);
        // throw new Error(message || t('sys.api.apiRequestFailed'));
    },
    (error: AxiosError<Result>) => {
        const { response, message } = error || {};
        let errMsg = '';
        try {
            errMsg = response?.data?.message || message;
        } catch (error) {
            throw new Error(error as unknown as string);
        }
        // 对响应错误做点什么
        if (errMsg) {
            // checkStatus
            // errMsg = checkStatus(response.data.status);
            // errMsg = t('sys.api.errorMessage');
            Message.error(errMsg);
        }
        return Promise.reject(error);
    }
);

class APIClient {
    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'GET' });
    }

    post<T = any>(config: AxiosRequestConfig, option?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'POST' }, option);
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PUT' });
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: 'DELETE' });
    }

    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let con: CreateAxiosOptions = { ...config };
        con.requestOptions = options;
        return new Promise((resolve, reject) => {
            axiosInstance
                .request<any, AxiosResponse<Result>>(con)
                .then((res: AxiosResponse<Result>) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                });
        });
    }
}

export default new APIClient();
