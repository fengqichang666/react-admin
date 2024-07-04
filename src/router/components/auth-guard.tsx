import { useCallback, useEffect } from 'react';

import { useAppSelector } from '@/store';
import { selectToken } from '@/store/features/user.ts';
import { useNavigate } from 'react-router';

type Props = {
    children: React.ReactNode;
};
const AuthGuard = ({ children }: Props) => {
    const navigate = useNavigate();
    const { accessToken } = useAppSelector(selectToken);
    debugger
    const check = useCallback(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken]);

    useEffect(() => {
        check();
    }, [check]);

    return <>{children}</>;
};
export default AuthGuard;