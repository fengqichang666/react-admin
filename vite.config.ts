import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createProxy, wrapperEnv } from './build/proxy';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as process from 'node:process';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
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
        base: command === 'build' ? '/react-admin/' : '/',
        resolve: {
            // alias: {
            //   "@": path.resolve(__dirname, "./src"),
            // },
        },
        plugins: [react(), tsconfigPaths(),
            createSvgIconsPlugin(
                { iconDirs: [path.resolve(root, 'src/assets/icons')], symbolId: 'icon-[dir]-[name]' }
            )
        ]
    }
        ;
};
