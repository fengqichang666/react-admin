import { Provider } from 'react-redux';
import store from '@/store';
import Router from '@/router';
import { Suspense } from 'react';
import { CircleLoading } from '@/components/loading';
import AntdProvider from '@/theme/antd';
import { App as AntdApp } from 'antd';

const App = () => {
    return <Provider store={store}>
        <AntdProvider>
            <AntdApp>
                <Suspense fallback={<CircleLoading />}>
                    <Router />
                </Suspense>
            </AntdApp>
        </AntdProvider>
    </Provider>;
};

export default App;
