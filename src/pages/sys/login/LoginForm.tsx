import { LoginStateEnum, useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider.tsx';
import { Alert, Button, Col, Form, FormProps, Input, Row, Tag } from 'antd';
import { useAppDispatch } from '@/store';
import { userSignIn } from '@/store/features/user.ts';
import { SignInReq } from '@/api/services/userService.ts';
import { DEFAULT_USER, TEST_USER } from '@/_mock/assets.ts';

type FieldType = Pick<SignInReq, 'username' | 'password'>;
const LoginForm = () => {
    const { loginState, setLoginState } = useLoginStateContext();
    const dispatch = useAppDispatch();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        dispatch(userSignIn(values));
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (loginState !== LoginStateEnum.LOGIN) return null;
    return <>
        <div className="text-2xl font-bold xl:text-3xl mb-4">
            Sign in
        </div>
        <Form
            name="login"
            initialValues={{
                remember: true,
                username: DEFAULT_USER.username,
                password: DEFAULT_USER.password
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
        >
            <div className="mb-4 flex flex-col">
                <Alert
                    showIcon
                    description={
                        <div className="flex flex-col">
                            <div className="flex">
                                <Tag className="flex-shrink-0">Admin UserName：</Tag>
                                <b className="ml-1">{DEFAULT_USER.username}</b>
                            </div>
                            <div className="flex">
                                <Tag className="flex-shrink-0">Test：</Tag>
                                <b className="ml-1">{TEST_USER.username}</b>
                            </div>
                            <div className="flex">
                                <Tag className="flex-shrink-0">password：</Tag>
                                <b className="ml-1">{DEFAULT_USER.password}</b>
                            </div>
                        </div>
                    }
                    type="info"
                />
            </div>
            <Form.Item<FieldType>
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <Row align="middle" gutter={8}>
            <Col span={9} flex="1">
                <Button
                    className="w-full !text-sm"
                    onClick={() => setLoginState(LoginStateEnum.MOBILE)}
                > 登录方式1
                </Button>
            </Col>
            <Col span={9} flex="1">
                <Button
                    className="w-full !text-sm"
                    onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
                >登录方式1
                </Button>
            </Col>
            <Col span={6} flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
                <Button className="w-full !text-sm">登录方式1</Button>
            </Col>
        </Row>
    </>;
};
export default LoginForm;