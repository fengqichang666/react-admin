import './App.css';
import { Provider } from 'react-redux';
import store from '@/store';
import Router from '@/router';
import { Suspense } from 'react';
import { Spin } from 'antd';

const App = () => {
    return <Provider store={store}>
        <Suspense fallback={<Spin />}>
            <Router />
        </Suspense>
    </Provider>;
};

export default App;
