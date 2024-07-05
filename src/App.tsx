import './App.css';
import { Provider } from 'react-redux';
import store from '@/store';
import Router from '@/router';
import { Suspense } from 'react';
import { CircleLoading } from '@/components/loading';

const App = () => {
    return <Provider store={store}>
        <Suspense fallback={<CircleLoading />}>
            <Router />
        </Suspense>
    </Provider>;
};

export default App;
