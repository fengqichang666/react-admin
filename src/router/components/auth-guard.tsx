import { useCallback, useEffect } from 'react';

import PageError from '@/pages/sys/error/PageError';

import { useAppSelector } from '@/store';
import { selectToken } from '@/store/features/user.ts';
import { useNavigate } from 'react-router';

type Props = {
    children: React.ReactNode;
};
const AuthGuard = ({children}:Props) => {
    const navigate = useNavigate();
    const { accessToken } = useAppSelector(selectToken);

    const check = useCallback(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken]);

    useEffect(() => {
        check();
    }, [check]);

    return <PageError />
};
export default AuthGuard;