import { useRouter } from '@/router/hooks';
import type { FallbackProps } from 'react-error-boundary';
import { Button, Typography } from 'antd';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function PageError({ error, resetErrorBoundary }: FallbackProps) {
    const { replace } = useRouter();
    const goHome = () => {
        resetErrorBoundary();
        replace(HOMEPAGE);
    };
    return (
        <div className="flex flex-col items-center h-screen justify-center ">
            <Typography.Title level={3} className="text-center">
                Sorry, Page error occurred!
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">
                {error.toString()}
            </Typography.Paragraph>
            <div className="text-center">
                <Button
                    type="link"
                    // style={{ background: colorTextBase, color: colorBgBase }}
                    className="rounded-md p-4"
                    onClick={goHome}
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
