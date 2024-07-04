import { LoginStateEnum, useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider.tsx';
import { Button } from 'antd';

 const RegisterForm = () =>{
    const {loginState,setLoginState} =useLoginStateContext()
    if (loginState !== LoginStateEnum.REGISTER) return null;
    return <div>
        <Button onClick={()=>setLoginState(LoginStateEnum.LOGIN)}>
            返回
        </Button>
    </div>
}
export default RegisterForm