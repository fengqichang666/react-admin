import { ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';
import { createProxy, wrapperEnv } from './build/proxy';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    return {
        server: {
            host: true,
            open: '/',
            proxy: createProxy(wrapperEnv(env).VITE_PROXY)
        },
        resolve: {
            // alias: {
            //   "@": path.resolve(__dirname, "./src"),
            // },
        },
        plugins: [react(), tsconfigPaths()
        ]
    };
};
