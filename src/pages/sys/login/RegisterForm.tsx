import { LoginStateEnum, useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider.tsx';

 const RegisterForm = () =>{
    const {loginState,setLoginState} =useLoginStateContext()
    if (loginState !== LoginStateEnum.REGISTER) return null;
    return <div>RegisterForm</div>
}
export default RegisterForm