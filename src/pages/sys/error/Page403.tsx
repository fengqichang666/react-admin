import { useRouter } from '@/router/hooks';
import { Button, Typography } from 'antd';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Page403() {
    const { replace } = useRouter();
    const goHome = () => {
        replace(HOMEPAGE);
    };
    return (
        <div className="flex flex-col items-center h-screen justify-center ">
            <Typography.Title level={1} className="text-center">
                403 No permission!
            </Typography.Title>
            <Typography.Title level={3} className="text-center">
                No permission
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="text-center">
                The page you are trying access has restricted access. Please refer to your system
                administrator
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
