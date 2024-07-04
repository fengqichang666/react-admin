import { AxiosRequestConfig } from 'axios';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | 'warnModal' | undefined;
export interface RequestOptions{
    errorMessageMode?: ErrorMessageMode;
}
export interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions;
}