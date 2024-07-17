import LoginForm from '@/pages/sys/login/LoginForm.tsx';
import RegisterForm from '@/pages/sys/login/RegisterForm.tsx';
import { LoginStateProvider } from '@/pages/sys/login/providers/LoginStateProvider.tsx';
import { Layout, Typography } from 'antd';
import Overlay2 from '@/assets/images/background/overlay_2.jpg';
import DashboardImg from '@/assets/images/background/dashboard.png';

const Login = () => {
    return (<Layout className="relative flex w-full h-screen !flex-row">
        <div className="md:flex flex-col grow items-center justify-center gap-[80px] "
             style={{ background: `center center / cover no-repeat,url(${Overlay2})` }}>
            <div className="text-3xl font-bold lg:text-4xl xl:text-5xl leading-normal text-indigo-700">Unknown Admin
            </div>
            <img className="max-w-[480px] xl:max-w-[560px]" src={DashboardImg} alt="" />
            <Typography.Text className="!text-indigo-700">
                Backstage management system
            </Typography.Text>
        </div>
        <div className="flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
            <LoginStateProvider>
                <LoginForm />
                <RegisterForm />
            </LoginStateProvider>
        </div>
    </Layout>);
};
export default Login;