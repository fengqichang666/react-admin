import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useAppSelector } from '@/store';
import { selectToken } from '@/store/features/user.ts';
import PageError from '@/pages/sys/error/PageError.tsx';
import { useRouter } from '@/router/hooks';

type Props = {
    children: React.ReactNode;
};
const AuthGuard = ({ children }: Props) => {
    const router = useRouter();
    const { accessToken } = useAppSelector(selectToken);
    const check = useCallback(() => {
        if (!accessToken) {
            router.replace('/login');
        }
    }, [accessToken, router]);

    useEffect(() => {
        check();
    }, [check]);

    return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
};
export default AuthGuard;